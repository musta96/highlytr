
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  Check, 
  X, 
  MessageCircle,
  UserPlus,
  Users,
  Clock
} from 'lucide-react';

// Mock data for connection requests
const mockConnectionRequests = [
  {
    id: 1,
    type: 'incoming',
    user: {
      id: 101,
      name: 'Coach Sarah Williams',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      role: 'Head Soccer Coach',
      institution: 'University of California',
    },
    message: 'I watched your highlight reel and was impressed with your skills. Would love to discuss potential opportunities at our program.',
    date: '2 days ago',
  },
  {
    id: 2,
    type: 'incoming',
    user: {
      id: 102,
      name: 'Northwest Sports Agency',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
      role: 'Recruitment Agency',
      institution: '',
    },
    message: 'We represent athletes to several top D1 colleges. Would like to explore representing you.',
    date: '5 days ago',
  },
  {
    id: 3,
    type: 'outgoing',
    user: {
      id: 103,
      name: 'Stanford University',
      avatar: 'https://images.unsplash.com/photo-1562774053-701939374585',
      role: 'College',
      institution: '',
    },
    message: 'I am very interested in your soccer program and would appreciate the opportunity to connect.',
    date: '1 week ago',
    status: 'pending',
  },
  {
    id: 4,
    type: 'outgoing',
    user: {
      id: 104,
      name: 'Coach Robert Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      role: 'Assistant Coach',
      institution: 'UCLA',
    },
    message: 'Following up on my application to your summer camp program.',
    date: '2 weeks ago',
    status: 'accepted',
  },
];

// Mock data for established connections
const mockConnections = [
  {
    id: 1,
    user: {
      id: 201,
      name: 'University of Michigan',
      avatar: 'https://images.unsplash.com/photo-1580499376047-79a6c187ece4',
      role: 'College',
    },
    connectedSince: '3 months ago',
    unreadMessages: 0,
  },
  {
    id: 2,
    user: {
      id: 202,
      name: 'Coach Thomas Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      role: 'Head Soccer Coach',
      institution: 'Duke University',
    },
    connectedSince: '1 month ago',
    unreadMessages: 2,
  },
  {
    id: 3,
    user: {
      id: 203,
      name: 'Elite Sports Agency',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
      role: 'Agency',
    },
    connectedSince: '2 weeks ago',
    unreadMessages: 1,
  },
];

const ConnectionRequestCard = ({ request }: { request: any }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src={request.user.avatar} 
              alt={request.user.name} 
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{request.user.name}</h3>
                <p className="text-sm text-gray-600">
                  {request.user.role}
                  {request.user.institution && ` at ${request.user.institution}`}
                </p>
              </div>
              <span className="text-xs text-gray-500">{request.date}</span>
            </div>
            
            <p className="mt-2 text-sm">
              {request.message}
            </p>

            {request.type === 'incoming' ? (
              <div className="flex gap-2 mt-4">
                <Button className="flex-1">
                  <Check className="h-4 w-4 mr-2" />
                  Accept
                </Button>
                <Button variant="outline" className="flex-1">
                  <X className="h-4 w-4 mr-2" />
                  Decline
                </Button>
              </div>
            ) : (
              <div className="flex items-center mt-4">
                {request.status === 'pending' ? (
                  <div className="flex items-center text-sm text-amber-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Pending</span>
                  </div>
                ) : request.status === 'accepted' ? (
                  <div className="flex items-center text-sm text-green-600">
                    <Check className="h-4 w-4 mr-1" />
                    <span>Accepted</span>
                  </div>
                ) : (
                  <div className="flex items-center text-sm text-red-600">
                    <X className="h-4 w-4 mr-1" />
                    <span>Declined</span>
                  </div>
                )}

                <Button variant="ghost" size="sm" className="ml-auto">
                  Cancel Request
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ConnectionCard = ({ connection }: { connection: any }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src={connection.user.avatar} 
              alt={connection.user.name} 
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{connection.user.name}</h3>
                <p className="text-sm text-gray-600">{connection.user.role}</p>
                <p className="text-xs text-gray-500">Connected {connection.connectedSince}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">View Profile</Button>
                <Button className="relative" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                  {connection.unreadMessages > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {connection.unreadMessages}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ConnectionsPage = () => {
  const [activeTab, setActiveTab] = useState('connections');
  
  const incomingRequests = mockConnectionRequests.filter(r => r.type === 'incoming');
  const outgoingRequests = mockConnectionRequests.filter(r => r.type === 'outgoing');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Connections</h1>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Send Connection Request
        </Button>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} value={activeTab}>
        <TabsList>
          <TabsTrigger value="connections" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            My Connections
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Requests
            {incomingRequests.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {incomingRequests.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="connections" className="space-y-4 mt-6">
          {mockConnections.length > 0 ? (
            <div className="space-y-4">
              {mockConnections.map(connection => (
                <ConnectionCard key={connection.id} connection={connection} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No connections yet</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Start building your network by connecting with coaches, athletes, or agencies.
              </p>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Find People to Connect With
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="requests" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="font-semibold text-lg mb-4 flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Incoming Requests
                {incomingRequests.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {incomingRequests.length}
                  </span>
                )}
              </h2>
              
              {incomingRequests.length > 0 ? (
                <div className="space-y-4">
                  {incomingRequests.map(request => (
                    <ConnectionRequestCard key={request.id} request={request} />
                  ))}
                </div>
              ) : (
                <div className="border rounded-lg p-6 text-center">
                  <p className="text-gray-600">No incoming connection requests</p>
                </div>
              )}
            </div>
            
            <div>
              <h2 className="font-semibold text-lg mb-4">Sent Requests</h2>
              
              {outgoingRequests.length > 0 ? (
                <div className="space-y-4">
                  {outgoingRequests.map(request => (
                    <ConnectionRequestCard key={request.id} request={request} />
                  ))}
                </div>
              ) : (
                <div className="border rounded-lg p-6 text-center">
                  <p className="text-gray-600">No outgoing connection requests</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConnectionsPage;
