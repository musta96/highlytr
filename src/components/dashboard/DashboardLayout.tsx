import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
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
  X,
  Users,
  FileText,
  Calendar,
  Bell,
  BookOpen
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

// Define user type as a proper union type
type UserType = 'athlete' | 'college' | 'agency';

const DashboardLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const { signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // This would come from authentication in a real app
  // We ensure userType is explicitly typed as UserType
  const userType = 'athlete' as UserType;
  
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
  
  const sidebarLinks = [
    {
      icon: <Home className="h-5 w-5" />,
      label: 'Dashboard',
      to: '/dashboard',
    },
    {
      icon: <User className="h-5 w-5" />,
      label: userType === 'athlete' 
        ? 'My Profile' 
        : userType === 'college' 
          ? 'Staff' 
          : 'Agency Profile',
      to: userType === 'athlete' 
        ? '/dashboard/profile' 
        : userType === 'college' 
          ? '/dashboard/staff' 
          : '/dashboard/agency-profile',
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: 'Messages',
      to: '/dashboard/messages',
    },
    {
      icon: <Bell className="h-5 w-5" />,
      label: 'Connections',
      to: '/dashboard/connections',
    },
    {
      icon: <Search className="h-5 w-5" />,
      label: (() => {
        if (userType === 'athlete') return 'Find Colleges';
        return 'Find Athletes';
      })(),
      to: (() => {
        if (userType === 'athlete') return '/dashboard/colleges/search';
        return '/dashboard/athletes/search';
      })(),
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: 'Settings',
      to: '/dashboard/settings',
    },
  ];
  
  if (userType === 'college') {
    sidebarLinks.splice(2, 0, {
      icon: <Building className="h-5 w-5" />,
      label: 'College Profile',
      to: '/dashboard/college-profile',
    });
    sidebarLinks.splice(3, 0, {
      icon: <Users className="h-5 w-5" />,
      label: 'Coaches',
      to: '/dashboard/coaches',
    });
    sidebarLinks.splice(4, 0, {
      icon: <FileText className="h-5 w-5" />,
      label: 'Teams',
      to: '/dashboard/teams',
    });
  } else if (userType === 'agency') {
    sidebarLinks.splice(2, 0, {
      icon: <Building className="h-5 w-5" />,
      label: 'Agency Profile',
      to: '/dashboard/agency-profile',
    });
    sidebarLinks.splice(3, 0, {
      icon: <Users className="h-5 w-5" />,
      label: 'Represented Athletes',
      to: '/dashboard/represented',
    });
  } else if (userType === 'athlete') {
    sidebarLinks.splice(2, 0, {
      icon: <BookOpen className="h-5 w-5" />,
      label: 'Academic Info',
      to: '/dashboard/academics',
    });
    sidebarLinks.splice(3, 0, {
      icon: <FileText className="h-5 w-5" />,
      label: 'Highlights',
      to: '/dashboard/highlights',
    });
    sidebarLinks.splice(4, 0, {
      icon: <Calendar className="h-5 w-5" />,
      label: 'Events',
      to: '/dashboard/events',
    });
  }

  const isActiveLink = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/dashboard';
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
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
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 ${
                    isActiveLink(link.to) ? 'bg-highlyt-blue/10 text-highlyt-blue font-medium' : ''
                  }`}
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
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 ${
                      isActiveLink(link.to) ? 'bg-highlyt-blue/10 text-highlyt-blue font-medium' : ''
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="flex-shrink-0 border-t border-gray-200 p-4">
              <Button
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full justify-start px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                variant="ghost"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
