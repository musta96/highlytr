
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlignJustify, X, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-highlyt-blue to-highlyt-green">
              <span className="sr-only">HighLytr</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">HighLytr</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/athletes" className="text-sm font-medium hover:text-highlyt-blue transition-colors">
            Athletes
          </Link>
          <Link to="/colleges" className="text-sm font-medium hover:text-highlyt-blue transition-colors">
            Colleges
          </Link>
          <Link to="/agencies" className="text-sm font-medium hover:text-highlyt-blue transition-colors">
            Agencies
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-highlyt-blue transition-colors">
            Pricing
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium hover:text-highlyt-blue transition-colors">
            How It Works
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-highlyt-blue transition-colors">
            About
          </Link>
        </nav>

        {/* Auth or Profile Buttons */}
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

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <AlignJustify className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden container py-4 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/athletes" 
              className="text-sm font-medium hover:text-highlyt-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Athletes
            </Link>
            <Link 
              to="/colleges" 
              className="text-sm font-medium hover:text-highlyt-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Colleges
            </Link>
            <Link 
              to="/agencies" 
              className="text-sm font-medium hover:text-highlyt-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Agencies
            </Link>
            <Link 
              to="/pricing" 
              className="text-sm font-medium hover:text-highlyt-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-sm font-medium hover:text-highlyt-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/about" 
              className="text-sm font-medium hover:text-highlyt-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <div className="pt-4 flex flex-col space-y-2">
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button variant="outline" className="w-full">Dashboard</Button>
                  </Link>
                  <Button 
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button variant="outline" className="w-full">Log in</Button>
                  </Link>
                  <Link 
                    to="/register" 
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button className="w-full">Sign up</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
