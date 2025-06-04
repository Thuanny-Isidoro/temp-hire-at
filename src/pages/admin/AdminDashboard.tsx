
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase, Building2, UserCog } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import ProfileEditForm from '@/components/profile/ProfileEditForm';

interface AdminProfile {
  name: string;
  email: string;
  role: string;
  bio: string;
  avatar?: string;
}

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [profileOpen, setProfileOpen] = useState(false);
  
  // Sample admin profile data
  const [adminProfile, setAdminProfile] = useState<AdminProfile>({
    name: "Admin User",
    email: "admin@seventechnologies.cloud",
    role: "System Administrator",
    bio: "Experienced administrator with 5+ years managing enterprise systems and user permissions."
  });

  const [editField, setEditField] = useState<string | null>(null);
  
  // Simulate dashboard stats
  const stats = [
    {
      title: 'Active Candidates',
      value: '1,248',
      change: '+12% from last month',
      icon: <Users className="h-8 w-8 text-blue-500" />,
    },
    {
      title: 'Open Jobs',
      value: '386',
      change: '+4% from last month',
      icon: <Briefcase className="h-8 w-8 text-green-500" />,
    },
    {
      title: 'Companies',
      value: '72',
      change: '+2 new this week',
      icon: <Building2 className="h-8 w-8 text-purple-500" />,
    },
  ];

  const handleProfileSave = (field: string, value: string) => {
    setAdminProfile(prev => ({
      ...prev,
      [field]: value
    }));
    setEditField(null);
    toast({
      title: "Profile Updated",
      description: `Your ${field} has been updated successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your platform statistics and activity.
          </p>
        </div>

        <Sheet open={profileOpen} onOpenChange={setProfileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <UserCog size={16} />
              Edit Profile
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Edit Your Profile</SheetTitle>
              <SheetDescription>
                Make changes to your admin profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Name</h3>
                {editField === 'name' ? (
                  <ProfileEditForm
                    fieldName="Name"
                    initialValue={adminProfile.name}
                    onSave={(value) => handleProfileSave('name', value)}
                    onCancel={() => setEditField(null)}
                    placeholder="Your full name"
                  />
                ) : (
                  <div className="flex justify-between items-center">
                    <p className="text-base">{adminProfile.name}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setEditField('name')}
                      className="h-8 w-8 p-0 rounded-full"
                    >
                      <UserCog className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Email</h3>
                {editField === 'email' ? (
                  <ProfileEditForm
                    fieldName="Email"
                    initialValue={adminProfile.email}
                    onSave={(value) => handleProfileSave('email', value)}
                    onCancel={() => setEditField(null)}
                    placeholder="your.email@example.com"
                  />
                ) : (
                  <div className="flex justify-between items-center">
                    <p className="text-base">{adminProfile.email}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setEditField('email')}
                      className="h-8 w-8 p-0 rounded-full"
                    >
                      <UserCog className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Role</h3>
                {editField === 'role' ? (
                  <ProfileEditForm
                    fieldName="Role"
                    initialValue={adminProfile.role}
                    onSave={(value) => handleProfileSave('role', value)}
                    onCancel={() => setEditField(null)}
                    placeholder="Your role in the organization"
                  />
                ) : (
                  <div className="flex justify-between items-center">
                    <p className="text-base">{adminProfile.role}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setEditField('role')}
                      className="h-8 w-8 p-0 rounded-full"
                    >
                      <UserCog className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Bio</h3>
                {editField === 'bio' ? (
                  <ProfileEditForm
                    fieldName="Bio"
                    initialValue={adminProfile.bio}
                    onSave={(value) => handleProfileSave('bio', value)}
                    onCancel={() => setEditField(null)}
                    isTextarea={true}
                    placeholder="A brief description about yourself"
                  />
                ) : (
                  <div className="flex justify-between items-center">
                    <p className="text-base max-w-[90%]">{adminProfile.bio}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setEditField('bio')}
                      className="h-8 w-8 p-0 rounded-full"
                    >
                      <UserCog className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Platform activity in the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] flex justify-center items-center text-muted-foreground">
              Chart will be displayed here
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Latest Sign-ups</CardTitle>
            <CardDescription>
              Recent candidate registrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({length: 5}).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">User {i + 1}</p>
                    <p className="text-xs text-muted-foreground">user{i+1}@example.com</p>
                  </div>
                  <div className="ml-auto text-xs text-muted-foreground">
                    {i === 0 ? 'Just now' : `${i} hour${i > 1 ? 's' : ''} ago`}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
