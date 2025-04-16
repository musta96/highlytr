
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
