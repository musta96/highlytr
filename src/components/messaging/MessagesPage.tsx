
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  ChevronLeft,
  Paperclip,
  MoreVertical,
  Search,
  Phone,
  Video,
  Clock,
  Check,
  CheckCheck 
} from 'lucide-react';

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    user: {
      id: 101,
      name: 'Coach Sarah Williams',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      role: 'Head Soccer Coach',
      institution: 'University of California',
      online: true,
    },
    lastMessage: {
      text: 'Looking forward to seeing more of your game footage!',
      time: '10:23 AM',
      isRead: true,
      sender: 'them',
    },
    unread: 0,
  },
  {
    id: 2,
    user: {
      id: 102,
      name: 'Stanford University',
      avatar: 'https://images.unsplash.com/photo-1562774053-701939374585',
      role: 'College',
      online: false,
    },
    lastMessage: {
      text: 'Thank you for your interest in our program.',
      time: 'Yesterday',
      isRead: false,
      sender: 'them',
    },
    unread: 1,
  },
  {
    id: 3,
    user: {
      id: 103,
      name: 'Elite Sports Agency',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
      role: 'Agency',
      online: false,
    },
    lastMessage: {
      text: 'We would like to represent you for college recruitment.',
      time: '2 days ago',
      isRead: true,
      sender: 'them',
    },
    unread: 0,
  },
  {
    id: 4,
    user: {
      id: 104,
      name: 'Coach Robert Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      role: 'Assistant Coach',
      institution: 'UCLA',
      online: true,
    },
    lastMessage: {
      text: 'I sent you information about our summer camp program.',
      time: '3 days ago',
      isRead: true,
      sender: 'them',
    },
    unread: 0,
  },
];

// Mock data for messages in a conversation
const mockMessages = [
  {
    id: 1,
    sender: 'them',
    text: 'Hello Marco! I watched your highlight reel and was impressed with your skills. We might have a spot for you in our team next season.',
    time: 'Yesterday, 10:30 AM',
    status: 'read',
  },
  {
    id: 2,
    sender: 'me',
    text: 'Thank you so much, Coach Williams! I am very interested in your soccer program.',
    time: 'Yesterday, 11:45 AM',
    status: 'read',
  },
  {
    id: 3,
    sender: 'them',
    text: 'Great to hear! Do you have any questions about our program or the application process?',
    time: 'Yesterday, 2:15 PM',
    status: 'read',
  },
  {
    id: 4,
    sender: 'me',
    text: 'Yes, I was wondering about scholarship opportunities for international students and what the tryout process looks like?',
    time: 'Yesterday, 3:30 PM',
    status: 'read',
  },
  {
    id: 5,
    sender: 'them',
    text: 'We do offer partial scholarships for exceptional international athletes, and tryouts typically happen in the spring. However, since you're overseas, we can arrange a video assessment. Could you share more recent game footage?',
    time: 'Today, 9:00 AM',
    status: 'read',
  },
  {
    id: 6,
    sender: 'me',
    text: 'That sounds great! I have footage from my latest tournament last month. I will compile it and share it with you by tomorrow.',
    time: 'Today, 10:15 AM',
    status: 'delivered',
  },
];

const ConversationList = ({ conversations, activeConversation, setActiveConversation }: any) => {
  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <div className="space-y-1 p-2">
        {conversations.map((conversation: any) => (
          <button
            key={conversation.id}
            className={`flex items-start gap-3 w-full p-3 rounded-lg text-left ${
              activeConversation?.id === conversation.id 
                ? 'bg-highlyt-blue/10' 
                : 'hover:bg-gray-100'
            }`}
            onClick={() => setActiveConversation(conversation)}
          >
            <div className="relative">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img 
                  src={conversation.user.avatar} 
                  alt={conversation.user.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              {conversation.user.online && (
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium truncate">{conversation.user.name}</h3>
                <span className="text-xs text-gray-500">{conversation.lastMessage.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {conversation.lastMessage.sender === 'me' ? 'You: ' : ''}
                {conversation.lastMessage.text}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {conversation.user.role}
                {conversation.user.institution && ` at ${conversation.user.institution}`}
              </p>
            </div>
            
            {conversation.unread > 0 && (
              <div className="flex-shrink-0 h-5 w-5 bg-highlyt-blue text-white rounded-full flex items-center justify-center text-xs">
                {conversation.unread}
              </div>
            )}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
};

const MessageBubble = ({ message }: { message: any }) => {
  return (
    <div 
      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div 
        className={`max-w-[80%] p-3 rounded-lg ${
          message.sender === 'me' 
            ? 'bg-highlyt-blue text-white rounded-tr-none' 
            : 'bg-gray-100 rounded-tl-none'
        }`}
      >
        <p className="mb-1">{message.text}</p>
        <div className="flex justify-end items-center gap-1 text-xs opacity-70">
          <span>{message.time}</span>
          {message.sender === 'me' && (
            message.status === 'sent' ? (
              <Clock className="h-3 w-3" />
            ) : message.status === 'delivered' ? (
              <Check className="h-3 w-3" />
            ) : (
              <CheckCheck className="h-3 w-3" />
            )
          )}
        </div>
      </div>
    </div>
  );
};

const ConversationView = ({ conversation }: { conversation: any }) => {
  const [messageInput, setMessageInput] = useState('');
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {/* Conversation Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <div className="relative">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img 
                src={conversation.user.avatar} 
                alt={conversation.user.name} 
                className="h-full w-full object-cover"
              />
            </div>
            {conversation.user.online && (
              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          
          <div>
            <h3 className="font-medium">{conversation.user.name}</h3>
            <p className="text-xs text-gray-600">
              {conversation.user.online ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {mockMessages.map(message => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>
      
      {/* Message Input */}
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Button variant="ghost" type="button" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input 
            placeholder="Type a message..." 
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={!messageInput.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

const MessagesPage = () => {
  const [activeConversation, setActiveConversation] = useState(mockConversations[0]);
  const [query, setQuery] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);

  // Filter conversations based on search query
  const filteredConversations = query 
    ? mockConversations.filter(c => 
        c.user.name.toLowerCase().includes(query.toLowerCase()) || 
        (c.lastMessage.text.toLowerCase().includes(query.toLowerCase()))
      )
    : mockConversations;
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Conversation List Column */}
          <div className={`border-r ${isMobileView ? 'hidden md:block' : 'block'}`}>
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search messages..."
                  className="pl-9"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
            
            <ConversationList 
              conversations={filteredConversations} 
              activeConversation={activeConversation} 
              setActiveConversation={(conversation: any) => {
                setActiveConversation(conversation);
                setIsMobileView(true);
              }}
            />
          </div>
          
          {/* Conversation View Column */}
          <div className={`md:col-span-2 ${isMobileView ? 'block' : 'hidden md:block'}`}>
            {activeConversation ? (
              <ConversationView conversation={activeConversation} />
            ) : (
              <div className="h-[calc(100vh-12rem)] flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 mb-4">
                    <MessageCircle className="h-7 w-7 text-gray-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">No conversation selected</h3>
                  <p className="text-gray-600 max-w-xs mx-auto">
                    Choose a conversation from the list or start a new one.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
