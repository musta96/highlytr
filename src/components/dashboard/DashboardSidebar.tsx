
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  MessageSquare, 
  Users, 
  Settings, 
  User, 
  BarChart2, 
  Video, 
  Bell, 
  Search,
  Medal,
  School,
  Briefcase,
  BookOpen,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/auth';
import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed?: boolean;
}

const SidebarLink = ({ to, icon, label, collapsed = false }: SidebarLinkProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-muted",
        isActive ? "bg-muted font-medium" : "text-muted-foreground",
        collapsed ? "justify-center" : ""
      )
    }
    title={collapsed ? label : undefined}
  >
    <div className={collapsed ? "w-6 h-6 flex items-center justify-center" : ""}>
      {icon}
    </div>
    {!collapsed && <span className="text-sm">{label}</span>}
  </NavLink>
);

interface DashboardSidebarProps {
  collapsed?: boolean;
}

const DashboardSidebar = ({ collapsed = false }: DashboardSidebarProps) => {
  const { accountType } = useAuth();
  
  return (
    <div className="h-full flex flex-col p-2">
      <div className={cn("mb-4 px-3 py-2", collapsed ? "text-center" : "")}>
        {!collapsed && <h2 className="text-lg font-semibold">Dashboard</h2>}
      </div>
      
      <nav className="space-y-1">
        <SidebarLink to="/dashboard" icon={<Home size={20} />} label="Overview" collapsed={collapsed} />
        <SidebarLink to="/dashboard/messages" icon={<MessageSquare size={20} />} label="Messages" collapsed={collapsed} />
        <SidebarLink to="/dashboard/connections" icon={<Users size={20} />} label="Connections" collapsed={collapsed} />
        <SidebarLink to="/analytics" icon={<BarChart2 size={20} />} label="Analytics" collapsed={collapsed} />
        <SidebarLink to="/dashboard/notifications" icon={<Bell size={20} />} label="Notifications" collapsed={collapsed} />
        
        {accountType === 'athlete' && (
          <>
            <div className={cn("h-px bg-border my-2", collapsed ? "mx-2" : "mx-1")}></div>
            <SidebarLink 
              to="/dashboard/colleges/search" 
              icon={<Search size={20} />} 
              label="Find Colleges" 
              collapsed={collapsed} 
            />
            <SidebarLink 
              to="/dashboard/profile" 
              icon={<User size={20} />} 
              label="Profile" 
              collapsed={collapsed} 
            />
            <SidebarLink 
              to="/dashboard/highlights" 
              icon={<Video size={20} />} 
              label="Highlights" 
              collapsed={collapsed} 
            />
            <SidebarLink 
              to="/dashboard/leaderboard" 
              icon={<Medal size={20} />} 
              label="Leaderboard" 
              collapsed={collapsed} 
            />
            <SidebarLink 
              to="/dashboard/academics" 
              icon={<BookOpen size={20} />} 
              label="Academics" 
              collapsed={collapsed} 
            />
          </>
        )}
        
        {accountType === 'college' && (
          <>
            <div className={cn("h-px bg-border my-2", collapsed ? "mx-2" : "mx-1")}></div>
            <SidebarLink 
              to="/dashboard/athletes/search" 
              icon={<Search size={20} />} 
              label="Find Athletes" 
              collapsed={collapsed} 
            />
            <SidebarLink 
              to="/dashboard/teams" 
              icon={<Users size={20} />} 
              label="Teams" 
              collapsed={collapsed} 
            />
            <SidebarLink 
              to="/dashboard/college-profile" 
              icon={<School size={20} />} 
              label="College Profile" 
              collapsed={collapsed} 
            />
          </>
        )}
        
        {accountType === 'agency' && (
          <>
            <div className={cn("h-px bg-border my-2", collapsed ? "mx-2" : "mx-1")}></div>
            <SidebarLink 
              to="/dashboard/represented" 
              icon={<Users size={20} />} 
              label="My Athletes" 
              collapsed={collapsed} 
            />
            <SidebarLink 
              to="/dashboard/placements" 
              icon={<Briefcase size={20} />} 
              label="Placements" 
              collapsed={collapsed} 
            />
            <SidebarLink 
              to="/dashboard/agency-profile" 
              icon={<Briefcase size={20} />} 
              label="Agency Profile" 
              collapsed={collapsed} 
            />
          </>
        )}
      </nav>
      
      <div className="mt-auto space-y-1">
        <div className={cn("h-px bg-border my-2", collapsed ? "mx-2" : "mx-1")}></div>
        <SidebarLink to="/dashboard/settings" icon={<Settings size={20} />} label="Settings" collapsed={collapsed} />
        <SidebarLink to="/help" icon={<HelpCircle size={20} />} label="Help" collapsed={collapsed} />
      </div>
    </div>
  );
};

export default DashboardSidebar;
