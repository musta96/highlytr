import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/auth";
import ScrollToTop from "@/components/common/ScrollToTop";

// Pages
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Athletes from "./pages/Athletes";
import Colleges from "./pages/Colleges";
import Agencies from "./pages/Agencies";
import About from "./pages/About";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AthleteDetail from "./pages/AthleteDetail";
import ProfileSetup from "./pages/ProfileSetup";
import ProfileManagement from "./pages/ProfileManagement"; 
import HowItWorks from "./pages/HowItWorks";
import Layout from "./components/layout/Layout";
import Analytics from "./pages/Analytics"; 

// Other Pages
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Help from "./pages/Help";
import FAQs from "./pages/FAQs";
import Pricing from "./pages/Pricing";
import Leaderboard from "./pages/Leaderboard";

// Section Pages
import ForAthletes from "./pages/ForAthletes";
import ForColleges from "./pages/ForColleges";
import ForAgencies from "./pages/ForAgencies";
import SuccessStories from "./pages/SuccessStories";

// Auth
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RequireProfileSetup from "./components/auth/RequireProfileSetup";
import PublicRoute from "./components/auth/PublicRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <TooltipProvider>
          <Routes>
            {/* Public routes with redirect for authenticated users */}
            <Route element={<PublicRoute />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/athletes" element={<Athletes />} />
              <Route path="/athletes/:id" element={<AthleteDetail />} />
              <Route path="/colleges" element={<Colleges />} />
              <Route path="/agencies" element={<Agencies />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              
              {/* User type sections */}
              <Route path="/for-athletes" element={<ForAthletes />} />
              <Route path="/for-colleges" element={<ForColleges />} />
              <Route path="/for-agencies" element={<ForAgencies />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              
              {/* Legal and info pages that should remain accessible to logged in users */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/help" element={<Help />} />
              <Route path="/faqs" element={<FAQs />} />
            </Route>

            {/* Protected routes that require authentication */}
            <Route element={<ProtectedRoute />}>
              {/* Profile setup route */}
              <Route path="/profile-setup" element={<ProfileSetup />} />
              
              {/* Profile management route */}
              <Route path="/profile" element={<ProfileManagement />} />
              
              {/* Analytics route */}
              <Route path="/analytics" element={<Analytics />} />
              
              {/* Routes that require both authentication and completed profile */}
              <Route element={<RequireProfileSetup />}>
                {/* General dashboard route */}
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Type-specific dashboard routes */}
                <Route path="/dashboard/*" element={<Dashboard />} />
              </Route>
            </Route>
            
            {/* Catch-all route for unmatched paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
