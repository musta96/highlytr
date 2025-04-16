
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlignJustify, X, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

// Import our components
import NavLogo from './navbar/NavLogo';
import DesktopNav from './navbar/DesktopNav';
import AuthButtons from './navbar/AuthButtons';
import MobileMenu from './navbar/MobileMenu';
import AuthenticatedNav from './navbar/AuthenticatedNav';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, accountType, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're in the dashboard area
  const isDashboard = location.pathname.includes('/dashboard');
  
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

  // If user is logged in but not in dashboard, show a simplified nav
  if (user && !isDashboard) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <NavLogo />
          
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="default">Go to Dashboard</Button>
            </Link>
            <AuthButtons user={user} handleLogout={handleLogout} />
          </div>
        </div>
      </header>
    );
  }
  
  // If in dashboard, show a "back to dashboard" button instead of full nav
  if (isDashboard && !location.pathname.endsWith('/dashboard') && !location.pathname.endsWith('/dashboard/')) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </header>
    );
  }

  // Default public nav or dashboard home
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <NavLogo />

        {/* Desktop Navigation - only show for public (non-authenticated) */}
        {!user && <DesktopNav mainNavItems={mainNavItems} />}
        
        {/* For authenticated users in dashboard home, show role-based nav */}
        {user && isDashboard && (
          <AuthenticatedNav accountType={accountType} />
        )}

        {/* Auth or Profile Buttons */}
        <AuthButtons user={user} handleLogout={handleLogout} />

        {/* Mobile Menu Button - only for public nav */}
        {!user && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <AlignJustify className="h-5 w-5" />}
          </Button>
        )}
      </div>

      {/* Mobile Navigation - only for public nav */}
      {!user && (
        <MobileMenu 
          isOpen={isOpen} 
          setIsOpen={setIsOpen} 
          mainNavItems={mainNavItems}
          user={user}
          handleLogout={handleLogout}
        />
      )}
    </header>
  );
};

export default Navbar;
