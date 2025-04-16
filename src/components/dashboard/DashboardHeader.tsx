
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, MessageSquare, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  onMenuToggle: () => void;
}

const DashboardHeader = ({ onMenuToggle }: DashboardHeaderProps) => {
  const { signOut, user, accountType } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Success",
        description: "You've been logged out successfully",
      });
      navigate('/');
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  // Define search placeholder based on user type
  const getSearchPlaceholder = () => {
    switch(accountType?.toLowerCase()) {
      case 'athlete':
        return 'Search colleges...';
      case 'college':
        return 'Search athletes...';
      case 'agency':
        return 'Search athletes or colleges...';
      default:
        return 'Search...';
    }
  };
  
  return (
    <header className="h-16 border-b flex items-center px-4 sticky top-0 bg-background/95 backdrop-blur z-30">
      <div className="flex items-center gap-2 md:hidden">
        <Button variant="ghost" size="icon" onClick={onMenuToggle}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-highlyt-blue to-highlyt-green">
            <span className="sr-only">HighLytr</span>
          </div>
          <span className="font-bold text-xl hidden sm:inline-block">HighLytr</span>
        </Link>
        
        <div className="hidden md:block flex-1 px-10 max-w-md">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              placeholder={getSearchPlaceholder()}
              className="h-9 w-full rounded-md border border-input bg-background px-8 text-sm"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link to="/dashboard/messages">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link to="/dashboard/notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
            </Link>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-muted">
                  <span className="absolute inset-0 flex items-center justify-center font-medium text-sm">
                    {user?.user_metadata?.firstName?.[0] || 'U'}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/dashboard/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
