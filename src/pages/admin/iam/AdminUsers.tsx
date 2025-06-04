
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Edit, Trash2, UserPlus, Shield } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAdminPermissions } from '@/hooks/useAdminPermissions';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

// Define schema for user form
const userFormSchema = z.object({
  email: z.string().email("Invalid email address").refine(email => email.endsWith('@seventechnologies.cloud'), {
    message: "Only @seventechnologies.cloud emails are allowed"
  }),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  role: z.enum(["admin", "manager", "user"]),
  permissions: z.array(z.string()),
});

type UserFormValues = z.infer<typeof userFormSchema>;

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast: uiToast } = useToast();
  const { t } = useTranslation();
  const { canManage, canEdit, canDelete, canCreate, isAdmin, currentUser } = useAdminPermissions();
  const navigate = useNavigate();
  
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      role: 'user',
      permissions: [],
    },
  });

  // Check if user has permissions to manage IAM users
  useEffect(() => {
    if (!canManage('iam') && !isAdmin) {
      uiToast({
        variant: "destructive",
        title: t("admin.accessDenied"),
        description: t("admin.iamPermissionRequired"),
      });
      navigate('/admin');
    }
  }, [canManage, isAdmin, navigate, uiToast, t]);

  // List of available permissions
  const availablePermissions = [
    { id: 'manage_candidates', label: t("admin.permissions.manageCandidates") },
    { id: 'manage_jobs', label: t("admin.permissions.manageJobs") },
    { id: 'manage_companies', label: t("admin.permissions.manageCompanies") },
    { id: 'manage_iam', label: t("admin.permissions.manageIAM") },
    { id: 'admin', label: t("admin.permissions.fullAccess") },
  ];

  // Load users from localStorage on mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const userKeys = Object.keys(localStorage);
    const adminUsers = userKeys.filter(key => key.includes('@seventechnologies.cloud')).map(email => {
      try {
        const userData = JSON.parse(localStorage.getItem(email) || '{}');
        return { email, ...userData };
      } catch (e) {
        return { email, firstName: email.split('@')[0], lastName: '', role: 'user', permissions: [] };
      }
    });
    
    // Sort users with admin first
    adminUsers.sort((a, b) => {
      if (a.email === 'admin@seventechnologies.cloud') return -1;
      if (b.email === 'admin@seventechnologies.cloud') return 1;
      if (a.role === 'admin' && b.role !== 'admin') return -1;
      if (a.role !== 'admin' && b.role === 'admin') return 1;
      return a.email.localeCompare(b.email);
    });
    
    setUsers(adminUsers);
  };

  const handleAddUser = (data: UserFormValues) => {
    // Check permission
    if (!canCreate('users')) {
      uiToast({
        variant: "destructive",
        title: t("admin.accessDenied"),
        description: t("admin.createPermissionRequired"),
      });
      return;
    }

    const newUser = {
      ...data,
      createdAt: new Date().toISOString(),
    };
    
    localStorage.setItem(data.email, JSON.stringify(newUser));
    
    toast.success(t("admin.users.addSuccess"));
    loadUsers();
    setIsDialogOpen(false);
    form.reset();
  };

  const handleUpdateUser = (data: UserFormValues) => {
    if (!editingUser) return;

    // Check permission - Users can edit themselves, or with proper permissions
    const isSelfEdit = currentUser?.email === editingUser.email;
    if (!isSelfEdit && !canEdit('users')) {
      uiToast({
        variant: "destructive",
        title: t("admin.accessDenied"),
        description: t("admin.editPermissionRequired"),
      });
      return;
    }
    
    // Prevent non-admins from changing admin permissions
    if (!isAdmin && 
        (data.role === 'admin' || data.permissions?.includes('admin') || data.permissions?.includes('manage_iam'))) {
      uiToast({
        variant: "destructive",
        title: t("admin.accessDenied"),
        description: t("admin.cannotAssignAdminPermissions"),
      });
      return;
    }
    
    const updatedUser = {
      ...editingUser,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    localStorage.setItem(data.email, JSON.stringify(updatedUser));
    
    toast.success(t("admin.users.updateSuccess"));
    loadUsers();
    setIsDialogOpen(false);
    setEditingUser(null);
    form.reset();
  };

  const handleDeleteUser = (email: string) => {
    // Check permission
    if (!canDelete('users')) {
      uiToast({
        variant: "destructive",
        title: t("admin.accessDenied"),
        description: t("admin.deletePermissionRequired"),
      });
      return;
    }
    
    if (email === 'admin@seventechnologies.cloud') {
      uiToast({
        variant: "destructive",
        title: t("admin.cannotDeleteMasterAdmin.title"),
        description: t("admin.cannotDeleteMasterAdmin.description"),
      });
      return;
    }
    
    // Prevent self-deletion
    if (email === currentUser?.email) {
      uiToast({
        variant: "destructive",
        title: t("admin.error"),
        description: t("admin.cannotDeleteSelf"),
      });
      return;
    }
    
    if (confirm(t("admin.confirmDelete"))) {
      localStorage.removeItem(email);
      toast.success(t("admin.users.deleteSuccess"));
      loadUsers();
    }
  };

  const openEditDialog = (user: any) => {
    // Check permission - Users can edit themselves, or with proper permissions
    const isSelfEdit = currentUser?.email === user.email;
    if (!isSelfEdit && !canEdit('users')) {
      uiToast({
        variant: "destructive", 
        title: t("admin.accessDenied"),
        description: t("admin.editPermissionRequired"),
      });
      return;
    }
    
    setEditingUser(user);
    form.reset({
      email: user.email,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      role: user.role || 'user',
      permissions: user.permissions || [],
    });
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    if (!canCreate('users')) {
      uiToast({
        variant: "destructive",
        title: t("admin.accessDenied"),
        description: t("admin.createPermissionRequired"),
      });
      return;
    }
    
    setEditingUser(null);
    form.reset({
      email: '',
      firstName: '',
      lastName: '',
      role: 'user',
      permissions: [],
    });
    setIsDialogOpen(true);
  };

  const onSubmit = (data: UserFormValues) => {
    if (editingUser) {
      handleUpdateUser(data);
    } else {
      handleAddUser(data);
    }
  };

  // Check if the current user can edit permissions for another user
  const canEditPermissions = (userToEdit: any) => {
    // Master admin can edit anyone except themselves (to prevent lockout)
    if (currentUser?.email === 'admin@seventechnologies.cloud') {
      return true;
    }
    
    // Admins can edit non-admin users
    if (isAdmin && userToEdit.role !== 'admin') {
      return true;
    }
    
    // Users with manage_iam can edit users with lesser permissions
    if (canManage('iam') && !userToEdit.permissions?.includes('manage_iam') && !userToEdit.permissions?.includes('admin')) {
      return true;
    }
    
    return false;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("admin.iam.users")}</h1>
          <p className="text-muted-foreground">
            {t("admin.iam.usersDescription")}
          </p>
        </div>
        {(canCreate('users') || isAdmin) && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog} className="flex items-center gap-2">
                <UserPlus size={16} />
                {t("admin.users.addUser")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{editingUser ? t("admin.users.editUser") : t("admin.users.addUser")}</DialogTitle>
                <DialogDescription>
                  {editingUser 
                    ? t("admin.users.editUserDescription") 
                    : t("admin.users.addUserDescription")
                  }
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("admin.users.email")}</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="user@seventechnologies.cloud" 
                            disabled={!!editingUser}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("admin.users.firstName")}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder={t("admin.users.firstNamePlaceholder")} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("admin.users.lastName")}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder={t("admin.users.lastNamePlaceholder")} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("admin.users.role")}</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          disabled={editingUser?.email === 'admin@seventechnologies.cloud' || 
                                   (!isAdmin && field.value === 'admin')}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t("admin.users.selectRole")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="admin">{t("admin.roles.administrator")}</SelectItem>
                            <SelectItem value="manager">{t("admin.roles.manager")}</SelectItem>
                            <SelectItem value="user">{t("admin.roles.user")}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="permissions"
                    render={() => (
                      <FormItem>
                        <FormLabel>{t("admin.users.permissions")}</FormLabel>
                        <div className="space-y-2">
                          {availablePermissions.map((permission) => (
                            <FormField
                              key={permission.id}
                              control={form.control}
                              name="permissions"
                              render={({ field }) => {
                                const isAdminPermission = permission.id === 'admin' || permission.id === 'manage_iam';
                                const disableCheckbox = 
                                  (editingUser?.email === 'admin@seventechnologies.cloud') || 
                                  (isAdminPermission && !isAdmin);
                                
                                return (
                                  <FormItem
                                    key={permission.id}
                                    className="flex flex-row items-center space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(permission.id)}
                                        onCheckedChange={(checked) => {
                                          const newValues = checked
                                            ? [...field.value, permission.id]
                                            : field.value.filter(
                                                (value) => value !== permission.id
                                              );
                                          field.onChange(newValues);
                                        }}
                                        disabled={disableCheckbox}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal cursor-pointer">
                                      {permission.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">{t("admin.cancel")}</Button>
                    </DialogClose>
                    <Button type="submit">{editingUser ? t("admin.update") : t("admin.add")}</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("admin.users.email")}</TableHead>
              <TableHead>{t("admin.users.name")}</TableHead>
              <TableHead>{t("admin.users.role")}</TableHead>
              <TableHead>{t("admin.users.permissions")}</TableHead>
              <TableHead className="text-right">{t("admin.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  {t("admin.users.noUsersFound")}
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.email} className={user.email === 'admin@seventechnologies.cloud' ? 'bg-primary/5' : ''}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>{`${user.firstName || ''} ${user.lastName || ''}`}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'default' : user.role === 'manager' ? 'secondary' : 'outline'}>
                      {user.role ? t(`admin.roles.${user.role}`) : t("admin.roles.user")}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <div className="flex flex-wrap gap-1">
                      {user.email === 'admin@seventechnologies.cloud' ? (
                        <Badge variant="default" className="bg-primary">{t("admin.permissions.fullAccess")}</Badge>
                      ) : (
                        (user.permissions || []).map((permission: string) => (
                          <Badge key={permission} variant="outline">{permission}</Badge>
                        ))
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(user)}
                        title={t("admin.users.editUser")}
                        disabled={!canEditPermissions(user) && currentUser?.email !== user.email}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteUser(user.email)}
                        title={t("admin.users.deleteUser")}
                        disabled={user.email === 'admin@seventechnologies.cloud' || 
                                  user.email === currentUser?.email ||
                                  !canDelete('users')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUsers;
