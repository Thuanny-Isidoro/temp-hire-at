
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
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Edit, Trash2, UsersRound } from 'lucide-react';

// Define schema for group form
const groupFormSchema = z.object({
  id: z.string().min(2, "ID is required"),
  name: z.string().min(2, "Name is required"),
  description: z.string(),
  permissions: z.array(z.string()),
});

type GroupFormValues = z.infer<typeof groupFormSchema>;

const AdminGroups = () => {
  const [groups, setGroups] = useState<any[]>([]);
  const [editingGroup, setEditingGroup] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const form = useForm<GroupFormValues>({
    resolver: zodResolver(groupFormSchema),
    defaultValues: {
      id: '',
      name: '',
      description: '',
      permissions: [],
    },
  });

  // List of available permissions
  const availablePermissions = [
    { id: 'manage_candidates', label: 'Manage Candidates' },
    { id: 'manage_jobs', label: 'Manage Jobs' },
    { id: 'manage_companies', label: 'Manage Companies' },
    { id: 'manage_iam', label: 'Manage IAM' },
    { id: 'admin', label: 'Full Admin Access' },
  ];

  // Load groups from localStorage on mount
  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = () => {
    const storedGroups = localStorage.getItem('admin_groups');
    if (storedGroups) {
      try {
        setGroups(JSON.parse(storedGroups));
      } catch (e) {
        setGroups([]);
      }
    } else {
      // Create default groups if none exist
      const defaultGroups = [
        {
          id: 'administrators',
          name: 'Administrators',
          description: 'Full access to all features',
          permissions: ['admin', 'manage_candidates', 'manage_jobs', 'manage_companies', 'manage_iam'],
        },
        {
          id: 'recruiters',
          name: 'Recruiters',
          description: 'Manage candidates and jobs',
          permissions: ['manage_candidates', 'manage_jobs'],
        },
        {
          id: 'analysts',
          name: 'Analysts',
          description: 'View-only access to data',
          permissions: [],
        }
      ];
      setGroups(defaultGroups);
      localStorage.setItem('admin_groups', JSON.stringify(defaultGroups));
    }
  };

  const handleAddGroup = (data: GroupFormValues) => {
    // Check if ID already exists
    if (groups.some(group => group.id === data.id)) {
      form.setError('id', { 
        type: 'manual',
        message: 'This ID is already in use'
      });
      return;
    }
    
    const newGroup = {
      ...data,
      createdAt: new Date().toISOString(),
    };
    
    const updatedGroups = [...groups, newGroup];
    localStorage.setItem('admin_groups', JSON.stringify(updatedGroups));
    setGroups(updatedGroups);
    
    toast.success('Group added successfully');
    setIsDialogOpen(false);
    form.reset();
  };

  const handleUpdateGroup = (data: GroupFormValues) => {
    if (!editingGroup) return;
    
    // Check if ID already exists and is not the current group
    if (data.id !== editingGroup.id && groups.some(group => group.id === data.id)) {
      form.setError('id', { 
        type: 'manual',
        message: 'This ID is already in use'
      });
      return;
    }
    
    const updatedGroup = {
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    const updatedGroups = groups.map(group => 
      group.id === editingGroup.id ? updatedGroup : group
    );
    
    localStorage.setItem('admin_groups', JSON.stringify(updatedGroups));
    setGroups(updatedGroups);
    
    toast.success('Group updated successfully');
    setIsDialogOpen(false);
    setEditingGroup(null);
    form.reset();
  };

  const handleDeleteGroup = (id: string) => {
    if (confirm('Are you sure you want to delete this group?')) {
      const updatedGroups = groups.filter(group => group.id !== id);
      localStorage.setItem('admin_groups', JSON.stringify(updatedGroups));
      setGroups(updatedGroups);
      toast.success('Group deleted successfully');
    }
  };

  const openEditDialog = (group: any) => {
    setEditingGroup(group);
    form.reset({
      id: group.id,
      name: group.name,
      description: group.description || '',
      permissions: group.permissions || [],
    });
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingGroup(null);
    form.reset({
      id: '',
      name: '',
      description: '',
      permissions: [],
    });
    setIsDialogOpen(true);
  };

  const onSubmit = (data: GroupFormValues) => {
    if (editingGroup) {
      handleUpdateGroup(data);
    } else {
      handleAddGroup(data);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Groups</h1>
          <p className="text-muted-foreground">
            Manage permission groups for admin users
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} className="flex items-center gap-2">
              <UsersRound size={16} />
              Add Group
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingGroup ? 'Edit Group' : 'Add Group'}</DialogTitle>
              <DialogDescription>
                {editingGroup 
                  ? 'Edit group details and permissions' 
                  : 'Add a new permission group to the platform'
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
                      <FormLabel>Group ID</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="group-id" />
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
                      <FormLabel>Group Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Group name" />
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
                        <Input {...field} placeholder="Group description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="permissions"
                  render={() => (
                    <FormItem>
                      <FormLabel>Permissions</FormLabel>
                      <div className="space-y-2">
                        {availablePermissions.map((permission) => (
                          <FormField
                            key={permission.id}
                            control={form.control}
                            name="permissions"
                            render={({ field }) => {
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
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">{editingGroup ? 'Update Group' : 'Add Group'}</Button>
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
              <TableHead>Permissions</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No groups found
                </TableCell>
              </TableRow>
            ) : (
              groups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell className="font-medium">{group.id}</TableCell>
                  <TableCell>{group.name}</TableCell>
                  <TableCell className="max-w-[300px]">{group.description}</TableCell>
                  <TableCell className="max-w-[200px]">
                    <div className="flex flex-wrap gap-1">
                      {(group.permissions || []).map((permission: string) => (
                        <Badge key={permission} variant="outline">{permission}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(group)}
                        title="Edit group"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteGroup(group.id)}
                        title="Delete group"
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

export default AdminGroups;
