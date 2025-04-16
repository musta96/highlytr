
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  LogOut,
  ChevronRight,
  Activity
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

// Update the type to make badge optional
type SidebarNavItem = {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number | string;
  children?: SidebarNavItem[];
};

type SidebarItemProps = SidebarNavItem & {
  active?: boolean;
  isCollapsed?: boolean;
  isNested?: boolean;
};

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  href, 
  active, 
  badge, 
  children, 
  isCollapsed = false,
  isNested = false 
}: SidebarItemProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = children && children.length > 0;
  
  return (
    <div>
      {/* Main item */}
      <div
        onClick={() => {
          if (hasChildren) {
            setIsOpen(!isOpen);
          } else {
            navigate(href);
          }
        }}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent relative cursor-pointer",
          active && !hasChildren ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground",
          isNested && "pl-9" // Indentation for nested items
        )}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        {!isCollapsed && (
          <>
            <span className="flex-grow">{label}</span>
            {badge && (
              <span className="ml-auto bg-primary text-primary-foreground rounded-full h-5 min-w-5 flex items-center justify-center text-xs">
                {badge}
              </span>
            )}
            {hasChildren && (
              <ChevronRight className={cn("h-4 w-4 transition-transform", isOpen && "rotate-90")} />
            )}
          </>
        )}
      </div>
      
      {/* Render children if expanded */}
      {!isCollapsed && hasChildren && isOpen && (
        <div className="mt-1 space-y-1">
          {children.map((child, index) => (
            <Link
              key={index}
              to={child.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm pl-9 transition-all hover:bg-accent relative",
                useLocation().pathname === child.href ? "bg-accent/50 text-accent-foreground" : "text-muted-foreground"
              )}
            >
              <child.icon className="h-4 w-4" />
              <span>{child.label}</span>
              {child.badge && (
                <span className="ml-auto bg-primary text-primary-foreground rounded-full h-5 min-w-5 flex items-center justify-center text-xs">
                  {child.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const DashboardSidebar = () => {
  const location = useLocation();
  const { user, accountType, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // State to track if the sidebar is collapsed
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  
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
  
  // Core navigation items for all account types
  const coreNavItems: SidebarNavItem[] = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      href: `/dashboard/${accountType?.toLowerCase() || ''}`
    },
    { 
      icon: User, 
      label: 'Profile', 
      href: '/dashboard/profile'
    },
    { 
      icon: MessageSquare, 
      label: 'Messages', 
      href: '/dashboard/messages', 
      badge: 3 
    },
    { 
      icon: Activity, 
      label: 'Analytics', 
      href: '/analytics'
    },
    { 
      icon: Bell, 
      label: 'Notifications', 
      href: '/dashboard/notifications', 
      badge: 5 
    },
  ];

  // Role-specific navigation items with nested structure
  const athleteItems: SidebarNavItem[] = [
    { 
      icon: School, 
      label: 'Discover', 
      href: '/dashboard/discover',
      children: [
        { icon: School, label: 'Colleges', href: '/dashboard/colleges/search' },
        { icon: Users, label: 'Agencies', href: '/dashboard/agencies/search' }
      ]
    },
    { icon: Video, label: 'Highlights', href: '/dashboard/highlights' },
    { icon: BookOpen, label: 'Academics', href: '/dashboard/academics' },
    { icon: Award, label: 'Leaderboard', href: '/dashboard/leaderboard' },
    { icon: Calendar, label: 'Events', href: '/dashboard/events' },
  ];
  
  const collegeItems: SidebarNavItem[] = [
    { 
      icon: Compass, 
      label: 'Recruitment', 
      href: '/dashboard/recruitment',
      children: [
        { icon: Search, label: 'Find Athletes', href: '/dashboard/athletes/search' },
        { icon: Medal, label: 'Saved Prospects', href: '/dashboard/saved' }
      ]
    },
    { icon: Users, label: 'Teams', href: '/dashboard/teams' },
    { icon: Users, label: 'Coaches', href: '/dashboard/coaches' },
    { icon: Users, label: 'Staff', href: '/dashboard/staff' },
    { icon: BarChart2, label: 'Insights', href: '/dashboard/insights' },
  ];
  
  const agencyItems: SidebarNavItem[] = [
    { icon: Medal, label: 'My Athletes', href: '/dashboard/represented' },
    { 
      icon: Compass, 
      label: 'Discover', 
      href: '/dashboard/discover',
      children: [
        { icon: User, label: 'Athletes', href: '/dashboard/athletes/search' },
        { icon: School, label: 'Colleges', href: '/dashboard/colleges/search' }
      ]
    },
    { icon: BarChart2, label: 'Placements', href: '/dashboard/placements' },
  ];

  // Get the items for the current account type
  let roleSpecificItems: SidebarNavItem[] = [];
  if (accountType === 'athlete') {
    roleSpecificItems = athleteItems;
  } else if (accountType === 'college') {
    roleSpecificItems = collegeItems;
  } else if (accountType === 'agency') {
    roleSpecificItems = agencyItems;
  }

  // Add settings to the end of core items
  const bottomNavItems: SidebarNavItem[] = [
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' }
  ];

  return (
    <div className="h-full py-4 flex flex-col justify-between">
      <div className="px-3 py-2 flex-grow overflow-y-auto">
        <div className="mb-4">
          <div className="px-4 text-sm font-semibold flex items-center justify-between">
            <span className={cn(isCollapsed && "hidden")}>Navigation</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronRight className="h-4 w-4 rotate-180" />}
            </Button>
          </div>
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
              children={item.children}
              isCollapsed={isCollapsed}
            />
          ))}
          
          {roleSpecificItems.length > 0 && (
            <>
              <div className="mt-6 mb-2">
                <h3 className={cn("px-4 text-xs font-semibold text-muted-foreground", isCollapsed && "hidden")}>
                  Role-specific
                </h3>
              </div>
              {roleSpecificItems.map((item) => (
                <SidebarItem
                  key={item.href}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  active={location.pathname === item.href || (item.children && item.children.some(child => child.href === location.pathname))}
                  badge={item.badge}
                  children={item.children}
                  isCollapsed={isCollapsed}
                />
              ))}
            </>
          )}
          
          {/* Bottom navigation items */}
          <div className="mt-6">
            {bottomNavItems.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={location.pathname === item.href}
                badge={item.badge}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-auto px-4 py-2 space-y-2">
        <div className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground bg-accent/20",
          isCollapsed && "justify-center"
        )}>
          <User className="h-5 w-5" />
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate">
                {user?.user_metadata?.firstName || 'User'} {user?.user_metadata?.lastName || ''}
              </p>
              <p className="truncate text-xs capitalize opacity-70">{accountType || 'User'}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
