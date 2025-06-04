
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from '@/hooks/useTranslation';

type PermissionAction = 'view' | 'create' | 'edit' | 'delete' | 'manage';

interface UseAdminPermissionsReturn {
  hasPermission: (scope: string, action?: PermissionAction) => boolean;
  canAccess: (scope: string) => boolean;
  canCreate: (scope: string) => boolean;
  canEdit: (scope: string) => boolean;
  canDelete: (scope: string) => boolean;
  canManage: (scope: string) => boolean;
  isAdmin: boolean;
  isMasterAdmin: boolean;
  currentUser: any;
}

export const useAdminPermissions = (): UseAdminPermissionsReturn => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    // Get current user from localStorage
    const userKeys = Object.keys(localStorage);
    const userEmail = userKeys.find((key) => key.includes('@seventechnologies.cloud'));
    
    if (userEmail) {
      try {
        const userData = JSON.parse(localStorage.getItem(userEmail) || '{}');
        setCurrentUser({ email: userEmail, ...userData });
      } catch (e) {
        setCurrentUser({ email: userEmail });
      }
    }
  }, []);

  const isMasterAdmin = currentUser?.email === 'admin@seventechnologies.cloud';
  const isAdmin = isMasterAdmin || currentUser?.role === 'admin';
  
  // Check if user has specific permission
  const hasPermission = (scope: string, action?: PermissionAction): boolean => {
    if (!currentUser) return false;
    
    // Master admin has all permissions
    if (isMasterAdmin) return true;
    
    // Users with admin role have all permissions
    if (currentUser.role === 'admin') return true;
    
    // Check specific permissions
    const userPermissions = currentUser.permissions || [];
    
    // Direct permission check (e.g., 'manage_candidates')
    if (userPermissions.includes(`${action}_${scope}`)) return true;
    
    // General scope permission (e.g., 'manage_candidates' allows all actions on candidates)
    if (userPermissions.includes(`manage_${scope}`)) return true;
    
    // Admin permission allows all actions
    if (userPermissions.includes('admin')) return true;
    
    return false;
  };
  
  // Helper functions for common permission checks
  const canAccess = (scope: string): boolean => {
    return hasPermission(scope, 'view');
  };
  
  const canCreate = (scope: string): boolean => {
    return hasPermission(scope, 'create') || hasPermission(scope, 'manage');
  };
  
  const canEdit = (scope: string): boolean => {
    return hasPermission(scope, 'edit') || hasPermission(scope, 'manage');
  };
  
  const canDelete = (scope: string): boolean => {
    return hasPermission(scope, 'delete') || hasPermission(scope, 'manage');
  };
  
  const canManage = (scope: string): boolean => {
    return hasPermission(scope, 'manage');
  };
  
  return {
    hasPermission,
    canAccess,
    canCreate,
    canEdit,
    canDelete,
    canManage,
    isAdmin,
    isMasterAdmin,
    currentUser
  };
};
