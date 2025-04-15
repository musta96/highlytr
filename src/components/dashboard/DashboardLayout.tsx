
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  User, 
  Building, 
  MessageSquare, 
  Search, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

const DashboardLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  // This would come from authentication in a real app
  const userType = 'athlete';
  
  const sidebarLinks = [
    {
      icon: <Home className="h-5 w-5" />,
      label: 'Dashboard',
      to: '/dashboard',
    },
    {
      icon: <User className="h-5 w-5" />,
      label: userType === 'athlete' ? 'My Profile' : 'Staff',
      to: userType === 'athlete' ? '/profile' : '/staff',
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: 'Messages',
      to: '/messages',
    },
    {
      icon: <Search className="h-5 w-5" />,
      label: userType === 'athlete' ? 'Find Colleges' : 'Find Athletes',
      to: userType === 'athlete' ? '/colleges/search' : '/athletes/search',
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: 'Settings',
      to: '/settings',
    },
  ];
  
  // Fix: TypeScript error by using string comparison instead of literal type comparison
  if (userType === 'college' || userType === 'agency') {
    sidebarLinks.splice(2, 0, {
      icon: <Building className="h-5 w-5" />,
      label: userType === 'college' ? 'College Profile' : 'Agency Profile',
      to: userType === 'college' ? '/college-profile' : '/agency-profile',
    });
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden p-4 bg-white border-b flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-highlyt-blue to-highlyt-green">
            <span className="sr-only">HighLytr</span>
          </div>
          <span className="font-bold text-xl">HighLytr</span>
        </Link>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50">
          <div className="fixed inset-y-0 left-0 w-64 bg-white p-4 overflow-y-auto z-50">
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex items-center space-x-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-highlyt-blue to-highlyt-green">
                  <span className="sr-only">HighLytr</span>
                </div>
                <span className="font-bold text-xl">HighLytr</span>
              </Link>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="space-y-1">
              {sidebarLinks.map((link, i) => (
                <Link
                  key={i}
                  to={link.to}
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
              
              <Link
                to="/logout"
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Link>
            </nav>
          </div>
          
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        </div>
      )}
      
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4 mb-5">
                <Link to="/" className="flex items-center space-x-2">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-highlyt-blue to-highlyt-green">
                    <span className="sr-only">HighLytr</span>
                  </div>
                  <span className="font-bold text-xl">HighLytr</span>
                </Link>
              </div>
              
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {sidebarLinks.map((link, i) => (
                  <Link
                    key={i}
                    to={link.to}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="flex-shrink-0 border-t border-gray-200 p-4">
              <Link
                to="/logout"
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
