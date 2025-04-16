
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AuthButtonsProps {
  user: any;
  handleLogout: () => void;
}

const AuthButtons = ({ user, handleLogout }: AuthButtonsProps) => {
  return (
    <div className="hidden md:flex items-center gap-4">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link to="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link to="/register">
            <Button>Sign up</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
