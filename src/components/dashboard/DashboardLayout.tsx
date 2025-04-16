
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from "@/lib/utils";
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import { useMobile } from '@/hooks/use-mobile';

const DashboardLayout = () => {
  const { isMobile } = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  
  return (
    <div className="h-screen flex flex-col">
      <DashboardHeader onMenuToggle={toggleSidebar} />
      <div className="flex-1 flex overflow-hidden">
        <aside 
          className={cn(
            "w-64 border-r bg-background transition-all duration-300 ease-in-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-16",
            isMobile && sidebarOpen ? "fixed inset-y-0 z-50 mt-16" : ""
          )}
        >
          <DashboardSidebar />
        </aside>
        <main 
          className={cn(
            "flex-1 overflow-y-auto transition-all duration-300",
            sidebarOpen ? "md:pl-64" : "md:pl-16"
          )}
        >
          <div className="container py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
