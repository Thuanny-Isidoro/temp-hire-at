
import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/components/ui/use-toast';

const AdminLayout = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const location = useLocation();
  
  // Check if user is authenticated and has valid domain
  const isAuthenticated = (): { isValid: boolean, user: any } => {
    const userKeys = Object.keys(localStorage);
    const userEmail = userKeys.find((key) => key.includes('@'));
    
    if (!userEmail) return { isValid: false, user: null };
    
    // Check if the email is from seventechnologies.cloud domain
    const isValidDomain = userEmail.endsWith('@seventechnologies.cloud');
    
    if (!isValidDomain) return { isValid: false, user: null };
    
    try {
      const userData = JSON.parse(localStorage.getItem(userEmail) || '{}');
      return { isValid: true, user: { email: userEmail, ...userData } };
    } catch (e) {
      return { isValid: true, user: { email: userEmail } };
    }
  };
  
  // Check if user has permission for current route
  const hasPermission = (user: any, path: string): boolean => {
    // Master admin has access to everything
    if (user.email === 'admin@seventechnologies.cloud') {
      return true;
    }

    // If user has admin role, allow access to everything
    if (user.role === 'admin') {
      return true;
    }
    
    // Load permissions from IAM policies
    const permissions = user.permissions || [];
    
    // Main dashboard is accessible to all authenticated users
    if (path === '/admin') {
      return true;
    }

    // Check specific permissions based on path
    if (path.startsWith('/admin/candidates')) {
      return permissions.includes('manage_candidates');
    }

    if (path.startsWith('/admin/jobs')) {
      return permissions.includes('manage_jobs');
    }

    if (path.startsWith('/admin/companies')) {
      return permissions.includes('manage_companies');
    }

    // For IAM section, require specific IAM management permissions
    if (path.startsWith('/admin/iam')) {
      return permissions.includes('manage_iam');
    }

    return false;
  };
  
  const { isValid, user } = isAuthenticated();
  
  // If not authenticated, redirect to login
  if (!isValid) {
    return <Navigate to="/admin/login" replace />;
  }

  // Check permissions for current path
  const currentPath = location.pathname;
  if (!hasPermission(user, currentPath)) {
    // If user doesn't have permission, show toast and redirect to dashboard
    toast({
      variant: "destructive",
      title: t("admin.accessDenied"),
      description: t("admin.noPermission"),
    });
    
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
