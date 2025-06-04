
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users, UsersRound, UserPlus } from 'lucide-react';
import { useAdminPermissions } from '@/hooks/useAdminPermissions';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/components/ui/use-toast';

const AdminIAM = () => {
  const [stats, setStats] = useState({
    users: 0,
    groups: 0,
    permissions: 0,
  });
  
  const { canManage, isAdmin } = useAdminPermissions();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    // Check if user can manage IAM
    if (!canManage('iam') && !isAdmin) {
      toast({
        variant: "destructive",
        title: t("admin.accessDenied"),
        description: t("admin.iamPermissionRequired"),
      });
      navigate('/admin');
      return;
    }

    // Count users
    const userKeys = Object.keys(localStorage);
    const userCount = userKeys.filter(key => key.includes('@seventechnologies.cloud')).length;
    
    // Count groups
    let groupCount = 0;
    try {
      const groups = JSON.parse(localStorage.getItem('admin_groups') || '[]');
      groupCount = groups.length;
    } catch (e) {
      groupCount = 0;
    }
    
    // Count permissions
    let permissionCount = 0;
    try {
      const permissions = JSON.parse(localStorage.getItem('admin_permissions') || '[]');
      permissionCount = permissions.length;
    } catch (e) {
      permissionCount = 0;
    }
    
    setStats({
      users: userCount,
      groups: groupCount,
      permissions: permissionCount,
    });
  }, [canManage, isAdmin, navigate, toast, t]);

  // Set up default admin user if not exists
  useEffect(() => {
    const adminEmail = 'admin@seventechnologies.cloud';
    if (!localStorage.getItem(adminEmail)) {
      const defaultAdmin = {
        email: adminEmail,
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        permissions: ['manage_candidates', 'manage_jobs', 'manage_companies', 'manage_iam', 'admin'],
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(adminEmail, JSON.stringify(defaultAdmin));
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("admin.iam.title")}</h1>
        <p className="text-muted-foreground">
          {t("admin.iam.description")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link to="/admin/iam/users">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{t("admin.iam.users")}</CardTitle>
              <UserPlus className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.users}</div>
              <p className="text-xs text-muted-foreground">{t("admin.iam.usersDescription")}</p>
              <Button variant="link" size="sm" className="px-0 mt-2">
                {t("admin.iam.manageUsers")} &rarr;
              </Button>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/iam/groups">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{t("admin.iam.groups")}</CardTitle>
              <UsersRound className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.groups}</div>
              <p className="text-xs text-muted-foreground">{t("admin.iam.groupsDescription")}</p>
              <Button variant="link" size="sm" className="px-0 mt-2">
                {t("admin.iam.manageGroups")} &rarr;
              </Button>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/iam/permissions">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{t("admin.iam.permissions")}</CardTitle>
              <Shield className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.permissions}</div>
              <p className="text-xs text-muted-foreground">{t("admin.iam.permissionsDescription")}</p>
              <Button variant="link" size="sm" className="px-0 mt-2">
                {t("admin.iam.managePermissions")} &rarr;
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("admin.iam.configuration")}</CardTitle>
            <CardDescription>
              {t("admin.iam.configurationDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div>
              <h3 className="text-md font-medium mb-2">{t("admin.iam.quickSetup")}</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                {t("admin.iam.quickSetupDescription")}
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Button variant="outline" className="h-auto py-4 justify-start text-left flex flex-col items-start">
                  <span className="font-medium">{t("admin.iam.addAdminUser")}</span>
                  <span className="text-xs text-muted-foreground mt-1">{t("admin.iam.addAdminUserDescription")}</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 justify-start text-left flex flex-col items-start">
                  <span className="font-medium">{t("admin.iam.definePermissionGroup")}</span>
                  <span className="text-xs text-muted-foreground mt-1">{t("admin.iam.definePermissionGroupDescription")}</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 justify-start text-left flex flex-col items-start">
                  <span className="font-medium">{t("admin.iam.securityAudit")}</span>
                  <span className="text-xs text-muted-foreground mt-1">{t("admin.iam.securityAuditDescription")}</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminIAM;
