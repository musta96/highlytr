
import React from 'react';
import { FileText } from 'lucide-react';
import { Message } from '@/services/messaging/types';
import { useAuth } from '@/hooks/auth';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const { user } = useAuth();
  const isMe = message.sender_id === user?.id;

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[75%] ${isMe ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}>
        {message.content}
        
        {message.attachment_url && (
          <div className="mt-2 bg-white/10 rounded p-2 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="text-sm">{message.attachment_name || 'Attachment'}</span>
          </div>
        )}
        
        <div className={`text-xs ${isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'} mt-1 text-right`}>
          {new Date(message.created_at).toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          })}
          {message.read && isMe && <span className="ml-1">✓</span>}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
