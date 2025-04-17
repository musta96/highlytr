import React, { useState } from 'react';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Notifications</h4>
                  <Link to="/dashboard/notifications" className="text-sm text-blue-600 hover:text-blue-800">
                    View all
                  </Link>
                </div>
                <div className="space-y-2">
                  {/* Show latest 3 notifications */}
                  <div className="p-2 hover:bg-gray-50 rounded-lg">
                    <p className="text-sm">Coach Johnson sent you a connection request</p>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <div className="p-2 hover:bg-gray-50 rounded-lg">
                    <p className="text-sm">New message from Sarah Williams</p>
                    <span className="text-xs text-gray-500">3 hours ago</span>
                  </div>
                  <div className="p-2 hover:bg-gray-50 rounded-lg">
                    <p className="text-sm">Coach Rodriguez liked your highlight video</p>
                    <span className="text-xs text-gray-500">Yesterday</span>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
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
