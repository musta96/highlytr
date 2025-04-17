
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/useAuth';

const DashboardLayout = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const location = useLocation();
  const { accountType } = useAuth();
  
  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  
  return (
    <div className="h-screen flex flex-col">
      <DashboardHeader onMenuToggle={toggleSidebar} accountType={accountType} />
      <div className="flex-1 flex overflow-hidden">
        <aside 
          className={cn(
            "border-r bg-background transition-all duration-300 ease-in-out z-50",
            sidebarOpen ? "w-64" : "w-16",
            isMobile ? "fixed inset-y-0 mt-16" : "relative",
            !sidebarOpen && isMobile && "-translate-x-full"
          )}
        >
          <DashboardSidebar collapsed={!sidebarOpen} />
        </aside>
        <main 
          className={cn(
            "flex-1 overflow-y-auto transition-all duration-300 ease-in-out",
            isMobile ? "w-full" : sidebarOpen ? "ml-64" : "ml-16"
          )}
        >
          <div className="container py-4 px-4 sm:px-6 max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Mobile overlay to close sidebar when clicked outside */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default DashboardLayout;
