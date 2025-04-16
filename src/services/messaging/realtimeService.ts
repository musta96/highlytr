
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';
import { Message } from './types';

/**
 * Sets up a real-time listener for new messages in a conversation
 */
export const listenToMessages = (conversationId: string, callback: (message: Message) => void): RealtimeChannel => {
  return supabase
    .channel('messages-channel')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      },
      (payload) => {
        callback(payload.new as Message);
      }
    )
    .subscribe();
};

/**
 * Sets up a real-time listener for conversation changes
 */
export const listenToConversations = (userId: string, callback: () => void): RealtimeChannel => {
  return supabase
    .channel('conversations-channel')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'conversations',
        filter: `or(user_id=eq.${userId},participant_id=eq.${userId})`
      },
      () => {
        callback();
      }
    )
    .subscribe();
};
