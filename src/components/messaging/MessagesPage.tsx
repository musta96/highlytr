
import React, { useState } from 'react';
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
  ArrowLeft
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const mockConversations = [
  {
    id: '1',
    recipient: {
      id: '101',
      name: 'John Smith',
      role: 'Basketball Coach',
      organization: 'Riverside University',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470',
      online: true
    },
    lastMessage: {
      content: 'Thanks for sending your highlight video! I was impressed with your court vision.',
      timestamp: '9:41 AM',
      read: true,
      sender: 'them'
    },
    unreadCount: 0
  },
  {
    id: '2',
    recipient: {
      id: '102',
      name: 'Coach Maria Rodriguez',
      role: 'Soccer Coach',
      organization: 'Elite Sports Academy',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374',
      online: true
    },
    lastMessage: {
      content: 'Would you be available for a call next Tuesday to discuss scholarship opportunities?',
      timestamp: 'Yesterday',
      read: false,
      sender: 'them'
    },
    unreadCount: 2
  },
  {
    id: '3',
    recipient: {
      id: '103',
      name: 'David Wilson',
      role: 'Athletic Director',
      organization: 'Central State University',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374',
      online: false
    },
    lastMessage: {
      content: 'I sent you the information about our upcoming campus visit day.',
      timestamp: 'Monday',
      read: true,
      sender: 'you'
    },
    unreadCount: 0
  },
  {
    id: '4',
    recipient: {
      id: '104',
      name: 'Sarah Johnson',
      role: 'Agent',
      organization: 'Premier Sports Agency',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376',
      online: false
    },
    lastMessage: {
      content: 'Looking forward to discussing your future plans after graduation!',
      timestamp: '08/12/2024',
      read: true,
      sender: 'them'
    },
    unreadCount: 0
  }
];

const mockMessages = [
  {
    id: '1',
    senderId: '101',
    content: 'Hello! I saw your profile and was impressed by your highlight reel. Particularly that three-pointer in the championship game.',
    timestamp: '9:30 AM',
    read: true
  },
  {
    id: '2',
    senderId: 'me',
    content: 'Thank you so much for reaching out! That game was definitely one of my best performances.',
    timestamp: '9:32 AM',
    read: true
  },
  {
    id: '3',
    senderId: '101',
    content: 'We\'re looking for players with your skill set for our upcoming season. Would you be interested in learning more about our program?',
    timestamp: '9:35 AM',
    read: true
  },
  {
    id: '4',
    senderId: 'me',
    content: 'Absolutely! I\'ve actually been following your team for a while and I\'m very interested.',
    timestamp: '9:36 AM',
    read: true
  },
  {
    id: '5',
    senderId: '101',
    content: 'Great! I\'ve attached some information about our basketball program, scholarship opportunities, and campus life.',
    timestamp: '9:38 AM',
    read: true,
    attachment: {
      type: 'document',
      name: 'Riverside_Basketball_Program_Info.pdf'
    }
  },
  {
    id: '6',
    senderId: 'me',
    content: 'Thanks for sending this over! I\'ll review it and get back to you with any questions. Is there anything specific I should focus on?',
    timestamp: '9:40 AM',
    read: true
  },
  {
    id: '7',
    senderId: '101',
    content: 'Thanks for sending your highlight video! I was impressed with your court vision.',
    timestamp: '9:41 AM',
    read: true
  }
];

