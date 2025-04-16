
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export interface Message {
  id: string;
  sender_id: string;
  content: string;
  conversation_id: string;
  attachment_url?: string;
  attachment_type?: string;
  attachment_name?: string;
  created_at: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  user_id: string;
  participant_id: string;
  participant_name: string;
  participant_avatar?: string;
  participant_role?: string;
  participant_organization?: string;
  participant_online: boolean;
  last_message?: {
    content: string;
    timestamp: string;
    read: boolean;
    sender_id: string;
  };
  unread_count: number;
}

export const getConversations = async (userId: string): Promise<Conversation[]> => {
  // Get all conversations where the user is a participant
  const { data: conversations, error } = await supabase
    .from('conversations')
    .select(`
      id, user_id, participant_id, last_message, unread_count, created_at, updated_at,
      profiles:participant_id(first_name, last_name, avatar_url, primary_position, organization)
    `)
    .or(`user_id.eq.${userId},participant_id.eq.${userId}`)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching conversations:', error);
    return [];
  }

  // Transform the raw data into our Conversation interface
  return conversations.map((conv: any) => {
    // Determine if the user is the initiator or the participant
    const isInitiator = conv.user_id === userId;
    const participantId = isInitiator ? conv.participant_id : conv.user_id;
    const participant = conv.profiles;
    
    return {
      id: conv.id,
      user_id: userId,
      participant_id: participantId,
      participant_name: `${participant?.first_name || ''} ${participant?.last_name || ''}`.trim(),
      participant_avatar: participant?.avatar_url,
      participant_role: participant?.primary_position,
      participant_organization: participant?.organization,
      participant_online: false, // This would need a separate presence system
      last_message: conv.last_message,
      unread_count: conv.unread_count || 0
    };
  });
};

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

export const createConversation = async (
  userId: string, 
  participantId: string
): Promise<string | null> => {
  // Check if conversation already exists
  const { data: existingConv } = await supabase
    .from('conversations')
    .select('id')
    .or(`and(user_id.eq.${userId},participant_id.eq.${participantId}),and(user_id.eq.${participantId},participant_id.eq.${userId})`)
    .single();

  if (existingConv) {
    return existingConv.id;
  }

  // Create a new conversation
  const { data, error } = await supabase
    .from('conversations')
    .insert({
      user_id: userId,
      participant_id: participantId,
      last_message: null,
      unread_count: 0
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating conversation:', error);
    return null;
  }

  return data.id;
};

const updateConversationLastMessage = async (
  conversationId: string, 
  lastMessage: { content: string; timestamp: string; read: boolean; sender_id: string }
): Promise<void> => {
  const { data: conversation } = await supabase
    .from('conversations')
    .select('user_id, participant_id, unread_count')
    .eq('id', conversationId)
    .single();

  if (!conversation) return;

  // Determine who should get the unread message count increased
  const recipientId = lastMessage.sender_id === conversation.user_id 
    ? conversation.participant_id 
    : conversation.user_id;

  // Update the conversation with the latest message
  await supabase
    .from('conversations')
    .update({
      last_message: lastMessage,
      updated_at: new Date().toISOString(),
      unread_count: conversation.unread_count + 1
    })
    .eq('id', conversationId)
    .eq('participant_id', recipientId);
};

export const listenToMessages = (conversationId: string, callback: (message: Message) => void) => {
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

export const listenToConversations = (userId: string, callback: () => void) => {
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
