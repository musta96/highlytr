
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  MessageSquare, 
  Bell, 
  User, 
  Award, 
  Users, 
  School, 
  Settings,
  Building,
  Video,
  BookOpen,
  Calendar,
  Medal,
  BarChart2,
  Compass,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  badge?: number | string;
};

const SidebarItem = ({ icon: Icon, label, href, active, badge }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent relative",
        active ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
      {badge && (
        <span className="absolute right-2 bg-primary text-primary-foreground rounded-full h-5 min-w-5 flex items-center justify-center text-xs">
          {badge}
        </span>
      )}
    </Link>
  );
};

const DashboardSidebar = () => {
  const location = useLocation();
  const { user, accountType, signOut } = useAuth();
  const { toast } = useToast();
  
  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Success",
        description: "You've been logged out successfully",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };
  
  // Core navigation items for all account types
  const coreNavItems = [
    { icon: Home, label: 'Dashboard', href: `/dashboard/${accountType?.toLowerCase() || ''}` },
    { icon: User, label: 'My Profile', href: '/dashboard/profile' },
    { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages', badge: 3 },
    { icon: Bell, label: 'Notifications', href: '/dashboard/notifications', badge: 5 },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  // Role-specific navigation items
  const roleSpecificItems = {
    'athlete': [
      { icon: School, label: 'Discover Colleges', href: '/dashboard/colleges/search' },
      { icon: Video, label: 'Highlights', href: '/dashboard/highlights' },
      { icon: BookOpen, label: 'Academics', href: '/dashboard/academics' },
      { icon: Award, label: 'Leaderboard', href: '/dashboard/leaderboard' },
      { icon: Calendar, label: 'Events', href: '/dashboard/events' },
    ],
    'college': [
      { icon: Compass, label: 'Discover Athletes', href: '/dashboard/athletes/search' },
      { icon: Users, label: 'Coaches', href: '/dashboard/coaches' },
      { icon: Users, label: 'Staff', href: '/dashboard/staff' },
      { icon: Users, label: 'Teams', href: '/dashboard/teams' },
      { icon: BarChart2, label: 'Insights', href: '/dashboard/insights' },
    ],
    'agency': [
      { icon: Medal, label: 'My Athletes', href: '/dashboard/represented' },
      { icon: Compass, label: 'Discover Athletes', href: '/dashboard/athletes/search' },
      { icon: School, label: 'Discover Colleges', href: '/dashboard/colleges/search' },
      { icon: BarChart2, label: 'Placements', href: '/dashboard/placements' },
    ]
  };

  // Get the items for the current account type
  const currentRoleItems = roleSpecificItems[accountType as keyof typeof roleSpecificItems] || [];

  return (
    <div className="h-full py-4 flex flex-col justify-between">
      <div className="px-3 py-2">
        <div className="mb-4">
          <h3 className="px-4 text-sm font-semibold">Navigation</h3>
        </div>
        <div className="space-y-1 px-1">
          {coreNavItems.map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={location.pathname === item.href}
              badge={item.badge}
            />
          ))}
          
          {currentRoleItems.length > 0 && (
            <>
              <div className="mt-6 mb-2">
                <h3 className="px-4 text-xs font-semibold text-muted-foreground">Role-specific</h3>
              </div>
              {currentRoleItems.map((item) => (
                <SidebarItem
                  key={item.href}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  active={location.pathname === item.href}
                  badge={item.badge}
                />
              ))}
            </>
          )}
        </div>
      </div>
      
      <div className="mt-auto px-4 py-2 space-y-2">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground bg-accent/20">
          <User className="h-5 w-5" />
          <div className="flex-1 overflow-hidden">
            <p className="truncate">
              {user?.user_metadata?.firstName || 'User'} {user?.user_metadata?.lastName || ''}
            </p>
            <p className="truncate text-xs capitalize opacity-70">{accountType || 'User'}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
