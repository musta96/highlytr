import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Settings, LogOut, Menu, Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { AccountType } from '@/components/auth/types';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface DashboardHeaderProps {
  onMenuToggle?: () => void;
  accountType?: AccountType | null;
}

const DashboardHeader = ({ onMenuToggle, accountType }: DashboardHeaderProps) => {
  const { user, signOut } = useAuth();
  
  const handleLogout = async () => {
    try {
      console.log("Dashboard header: Logging out user...");
      await signOut();
      toast.success("You've been logged out successfully");
      console.log("Dashboard header: Logout successful");
      // Auth provider will handle navigation
    } catch (error) {
      console.error("Dashboard header: Error logging out:", error);
      toast.error("Failed to log out");
    }
  };

  const getAccountTypeColor = (): string => {
    switch (accountType?.toLowerCase()) {
      case 'athlete': return 'bg-blue-500';
      case 'college': return 'bg-green-500';
      case 'agency': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          {onMenuToggle && (
            <Button variant="ghost" size="icon" onClick={onMenuToggle} className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Dashboard</h1>
            {accountType && (
              <Badge className={`ml-2 ${getAccountTypeColor()}`} variant="secondary">
                {accountType}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link to="/dashboard/notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden md:inline">{user?.user_metadata?.firstName || 'Account'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4" />
                  <span>Edit Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard/settings" className="flex items-center gap-2 cursor-pointer">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer">
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
