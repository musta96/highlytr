
import { supabase } from '@/integrations/supabase/client';
import { Message } from './types';
import { updateConversationLastMessage } from './conversationService';

/**
 * Retrieves messages for a specific conversation
 */
export const getMessages = async (conversationId: string): Promise<Message[]> => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }

  return data as Message[];
};

/**
 * Sends a new message in a conversation
 */
export const sendMessage = async (
  conversationId: string,
  senderId: string,
  content: string,
  attachment?: { url: string; type: string; name: string }
): Promise<Message | null> => {
  const newMessage = {
    conversation_id: conversationId,
    sender_id: senderId,
    content,
    attachment_url: attachment?.url,
    attachment_type: attachment?.type,
    attachment_name: attachment?.name,
    read: false
  };

  const { data, error } = await supabase
    .from('messages')
    .insert(newMessage)
    .select()
    .single();

  if (error) {
    console.error('Error sending message:', error);
    return null;
  }

  // Update the conversation's last message and unread count
  await updateConversationLastMessage(conversationId, {
    content,
    timestamp: new Date().toISOString(),
    read: false,
    sender_id: senderId
  });

  return data;
};

/**
 * Marks all messages in a conversation as read for a specific user
 */
export const markMessagesAsRead = async (conversationId: string, userId: string): Promise<void> => {
  const { error } = await supabase
    .from('messages')
    .update({ read: true })
    .eq('conversation_id', conversationId)
    .neq('sender_id', userId);

  if (error) {
    console.error('Error marking messages as read:', error);
  }

  // Reset unread count for this conversation
  await supabase
    .from('conversations')
    .update({ unread_count: 0 })
    .eq('id', conversationId)
    .eq('participant_id', userId);
};
