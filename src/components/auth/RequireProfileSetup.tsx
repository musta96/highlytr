
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const RequireProfileSetup = () => {
  const { user, loading, profileCompleted, accountType } = useAuth();
  const location = useLocation();
  const [stableRender, setStableRender] = useState(false);
  const [renderPhase, setRenderPhase] = useState(0);
  
  // Add detailed console logging to help debug issues
  useEffect(() => {
    console.log('[RequireProfileSetup] Rendering with:', {
      isLoading: loading,
      hasUser: !!user,
      profileCompleted,
      accountType,
      path: location.pathname,
      userId: user?.id,
      metadata: user?.user_metadata,
      stableRender,
      renderPhase
    });
    
    // First quick stable render after 300ms
    if (renderPhase === 0) {
      const timer1 = setTimeout(() => {
        setRenderPhase(1);
      }, 300);
      return () => clearTimeout(timer1);
    }
    
    // Second more definitive stable render after 1500ms
    if (renderPhase === 1) {
      const timer2 = setTimeout(() => {
        setStableRender(true);
      }, 1500);
      return () => clearTimeout(timer2);
    }
  }, [user, loading, profileCompleted, accountType, location.pathname, stableRender, renderPhase]);

  // Always show loading UI until we are sure about the user state
  // This prevents the blank screen issue
  if (!stableRender || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-foreground mb-6">Loading your account information...</p>
        
        {/* Add a retry button that appears after a delay */}
        {renderPhase > 0 && (
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Retry Loading
          </Button>
        )}
      </div>
    );
  }

  // If user is not logged in, redirect to login
  if (!user) {
    console.log('[RequireProfileSetup] No user, redirecting to login');
    toast.error('You need to be logged in to access this page');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is logged in but hasn't completed their profile or doesn't have an account type,
  // redirect to profile setup unless they're already on the profile setup page
  if ((!profileCompleted || !accountType) && location.pathname !== '/profile-setup') {
    console.log('[RequireProfileSetup] User missing profile/account type, redirecting to setup');
    return <Navigate to="/profile-setup" replace />;
  }

  // If user is logged in and has completed their profile, allow access to protected routes
  console.log('[RequireProfileSetup] Profile requirements satisfied, rendering outlet');
  return <Outlet />;
};

export default RequireProfileSetup;