const MessagesPage = () => {
  const isMobile = useIsMobile();
  const [activeConversation, setActiveConversation] = useState(mockConversations[0]);
  const [conversationVisible, setConversationVisible] = useState(!isMobile);
  const [messageInput, setMessageInput] = useState('');

  const handleSelectConversation = (conversation: any) => {
    setActiveConversation(conversation);
    if (isMobile) {
      setConversationVisible(true);
    }
  };

  const handleBackToList = () => {
    setConversationVisible(false);
  };

  const sendMessage = () => {
    if (!messageInput.trim()) return;
    
    // In a real app, this would send the message to a backend
    console.log('Sending message:', messageInput);
    setMessageInput('');
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
              />
            </div>
          </div>
          
          <Tabs defaultValue="all" className="flex-1 overflow-hidden flex flex-col">
            <div className="px-4 pt-2">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                <TabsTrigger value="archived" className="flex-1">Archived</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="flex-1 overflow-y-auto">
              <div className="divide-y">
                {mockConversations.map((conversation) => (
                  <div 
                    key={conversation.id} 
                    className={`p-3 hover:bg-muted cursor-pointer ${activeConversation.id === conversation.id ? 'bg-muted' : ''}`}
                    onClick={() => handleSelectConversation(conversation)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conversation.recipient.avatar} alt={conversation.recipient.name} />
                          <AvatarFallback>{conversation.recipient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {conversation.recipient.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold truncate">{conversation.recipient.name}</h3>
                          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{conversation.lastMessage.timestamp}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{conversation.recipient.role}, {conversation.recipient.organization}</p>
                        <p className="text-sm truncate">
                          {conversation.lastMessage.sender === 'you' && 'You: '}
                          {conversation.lastMessage.content}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-1">
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-highlyt-blue text-white font-medium">{conversation.unreadCount}</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="unread" className="flex-1 overflow-y-auto">
              <div className="divide-y">
                {mockConversations.filter(c => c.unreadCount > 0).map((conversation) => (
                  <div 
                    key={conversation.id} 
                    className="p-3 hover:bg-muted cursor-pointer"
                    onClick={() => handleSelectConversation(conversation)}
                  >
                    {/* Same content as above, filtered for unread messages */}
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={conversation.recipient.avatar} alt={conversation.recipient.name} />
                        <AvatarFallback>{conversation.recipient.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h3 className="font-semibold truncate">{conversation.recipient.name}</h3>
                          <span className="text-xs text-muted-foreground">{conversation.lastMessage.timestamp}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{conversation.recipient.role}, {conversation.recipient.organization}</p>
                        <p className="text-sm truncate">{conversation.lastMessage.content}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-1">
                      <Badge className="bg-highlyt-blue text-white font-medium">{conversation.unreadCount}</Badge>
                    </div>
                  </div>
                ))}
                
                {mockConversations.filter(c => c.unreadCount > 0).length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">
                    <p>No unread messages</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="archived" className="flex-1 overflow-y-auto">
              <div className="p-8 text-center text-muted-foreground">
                <p>No archived messages</p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="p-4 border-t">
            <Button className="w-full gap-2">
              <PlusCircle className="h-4 w-4" />
              New Message
            </Button>
          </div>
        </div>
        
        {/* Conversation View */}
        <div className={`flex-1 flex flex-col ${!conversationVisible && isMobile ? 'hidden' : 'flex'}`}>
          {activeConversation && (
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
                  <AvatarImage src={activeConversation.recipient.avatar} alt={activeConversation.recipient.name} />
                  <AvatarFallback>{activeConversation.recipient.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center">
                    <h2 className="font-semibold">{activeConversation.recipient.name}</h2>
                    {activeConversation.recipient.online && (
                      <span className="ml-2 text-xs text-green-600 font-medium">Online</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{activeConversation.recipient.role}, {activeConversation.recipient.organization}</p>
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
                {mockMessages.map((message) => {
                  const isMe = message.senderId === 'me';
                  
                  return (
                    <div key={message.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] ${isMe ? 'bg-highlyt-blue text-white' : 'bg-muted'} rounded-lg p-3`}>
                        {message.content}
                        
                        {message.attachment && (
                          <div className="mt-2 bg-white/10 rounded p-2 flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{message.attachment.name}</span>
                          </div>
                        )}
                        
                        <div className={`text-xs ${isMe ? 'text-blue-100' : 'text-muted-foreground'} mt-1 text-right`}>
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                        sendMessage();
                      }
                    }}
                  />
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <Smile className="h-5 w-5 text-muted-foreground" />
                  </Button>
                  <Button className="shrink-0" size="icon" onClick={sendMessage} disabled={!messageInput.trim()}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          )}
          
          {!activeConversation && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">Your Messages</h3>
              <p className="text-muted-foreground mt-1 max-w-md">
                Connect with coaches, athletes, and agencies through direct messaging.
              </p>
              <Button className="mt-6 gap-2">
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
