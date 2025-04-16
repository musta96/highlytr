
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/auth';
import { 
  Message, 
  getMessages, 
  sendMessage as sendMessageService, 
  markMessagesAsRead,
  listenToMessages
} from '@/services/messageService';
import { RealtimeChannel } from '@supabase/supabase-js';

export const useMessages = (conversationId: string | null) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchMessages = useCallback(async () => {
    if (!conversationId || !user?.id) return;
    
    try {
      setLoading(true);
      const data = await getMessages(conversationId);
      setMessages(data);
      
      // Mark messages as read
      await markMessagesAsRead(conversationId, user.id);
      setError(null);
    } catch (err) {
      console.error('Error in useMessages:', err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, [conversationId, user?.id]);

  const sendMessage = useCallback(async (
    content: string, 
    attachment?: { url: string; type: string; name: string }
  ) => {
    if (!conversationId || !user?.id || !content.trim()) return null;
    
    try {
      return await sendMessageService(conversationId, user.id, content, attachment);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
      return null;
    }
  }, [conversationId, user?.id]);

  useEffect(() => {
    let messagesChannel: RealtimeChannel | null = null;
    
    fetchMessages();

    // Set up real-time listener for new messages
    if (conversationId && user?.id) {
      messagesChannel = listenToMessages(conversationId, (newMessage) => {
        setMessages(prev => [...prev, newMessage]);
        // Mark as read if the message is from someone else
        if (newMessage.sender_id !== user.id) {
          markMessagesAsRead(conversationId, user.id);
        }
      });
    }

    return () => {
      if (messagesChannel) {
        messagesChannel.unsubscribe();
      }
    };
  }, [conversationId, user?.id, fetchMessages]);

  return { 
    messages, 
    loading, 
    error,
    sendMessage,
    refetch: fetchMessages
  };
};
