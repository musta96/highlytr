
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MoreHorizontal, 
  Send, 
  Search, 
  PlusCircle, 
  Paperclip, 
  Image, 
  Smile,
  Phone,
  Info,
  ArrowLeft,
  FileText,
  MessageSquare,
  Loader2
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useConversations } from '@/hooks/useConversations';
import { useMessages } from '@/hooks/useMessages';
import { useAuth } from '@/hooks/auth';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DrawerContent, DrawerHeader, DrawerTitle, Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { Conversation } from '@/services/messageService';

const MessagesPage = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
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
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
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

  // Scroll to bottom of messages when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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

  const NewMessageDialog = () => {
    const [searchResults] = useState([
      // This would be replaced with actual search results from a backend call
      { id: 'user1', name: 'Coach Sarah Johnson', role: 'Basketball Coach', organization: 'Riverside University' },
      { id: 'user2', name: 'David Wilson', role: 'Athletic Director', organization: 'Central State University' },
      { id: 'user3', name: 'Maria Rodriguez', role: 'Soccer Coach', organization: 'Elite Sports Academy' }
    ]);

    const startNewConversation = (userId: string) => {
      // This would be replaced with creating an actual conversation
      toast({
        title: "New conversation",
        description: "Starting a new conversation... (This is a placeholder)",
      });
      setNewMessageOpen(false);
    };

    const DialogContentBody = () => (
      <>
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
        </DialogHeader>
        <div className="p-4 space-y-4">
          <Input 
            placeholder="Search for users..." 
            className="mb-4" 
          />
          <div className="space-y-2">
            {searchResults.map((user) => (
              <div 
                key={user.id}
                className="p-2 flex items-center space-x-3 hover:bg-muted rounded-md cursor-pointer"
                onClick={() => startNewConversation(user.id)}
              >
                <Avatar>
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {user.role}, {user.organization}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
    
    if (isMobile) {
      return (
        <Drawer open={newMessageOpen} onOpenChange={setNewMessageOpen}>
          <DrawerTrigger asChild>
            <Button className="w-full gap-2">
              <PlusCircle className="h-4 w-4" />
              New Message
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>New Message</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 space-y-4">
              <Input 
                placeholder="Search for users..." 
                className="mb-4" 
              />
              <div className="space-y-2">
                {searchResults.map((user) => (
                  <div 
                    key={user.id}
                    className="p-2 flex items-center space-x-3 hover:bg-muted rounded-md cursor-pointer"
                    onClick={() => startNewConversation(user.id)}
                  >
                    <Avatar>
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.role}, {user.organization}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      );
    }
    
    return (
      <Dialog open={newMessageOpen} onOpenChange={setNewMessageOpen}>
        <DialogTrigger asChild>
          <Button className="w-full gap-2">
            <PlusCircle className="h-4 w-4" />
            New Message
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogContentBody />
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))]">
      <div className="flex-1 flex overflow-hidden bg-background rounded-lg border">
        {/* Conversation List */}
        <div className={`w-full md:w-80 lg:w-96 border-r flex flex-col ${conversationVisible && isMobile ? 'hidden' : 'flex'}`}>
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold">Messages</h1>
            <p className="text-sm text-muted-foreground">Communicate with coaches, colleges and agencies</p>
            
            <div className="relative mt-3">
              <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search messages..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs 
            defaultValue="all" 
            className="flex-1 overflow-hidden flex flex-col"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="px-4 pt-2">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                <TabsTrigger value="archived" className="flex-1">Archived</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="flex-1 overflow-y-auto">
              {loadingConversations ? (
                <div className="h-32 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="divide-y">
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map((conversation) => (
                      <div 
                        key={conversation.id} 
                        className={`p-3 hover:bg-muted cursor-pointer ${activeConversation?.id === conversation.id ? 'bg-muted' : ''}`}
                        onClick={() => handleSelectConversation(conversation)}
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
              {loadingConversations ? (
                <div className="h-32 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="divide-y">
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map((conversation) => (
                      <div 
                        key={conversation.id} 
                        className="p-3 hover:bg-muted cursor-pointer"
                        onClick={() => handleSelectConversation(conversation)}
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={conversation.participant_avatar} alt={conversation.participant_name} />
                            <AvatarFallback>{conversation.participant_name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <h3 className="font-semibold truncate">{conversation.participant_name}</h3>
                              <span className="text-xs text-muted-foreground">
                                {conversation.last_message?.timestamp ? new Date(conversation.last_message.timestamp).toLocaleTimeString() : ''}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {conversation.participant_role}, {conversation.participant_organization}
                            </p>
                            <p className="text-sm truncate">{conversation.last_message?.content}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-1">
                          <Badge className="bg-primary text-primary-foreground font-medium">{conversation.unread_count}</Badge>
                        </div>
                      </div>
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
        
        {/* Message Thread */}
        <div className={`flex-1 flex flex-col ${!conversationVisible && isMobile ? 'hidden' : 'flex'}`}>
          {activeConversation ? (
            <>
              <div className="p-4 border-b flex items-center">
                {isMobile && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="mr-2"
                    onClick={handleBackToList}
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
                {loadingMessages ? (
                  <div className="h-32 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : messages.length > 0 ? (
                  <>
                    {messages.map((message) => {
                      const isMe = message.sender_id === user?.id;
                      
                      return (
                        <div key={message.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
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
                    })}
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
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <Smile className="h-5 w-5 text-muted-foreground" />
                  </Button>
                  <Button className="shrink-0" size="icon" onClick={handleSendMessage} disabled={!messageInput.trim()}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">Your Messages</h3>
              <p className="text-muted-foreground mt-1 max-w-md">
                Connect with coaches, athletes, and agencies through direct messaging.
              </p>
              <Button className="mt-6 gap-2" onClick={() => setNewMessageOpen(true)}>
                <PlusCircle className="h-4 w-4" />
                Start a Conversation
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
