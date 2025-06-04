
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { useState } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { scrollToTop } from "@/utils/scroll";

// Pages
import Index from "./pages/Index";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Candidates from "./pages/Candidates";
import CandidateProfile from "./pages/CandidateProfile";
import Companies from "./pages/Companies";
import CompanyDetail from "./pages/CompanyDetail";
import CompanyJobs from "./pages/CompanyJobs";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import RegisterFlow from "./pages/RegisterFlow";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Profile from "./pages/Profile";
import EditProfile from "./pages/profile/EditProfile";
import AppliedJobs from "./pages/profile/AppliedJobs";
import SavedJobs from "./pages/profile/SavedJobs";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCandidates from "./pages/admin/AdminCandidates";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminCompanies from "./pages/admin/AdminCompanies";
import AdminLayout from "./components/admin/AdminLayout";

// Admin IAM Pages
import AdminIAM from "./pages/admin/iam/AdminIAM";
import AdminUsers from "./pages/admin/iam/AdminUsers";
import AdminGroups from "./pages/admin/iam/AdminGroups";
import AdminPermissions from "./pages/admin/iam/AdminPermissions";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return null;
};

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="hire-at-theme">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetail />} />
                <Route path="/candidates" element={<Candidates />} />
                <Route path="/candidates/:id" element={<CandidateProfile />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/companies/:id" element={<CompanyDetail />} />
                <Route path="/companies/:id/jobs" element={<CompanyJobs />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/register" element={<RegisterFlow />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<EditProfile />} />
                <Route path="/profile/applied-jobs" element={<AppliedJobs />} />
                <Route path="/profile/saved-jobs" element={<SavedJobs />} />
                
                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="candidates" element={<AdminCandidates />} />
                  <Route path="jobs" element={<AdminJobs />} />
                  <Route path="companies" element={<AdminCompanies />} />
                  
                  {/* IAM Routes */}
                  <Route path="iam" element={<AdminIAM />} />
                  <Route path="iam/users" element={<AdminUsers />} />
                  <Route path="iam/groups" element={<AdminGroups />} />
                  <Route path="iam/permissions" element={<AdminPermissions />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
