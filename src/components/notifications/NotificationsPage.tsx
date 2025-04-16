
import React from 'react';
import { Bell, UserPlus, MessageSquare, Heart, CheckCheck, Clock, X, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: 'connection',
    user: { name: 'Coach Johnson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1587', school: 'Stanford University' },
    message: 'sent you a connection request',
    timestamp: '2 hours ago',
    read: false,
    actions: ['accept', 'decline']
  },
  {
    id: 2,
    type: 'message',
    user: { name: 'Sarah Williams', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1587', school: 'University of Michigan' },
    message: 'sent you a new message',
    timestamp: '3 hours ago',
    read: false,
    actions: ['view']
  },
  {
    id: 3,
    type: 'highlight',
    user: { name: 'Coach Rodriguez', avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1587', school: 'UCLA' },
    message: 'liked your highlight video',
    timestamp: 'Yesterday',
    read: true,
    actions: []
  },
  {
    id: 4,
    type: 'event',
    user: { name: 'University of Florida', avatar: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1470', school: '' },
    message: 'is hosting a recruitment camp on June 15',
    timestamp: '2 days ago',
    read: true,
    actions: ['interested', 'not interested']
  },
  {
    id: 5,
    type: 'connection',
    user: { name: 'Elite Sports Agency', avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1587', school: '' },
    message: 'accepted your connection request',
    timestamp: '3 days ago',
    read: true,
    actions: ['view profile']
  }
];

const renderIcon = (type: string) => {
  switch (type) {
    case 'connection':
      return <UserPlus className="h-5 w-5 text-blue-500" />;
    case 'message':
      return <MessageSquare className="h-5 w-5 text-green-500" />;
    case 'highlight':
      return <Heart className="h-5 w-5 text-red-500" />;
    case 'event':
      return <Calendar className="h-5 w-5 text-purple-500" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
};

const renderAction = (action: string) => {
  switch (action) {
    case 'accept':
      return (
        <Button size="sm" variant="default" className="h-8">
          Accept
        </Button>
      );
    case 'decline':
      return (
        <Button size="sm" variant="outline" className="h-8">
          Decline
        </Button>
      );
    case 'view':
      return (
        <Button size="sm" variant="default" className="h-8">
          View
        </Button>
      );
    case 'interested':
      return (
        <Button size="sm" variant="default" className="h-8">
          Interested
        </Button>
      );
    case 'not interested':
      return (
        <Button size="sm" variant="outline" className="h-8">
          Not Interested
        </Button>
      );
    case 'view profile':
      return (
        <Button size="sm" variant="outline" className="h-8">
          View Profile
        </Button>
      );
    default:
      return null;
  }
};

const NotificationsPage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="gap-2">
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="divide-y">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 ${notification.read ? '' : 'bg-blue-50'}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {renderIcon(notification.type)}
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <img 
                        src={notification.user.avatar} 
                        alt={notification.user.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">
                        {notification.user.name}
                        {notification.user.school && (
                          <span className="text-gray-500 font-normal"> • {notification.user.school}</span>
                        )}
                      </div>
                      <div className="text-sm">{notification.message}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {notification.timestamp}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {notification.actions.map((action, index) => (
                        <React.Fragment key={action}>
                          {renderAction(action)}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
