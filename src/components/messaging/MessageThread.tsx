
import React, { useRef, useEffect } from 'react';
import { Conversation } from '@/services/messaging/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Message } from '@/services/messaging/types';
import { Loader2, ArrowLeft, Phone, Info, MoreHorizontal, Paperclip, Image, Smile, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import MessageBubble from './MessageBubble';

interface MessageThreadProps {
  activeConversation: Conversation;
  messages: Message[];
  loading: boolean;
  messageInput: string;
  onMessageInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
  onBackClick: () => void;
  isMobile: boolean;
}

const MessageThread = ({
  activeConversation,
  messages,
  loading,
  messageInput,
  onMessageInputChange,
  onSendMessage,
  onBackClick,
  isMobile
}: MessageThreadProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <div className="p-4 border-b flex items-center">
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2"
            onClick={onBackClick}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={activeConversation.participant_avatar} alt={activeConversation.participant_name} />
          <AvatarFallback>{activeConversation.participant_name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center">
            <h2 className="font-semibold">{activeConversation.participant_name}</h2>
            {activeConversation.participant_online && (
              <span className="ml-2 text-xs text-green-600 font-medium">Online</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {activeConversation.participant_role && activeConversation.participant_organization 
              ? `${activeConversation.participant_role}, ${activeConversation.participant_organization}` 
              : activeConversation.participant_role || activeConversation.participant_organization || ''}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Info className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div className="h-32 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : messages.length > 0 ? (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <p>Start a conversation with {activeConversation.participant_name}</p>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="shrink-0">
            <Paperclip className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="shrink-0">
            <Image className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Input 
            placeholder="Type a message..." 
            className="flex-1"
            value={messageInput}
            onChange={onMessageInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSendMessage();
              }
            }}
          />
          <Button variant="ghost" size="icon" className="shrink-0">
            <Smile className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button className="shrink-0" size="icon" onClick={onSendMessage} disabled={!messageInput.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default MessageThread;
