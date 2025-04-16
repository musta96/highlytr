
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { Conversation, getConversations, listenToConversations } from '@/services/messageService';
import { RealtimeChannel } from '@supabase/supabase-js';

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    let conversationsChannel: RealtimeChannel | null = null;

    const fetchConversations = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        const data = await getConversations(user.id);
        setConversations(data);
        setError(null);
      } catch (err) {
        console.error('Error in useConversations:', err);
        setError('Failed to load conversations');
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();

    // Set up real-time listener for conversation updates
    if (user?.id) {
      conversationsChannel = listenToConversations(user.id, fetchConversations);
    }

    return () => {
      if (conversationsChannel) {
        conversationsChannel.unsubscribe();
      }
    };
  }, [user?.id]);

  return { conversations, loading, error, refetch: () => {
    if (user?.id) {
      getConversations(user.id).then(setConversations);
    }
  }};
};
