
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Conversation } from '@/services/messaging/types';
import { useAuth } from '@/hooks/auth';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

const ConversationItem = ({ conversation, isActive, onClick }: ConversationItemProps) => {
  const { user } = useAuth();

  return (
    <div 
      className={`p-3 hover:bg-muted cursor-pointer ${isActive ? 'bg-muted' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Avatar>
            <AvatarImage src={conversation.participant_avatar} alt={conversation.participant_name} />
            <AvatarFallback>{conversation.participant_name.charAt(0)}</AvatarFallback>
          </Avatar>
          {conversation.participant_online && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold truncate">{conversation.participant_name}</h3>
            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
              {conversation.last_message?.timestamp ? new Date(conversation.last_message.timestamp).toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
                month: 'short',
                day: 'numeric',
                year: undefined,
              }) : ''}
            </span>
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {conversation.participant_role && conversation.participant_organization 
              ? `${conversation.participant_role}, ${conversation.participant_organization}` 
              : conversation.participant_role || conversation.participant_organization || ''}
          </p>
          <p className="text-sm truncate">
            {conversation.last_message?.sender_id === user?.id && 'You: '}
            {conversation.last_message?.content || 'Start a conversation'}
          </p>
        </div>
      </div>
      
      <div className="flex justify-end mt-1">
        {conversation.unread_count > 0 && (
          <Badge className="bg-primary text-primary-foreground font-medium">{conversation.unread_count}</Badge>
        )}
      </div>
    </div>
  );
};

export default ConversationItem;
