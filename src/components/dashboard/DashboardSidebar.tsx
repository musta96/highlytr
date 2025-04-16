
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  MessageSquare, 
  Bell, 
  User, 
  Bookmark, 
  Users, 
  School, 
  Settings,
  Building,
  Video,
  BookOpen,
  Calendar,
  Medal
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
};

const SidebarItem = ({ icon: Icon, label, href, active }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
        active ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

const DashboardSidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const accountType = user?.user_metadata?.accountType || 'athlete'; 
  
  // Common navigation items for all account types
  const commonItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages' },
    { icon: Bell, label: 'Notifications', href: '/dashboard/notifications' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  // Account type specific navigation items
  const accountItems = {
    'athlete': [
      { icon: User, label: 'My Profile', href: '/dashboard/profile' },
      { icon: Video, label: 'Highlights', href: '/dashboard/highlights' },
      { icon: School, label: 'Search Colleges', href: '/dashboard/colleges/search' },
      { icon: Bookmark, label: 'Saved Colleges', href: '/dashboard/saved' },
      { icon: BookOpen, label: 'Academics', href: '/dashboard/academics' },
      { icon: Calendar, label: 'Events', href: '/dashboard/events' },
    ],
    'college': [
      { icon: School, label: 'College Profile', href: '/dashboard/college-profile' },
      { icon: Search, label: 'Search Athletes', href: '/dashboard/athletes/search' },
      { icon: Users, label: 'Coaches', href: '/dashboard/coaches' },
      { icon: Users, label: 'Staff', href: '/dashboard/staff' },
      { icon: Users, label: 'Teams', href: '/dashboard/teams' },
    ],
    'agency': [
      { icon: Building, label: 'Agency Profile', href: '/dashboard/agency-profile' },
      { icon: Medal, label: 'My Athletes', href: '/dashboard/represented' },
      { icon: Search, label: 'Search Athletes', href: '/dashboard/athletes/search' },
      { icon: School, label: 'Search Colleges', href: '/dashboard/colleges/search' },
    ]
  };

  // Get the items for the current account type
  const currentItems = [
    ...commonItems,
    ...(accountItems[accountType as keyof typeof accountItems] || [])
  ];

  return (
    <div className="h-full py-4 flex flex-col justify-between">
      <div className="px-3 py-2">
        <div className="mb-4">
          <h3 className="px-4 text-sm font-semibold">Navigation</h3>
        </div>
        <div className="space-y-1 px-1">
          {currentItems.map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={location.pathname === item.href}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-auto px-4 py-2">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground bg-accent/20">
          <User className="h-5 w-5" />
          <span>
            {user?.user_metadata?.firstName || 'User'} {user?.user_metadata?.lastName || ''}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
