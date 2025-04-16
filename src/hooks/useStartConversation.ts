
import { useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { createConversation } from '@/services/messageService';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const useStartConversation = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const startConversation = async (participantId: string) => {
    if (!user?.id) {
      toast({
        title: "Authentication required",
        description: "Please sign in to start a conversation",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setLoading(true);
      const conversationId = await createConversation(user.id, participantId);
      
      if (conversationId) {
        navigate(`/dashboard/messages?conversation=${conversationId}`);
      } else {
        toast({
          title: "Error",
          description: "Failed to start conversation",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast({
        title: "Error",
        description: "Failed to start conversation",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return { startConversation, loading };
};
