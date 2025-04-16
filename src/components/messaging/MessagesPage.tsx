
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useConversations } from '@/hooks/useConversations';
import { useMessages } from '@/hooks/useMessages';
import { useAuth } from '@/hooks/auth';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Import components
import ConversationList from './ConversationList';
import MessageThread from './MessageThread';
import EmptyMessageState from './EmptyMessageState';
import { Conversation } from '@/services/messaging/types';
import NewMessageDialog from './NewMessageDialog';

const MessagesPage = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const conversationIdParam = searchParams.get('conversation');
  
  const { conversations, loading: loadingConversations } = useConversations();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [messageInput, setMessageInput] = useState('');
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [conversationVisible, setConversationVisible] = useState(!isMobile);
  const [newMessageOpen, setNewMessageOpen] = useState(false);
  
  const { messages, loading: loadingMessages, sendMessage } = useMessages(activeConversation?.id || null);
  
  // Handle setting up the active conversation when the page loads or URL changes
  useEffect(() => {
    if (conversationIdParam && conversations.length > 0) {
      const conversation = conversations.find(conv => conv.id === conversationIdParam);
      if (conversation) {
        setActiveConversation(conversation);
        setConversationVisible(true);
      } else {
        // Invalid conversation ID
        if (!loadingConversations) {
          setSearchParams({});
        }
      }
    } else if (conversations.length > 0 && !activeConversation) {
      // Automatically select the first conversation if none is selected
      setActiveConversation(conversations[0]);
      setSearchParams({ conversation: conversations[0].id });
    }
  }, [conversationIdParam, conversations, loadingConversations, setSearchParams, activeConversation]);

  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
    setSearchParams({ conversation: conversation.id });
    if (isMobile) {
      setConversationVisible(true);
    }
  };

  const handleBackToList = () => {
    setConversationVisible(false);
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !activeConversation) return;
    
    try {
      await sendMessage(messageInput.trim());
      setMessageInput('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))]">
      <div className="flex-1 flex overflow-hidden bg-background rounded-lg border">
        {/* Conversation List */}
        <div className={`w-full md:w-80 lg:w-96 border-r flex flex-col ${conversationVisible && isMobile ? 'hidden' : 'flex'}`}>
          <ConversationList 
            conversations={conversations}
            activeConversation={activeConversation}
            onSelectConversation={handleSelectConversation}
            loading={loadingConversations}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
        
        {/* Message Thread */}
        <div className={`flex-1 flex flex-col ${!conversationVisible && isMobile ? 'hidden' : 'flex'}`}>
          {activeConversation ? (
            <MessageThread 
              activeConversation={activeConversation}
              messages={messages}
              loading={loadingMessages}
              messageInput={messageInput}
              onMessageInputChange={(e) => setMessageInput(e.target.value)}
              onSendMessage={handleSendMessage}
              onBackClick={handleBackToList}
              isMobile={isMobile}
            />
          ) : (
            <EmptyMessageState onNewMessageClick={() => setNewMessageOpen(true)} />
          )}
        </div>
      </div>
      
      {newMessageOpen && (
        <NewMessageDialog 
          open={newMessageOpen} 
          onOpenChange={setNewMessageOpen} 
        />
      )}
    </div>
  );
};

export default MessagesPage;
