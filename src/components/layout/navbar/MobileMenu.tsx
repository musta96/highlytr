
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  mainNavItems: Array<{ title: string; href: string }>;
  user: any;
  handleLogout: () => void;
}

const MobileMenu = ({ 
  isOpen, 
  setIsOpen, 
  mainNavItems,
  user, 
  handleLogout 
}: MobileMenuProps) => {
  if (!isOpen) return null;
  
  return (
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
  );
};

export default MobileMenu;
