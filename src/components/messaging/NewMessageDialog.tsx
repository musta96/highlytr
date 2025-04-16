
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DrawerContent, DrawerHeader, DrawerTitle, Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const NewMessageDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
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
    setOpen(false);
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
      <Drawer open={open} onOpenChange={setOpen}>
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
    <Dialog open={open} onOpenChange={setOpen}>
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

export default NewMessageDialog;
