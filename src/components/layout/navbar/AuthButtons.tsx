
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface AuthButtonsProps {
  user: any;
}

const AuthButtons = ({ user }: AuthButtonsProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log("AuthButtons: Logging out user...");
      await signOut();
      toast.success("You've been logged out successfully");
      console.log("AuthButtons: Logout successful");
    } catch (error) {
      console.error("AuthButtons: Error logging out:", error);
      toast.error("Failed to log out");
    }
  };

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
            <DropdownMenuItem 
              onClick={() => navigate('/dashboard')} 
              className="flex items-center gap-2 cursor-pointer"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                Settings
              </Link>
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

