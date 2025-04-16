
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, PlusCircle } from 'lucide-react';

interface EmptyMessageStateProps {
  onNewMessageClick: () => void;
}

const EmptyMessageState = ({ onNewMessageClick }: EmptyMessageStateProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <MessageSquare className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold">Your Messages</h3>
      <p className="text-muted-foreground mt-1 max-w-md">
        Connect with coaches, athletes, and agencies through direct messaging.
      </p>
      <Button className="mt-6 gap-2" onClick={onNewMessageClick}>
        <PlusCircle className="h-4 w-4" />
        Start a Conversation
      </Button>
    </div>
  );
};

export default EmptyMessageState;
