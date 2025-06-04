
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Edit, Trash2, Shield } from 'lucide-react';

// Define schema for permission form
const permissionFormSchema = z.object({
  id: z.string().min(2, "ID is required"),
  name: z.string().min(2, "Name is required"),
  description: z.string(),
  scope: z.string().min(1, "Scope is required"),
});

type PermissionFormValues = z.infer<typeof permissionFormSchema>;

const AdminPermissions = () => {
  const [permissions, setPermissions] = useState<any[]>([]);
  const [editingPermission, setEditingPermission] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const form = useForm<PermissionFormValues>({
    resolver: zodResolver(permissionFormSchema),
    defaultValues: {
      id: '',
      name: '',
      description: '',
      scope: '',
    },
  });

  // Load permissions from localStorage on mount
  useEffect(() => {
    loadPermissions();
  }, []);

  const loadPermissions = () => {
    const storedPermissions = localStorage.getItem('admin_permissions');
    if (storedPermissions) {
      try {
        setPermissions(JSON.parse(storedPermissions));
      } catch (e) {
        setPermissions([]);
      }
    } else {
      // Create default permissions if none exist
      const defaultPermissions = [
        {
          id: 'manage_candidates',
          name: 'Manage Candidates',
          description: 'Create, view, edit and delete candidate profiles',
          scope: 'candidates',
        },
        {
          id: 'manage_jobs',
          name: 'Manage Jobs',
          description: 'Create, view, edit and delete job listings',
          scope: 'jobs',
        },
        {
          id: 'manage_companies',
          name: 'Manage Companies',
          description: 'Create, view, edit and delete company profiles',
          scope: 'companies',
        },
        {
          id: 'manage_iam',
          name: 'Manage IAM',
          description: 'Manage users, groups and permissions',
          scope: 'iam',
        },
        {
          id: 'admin',
          name: 'Full Admin Access',
          description: 'Full administrative access to all platform features',
          scope: 'system',
        }
      ];
      setPermissions(defaultPermissions);
      localStorage.setItem('admin_permissions', JSON.stringify(defaultPermissions));
    }
  };

  const handleAddPermission = (data: PermissionFormValues) => {
    // Check if ID already exists
    if (permissions.some(permission => permission.id === data.id)) {
      form.setError('id', { 
        type: 'manual',
        message: 'This ID is already in use'
      });
      return;
    }
    
    const newPermission = {
      ...data,
      createdAt: new Date().toISOString(),
    };
    
    const updatedPermissions = [...permissions, newPermission];
    localStorage.setItem('admin_permissions', JSON.stringify(updatedPermissions));
    setPermissions(updatedPermissions);
    
    toast.success('Permission added successfully');
    setIsDialogOpen(false);
    form.reset();
  };

  const handleUpdatePermission = (data: PermissionFormValues) => {
    if (!editingPermission) return;
    
    // Check if ID already exists and is not the current permission
    if (data.id !== editingPermission.id && permissions.some(permission => permission.id === data.id)) {
      form.setError('id', { 
        type: 'manual',
        message: 'This ID is already in use'
      });
      return;
    }
    
    const updatedPermission = {
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    const updatedPermissions = permissions.map(permission => 
      permission.id === editingPermission.id ? updatedPermission : permission
    );
    
    localStorage.setItem('admin_permissions', JSON.stringify(updatedPermissions));
    setPermissions(updatedPermissions);
    
    toast.success('Permission updated successfully');
    setIsDialogOpen(false);
    setEditingPermission(null);
    form.reset();
  };

  const handleDeletePermission = (id: string) => {
    // Don't allow deletion of core permissions
    if (['manage_candidates', 'manage_jobs', 'manage_companies', 'manage_iam', 'admin'].includes(id)) {
      toast.error('Cannot delete core permissions');
      return;
    }
    
    if (confirm('Are you sure you want to delete this permission?')) {
      const updatedPermissions = permissions.filter(permission => permission.id !== id);
      localStorage.setItem('admin_permissions', JSON.stringify(updatedPermissions));
      setPermissions(updatedPermissions);
      toast.success('Permission deleted successfully');
    }
  };

  const openEditDialog = (permission: any) => {
    setEditingPermission(permission);
    form.reset({
      id: permission.id,
      name: permission.name,
      description: permission.description || '',
      scope: permission.scope || '',
    });
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingPermission(null);
    form.reset({
      id: '',
      name: '',
      description: '',
      scope: '',
    });
    setIsDialogOpen(true);
  };

  const onSubmit = (data: PermissionFormValues) => {
    if (editingPermission) {
      handleUpdatePermission(data);
    } else {
      handleAddPermission(data);
    }
  };

  // Function to determine if a permission is a core permission
  const isCorePermission = (id: string) => {
    return ['manage_candidates', 'manage_jobs', 'manage_companies', 'manage_iam', 'admin'].includes(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Permissions</h1>
          <p className="text-muted-foreground">
            Configure available permissions for the admin panel
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} className="flex items-center gap-2">
              <Shield size={16} />
              Add Permission
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingPermission ? 'Edit Permission' : 'Add Permission'}</DialogTitle>
              <DialogDescription>
                {editingPermission 
                  ? 'Edit permission details' 
                  : 'Add a new permission to the platform'
                }
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Permission ID</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="permission_id" 
                          disabled={editingPermission && isCorePermission(editingPermission.id)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Permission Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Permission name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Describe what this permission allows" 
                          className="min-h-[80px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="scope"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Scope</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="e.g., candidates, jobs, system" 
                          disabled={editingPermission && isCorePermission(editingPermission.id)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">{editingPermission ? 'Update Permission' : 'Add Permission'}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Scope</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No permissions found
                </TableCell>
              </TableRow>
            ) : (
              permissions.map((permission) => (
                <TableRow key={permission.id} className={isCorePermission(permission.id) ? 'bg-primary/5' : ''}>
                  <TableCell className="font-medium">{permission.id}</TableCell>
                  <TableCell>{permission.name}</TableCell>
                  <TableCell className="max-w-[300px]">{permission.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{permission.scope}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(permission)}
                        title="Edit permission"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeletePermission(permission.id)}
                        title="Delete permission"
                        disabled={isCorePermission(permission.id)}
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

export default AdminPermissions;
