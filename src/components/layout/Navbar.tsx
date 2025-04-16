
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlignJustify, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

// Import our new components
import NavLogo from './navbar/NavLogo';
import DesktopNav from './navbar/DesktopNav';
import AuthButtons from './navbar/AuthButtons';
import MobileMenu from './navbar/MobileMenu';

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
        {/* Logo */}
        <NavLogo />

        {/* Desktop Navigation */}
        <DesktopNav mainNavItems={mainNavItems} />

        {/* Auth or Profile Buttons */}
        <AuthButtons user={user} handleLogout={handleLogout} />

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
      <MobileMenu 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        mainNavItems={mainNavItems}
        user={user}
        handleLogout={handleLogout}
      />
    </header>
  );
};

export default Navbar;
