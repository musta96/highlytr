import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  mainNavItems: { title: string; href: string }[];
  user: any;
}

const MobileMenu = ({ isOpen, setIsOpen, mainNavItems, user }: MobileMenuProps) => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      console.log("Mobile menu: Logging out user...");
      // First, close the mobile menu
      setIsOpen(false);
      
      // Then attempt to sign out
      await signOut();
      toast.success("You've been logged out successfully");
      console.log("Mobile menu: Logout successful");
      // Auth provider will handle navigation
    } catch (error) {
      console.error("Mobile menu: Error logging out:", error);
      toast.error("Failed to log out");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="fixed inset-0 flex flex-col z-50 bg-background border-t">
        <div className="flex flex-col p-4 overflow-y-auto">
          {/* Main navigation items */}
          {mainNavItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="py-2 text-lg"
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </Link>
          ))}

          {/* Auth buttons */}
          <div className="mt-6 pt-6 border-t flex flex-col gap-2">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  <Button className="w-full" variant="default">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button className="w-full" variant="outline">
                    Log in
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full" variant="default">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
