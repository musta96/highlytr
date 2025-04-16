
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import { Conversation } from '@/services/messaging/types';
import ConversationItem from './ConversationItem';
import NewMessageDialog from './NewMessageDialog';

interface ConversationListProps {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  loading: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ConversationList = ({
  conversations,
  activeConversation,
  onSelectConversation,
  loading,
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange
}: ConversationListProps) => {
  const filteredConversations = conversations.filter(conv => {
    // Filter by search query
    if (searchQuery && !conv.participant_name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by tab
    if (activeTab === 'unread' && conv.unread_count === 0) {
      return false;
    }
    if (activeTab === 'archived') {
      // We don't have archived functionality yet, so return empty for now
      return false;
    }
    
    return true;
  });

  return (
    <div className="w-full md:w-80 lg:w-96 border-r flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Messages</h1>
        <p className="text-sm text-muted-foreground">Communicate with coaches, colleges and agencies</p>
        
        <div className="relative mt-3">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search messages..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs 
        defaultValue="all" 
        className="flex-1 overflow-hidden flex flex-col"
        value={activeTab}
        onValueChange={onTabChange}
      >
        <div className="px-4 pt-2">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
            <TabsTrigger value="archived" className="flex-1">Archived</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="h-32 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="divide-y">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    isActive={activeConversation?.id === conversation.id}
                    onClick={() => onSelectConversation(conversation)}
                  />
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <p>No conversations found</p>
                </div>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="unread" className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="h-32 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="divide-y">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    isActive={activeConversation?.id === conversation.id}
                    onClick={() => onSelectConversation(conversation)}
                  />
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <p>No unread messages</p>
                </div>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="archived" className="flex-1 overflow-y-auto">
          <div className="p-8 text-center text-muted-foreground">
            <p>No archived messages</p>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="p-4 border-t">
        <NewMessageDialog />
      </div>
    </div>
  );
};

export default ConversationList;
