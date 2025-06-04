
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, Building2, Shield, UserPlus, UsersRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

const AdminSidebar = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: 'Candidates',
      href: '/admin/candidates',
      icon: Users,
    },
    {
      name: 'Jobs',
      href: '/admin/jobs',
      icon: Briefcase,
    },
    {
      name: 'Companies',
      href: '/admin/companies',
      icon: Building2,
    },
    // IAM Section
    {
      name: 'IAM',
      href: '/admin/iam',
      icon: Shield,
      children: [
        {
          name: 'Users',
          href: '/admin/iam/users',
          icon: UserPlus,
        },
        {
          name: 'Groups',
          href: '/admin/iam/groups',
          icon: UsersRound,
        },
        {
          name: 'Permissions',
          href: '/admin/iam/permissions',
          icon: Shield,
        },
      ],
    },
  ];

  return (
    <div className="w-64 bg-background border-r h-full hidden md:block overflow-y-auto">
      <div className="flex flex-col h-full py-4">
        <div className="px-3 py-2">
          <h2 className="text-lg font-semibold mb-4 px-3">
            Administration
          </h2>
          <nav className="space-y-1 px-2">
            {navigation.map((item) => (
              item.children ? (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground">
                    <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                    {item.name}
                  </div>
                  <div className="pl-8 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className={cn(
                          "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                          isActive(child.href)
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        )}
                      >
                        <child.icon className="mr-3 h-4 w-4" aria-hidden="true" />
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                  {item.name}
                </Link>
              )
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
