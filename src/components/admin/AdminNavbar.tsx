
import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import AdminSidebar from './AdminSidebar';
import { toast } from 'sonner';

const AdminNavbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Don't remove the main admin user during sign out
    const keysToRemove = Object.keys(localStorage).filter(k => 
      k.includes('@') && k !== 'admin@seventechnologies.cloud'
    );
    
    keysToRemove.forEach(k => localStorage.removeItem(k));
    
    toast.success('Signed out successfully');
    navigate('/admin/login');
  };

  const getCurrentUser = () => {
    const userKeys = Object.keys(localStorage);
    const userEmail = userKeys.find((key) => key.includes('@') && key.endsWith('@seventechnologies.cloud'));
    
    if (userEmail) {
      try {
        const userData = JSON.parse(localStorage.getItem(userEmail) || '{}');
        return {
          email: userEmail,
          name: userData.firstName && userData.lastName ? 
            `${userData.firstName} ${userData.lastName}` : 
            userEmail.split('@')[0],
          role: userData.role || 'user'
        };
      } catch (e) {
        return { 
          email: userEmail, 
          name: userEmail.split('@')[0],
          role: 'user'
        };
      }
    }
    
    // Default to Admin user
    return { 
      email: 'admin@seventechnologies.cloud', 
      name: 'Admin User',
      role: 'admin'
    };
  };

  const user = getCurrentUser();

  return (
    <header className="sticky top-0 z-40 bg-background border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <AdminSidebar />
            </SheetContent>
          </Sheet>

          <Link to="/admin" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-primary">Admin</span>
          </Link>
        </div>

        {/* User dropdown */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden md:inline">{user.name}</span>
                {user.role === 'admin' && (
                  <span className="hidden md:inline text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                    Admin
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/">Visit Site</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/admin/iam/users">Manage Users</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                {t("auth.signOut")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
