
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlignJustify, X, User, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
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

  const mainNavItems = [
    { title: 'For Athletes', href: '/for-athletes' },
    { title: 'For Colleges', href: '/for-colleges' },
    { title: 'For Agencies', href: '/for-agencies' },
  ];

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
          {/* Primary Navigation */}
          {mainNavItems.map((item) => (
            <Link 
              key={item.href}
              to={item.href} 
              className="text-sm font-medium hover:text-highlyt-blue transition-colors"
            >
              {item.title}
            </Link>
          ))}

          {/* Resources Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm font-medium hover:text-highlyt-blue transition-colors flex items-center gap-1">
                Resources <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link to="/about" className="w-full">About Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/how-it-works" className="w-full">How It Works</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/success-stories" className="w-full">Success Stories</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/blog" className="w-full">Blog</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/faqs" className="w-full">FAQs</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/pricing" className="text-sm font-medium hover:text-highlyt-blue transition-colors">
            Pricing
          </Link>

          <Link to="/contact" className="text-sm font-medium hover:text-highlyt-blue transition-colors">
            Contact
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
            {/* Main Nav Items */}
            {mainNavItems.map((item) => (
              <Link 
                key={item.href}
                to={item.href} 
                className="text-sm font-medium hover:text-highlyt-blue transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            
            {/* Resources Section */}
            <div className="border-t pt-2 mt-2">
              <p className="text-sm text-muted-foreground mb-2">Resources</p>
              <div className="flex flex-col space-y-3 pl-2">
                <Link 
                  to="/about" 
                  className="text-sm font-medium hover:text-highlyt-blue transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>
                <Link 
                  to="/how-it-works" 
                  className="text-sm font-medium hover:text-highlyt-blue transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  How It Works
                </Link>
                <Link 
                  to="/success-stories" 
                  className="text-sm font-medium hover:text-highlyt-blue transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Success Stories
                </Link>
                <Link 
                  to="/blog" 
                  className="text-sm font-medium hover:text-highlyt-blue transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  to="/faqs" 
                  className="text-sm font-medium hover:text-highlyt-blue transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  FAQs
                </Link>
              </div>
            </div>
            
            <Link 
              to="/pricing" 
              className="text-sm font-medium hover:text-highlyt-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            
            <Link 
              to="/contact" 
              className="text-sm font-medium hover:text-highlyt-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
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
