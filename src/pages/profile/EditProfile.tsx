
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ProfileData } from "@/types/profile";
import ProfileEditForm from "@/components/profile/ProfileEditForm";
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowLeft, User, Briefcase, MapPin, Phone, Mail, GraduationCap, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [editField, setEditField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load profile data from localStorage
    const getUserData = () => {
      const userKeys = Object.keys(localStorage);
      for (const key of userKeys) {
        if (key.includes('@')) {
          try {
            const userData = JSON.parse(localStorage.getItem(key) || "{}");
            setProfileData(userData);
            return true;
          } catch (err) {
            console.error("Failed to load profile data:", err);
            return false;
          }
        }
      }
      return false;
    };
    
    getUserData();
  }, []);

  const handleProfileSave = (field: string, value: string) => {
    if (!profileData) return;
    
    const updatedProfile = {
      ...profileData,
      [field]: value
    };
    
    // Save to localStorage
    const email = updatedProfile.email || "demo@example.com";
    localStorage.setItem(email, JSON.stringify(updatedProfile));
    
    setProfileData(updatedProfile);
    setEditField(null);
    
    toast({
      title: t("common.success"),
      description: `Your ${field} has been updated successfully.`,
    });
  };

  const handleGoBack = () => {
    navigate('/profile');
  };

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={handleGoBack}
            className="flex items-center gap-2 hover:bg-primary/10"
          >
            <ArrowLeft size={16} />
            Back to Profile
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">Edit Your Profile</h1>
        </div>
        
        <Tabs defaultValue="personal" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex mb-6">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="professional" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Professional Info
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="focus-visible:outline-none focus-visible:ring-0">
            <Card className="border border-gray-200 dark:border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" /> 
                  Personal Information
                </CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* First Name */}
                <div className="space-y-1 border-b border-gray-100 dark:border-gray-800 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium flex items-center gap-1.5">
                        <User className="h-4 w-4 text-muted-foreground" /> First Name
                      </h3>
                      {editField !== 'firstName' && (
                        <p className="text-base mt-1">{profileData.firstName}</p>
                      )}
                    </div>
                    {editField !== 'firstName' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setEditField('firstName')}
                        className="text-primary"
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                  
                  {editField === 'firstName' && (
                    <ProfileEditForm
                      fieldName="First Name"
                      initialValue={profileData.firstName}
                      onSave={(value) => handleProfileSave('firstName', value)}
                      onCancel={() => setEditField(null)}
                      placeholder="Your first name"
                    />
                  )}
                </div>
                
                {/* Last Name */}
                <div className="space-y-1 border-b border-gray-100 dark:border-gray-800 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium flex items-center gap-1.5">
                        <User className="h-4 w-4 text-muted-foreground" /> Last Name
                      </h3>
                      {editField !== 'lastName' && (
                        <p className="text-base mt-1">{profileData.lastName}</p>
                      )}
                    </div>
                    {editField !== 'lastName' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setEditField('lastName')}
                        className="text-primary"
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                  
                  {editField === 'lastName' && (
                    <ProfileEditForm
                      fieldName="Last Name"
                      initialValue={profileData.lastName}
                      onSave={(value) => handleProfileSave('lastName', value)}
                      onCancel={() => setEditField(null)}
                      placeholder="Your last name"
                    />
                  )}
                </div>
                
                {/* Email */}
                <div className="space-y-1 border-b border-gray-100 dark:border-gray-800 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium flex items-center gap-1.5">
                        <Mail className="h-4 w-4 text-muted-foreground" /> Email Address
                      </h3>
                      {editField !== 'email' && (
                        <p className="text-base mt-1">{profileData.email}</p>
                      )}
                    </div>
                    {editField !== 'email' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setEditField('email')}
                        className="text-primary"
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                  
                  {editField === 'email' && (
                    <ProfileEditForm
                      fieldName="Email"
                      initialValue={profileData.email}
                      onSave={(value) => handleProfileSave('email', value)}
                      onCancel={() => setEditField(null)}
                      placeholder="Your email address"
                    />
                  )}
                </div>
                
                {/* Phone */}
                <div className="space-y-1 border-b border-gray-100 dark:border-gray-800 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium flex items-center gap-1.5">
                        <Phone className="h-4 w-4 text-muted-foreground" /> Phone Number
                      </h3>
                      {editField !== 'phone' && (
                        <p className="text-base mt-1">{profileData.phone || "Not provided"}</p>
                      )}
                    </div>
                    {editField !== 'phone' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setEditField('phone')}
                        className="text-primary"
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                  
                  {editField === 'phone' && (
                    <ProfileEditForm
                      fieldName="Phone"
                      initialValue={profileData.phone}
                      onSave={(value) => handleProfileSave('phone', value)}
                      onCancel={() => setEditField(null)}
                      placeholder="Your phone number"
                    />
                  )}
                </div>
                
                {/* Location */}
                <div className="space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-muted-foreground" /> Location
                      </h3>
                      {editField !== 'location' && (
                        <p className="text-base mt-1">{profileData.location || "Not provided"}</p>
                      )}
                    </div>
                    {editField !== 'location' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setEditField('location')}
                        className="text-primary"
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                  
                  {editField === 'location' && (
                    <ProfileEditForm
                      fieldName="Location"
                      initialValue={profileData.location}
                      onSave={(value) => handleProfileSave('location', value)}
                      onCancel={() => setEditField(null)}
                      placeholder="Your location"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="professional" className="focus-visible:outline-none focus-visible:ring-0">
            <Card className="border border-gray-200 dark:border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Professional Information
                </CardTitle>
                <CardDescription>Update your career information and online presence</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Job Title */}
                <div className="space-y-1 border-b border-gray-100 dark:border-gray-800 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4 text-muted-foreground" /> Job Title
                      </h3>
                      {editField !== 'title' && (
                        <p className="text-base mt-1">{profileData.title || "Not provided"}</p>
                      )}
                    </div>
                    {editField !== 'title' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setEditField('title')}
                        className="text-primary"
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                  
                  {editField === 'title' && (
                    <ProfileEditForm
                      fieldName="Job Title"
                      initialValue={profileData.title}
                      onSave={(value) => handleProfileSave('title', value)}
                      onCancel={() => setEditField(null)}
                      placeholder="Your job title"
                    />
                  )}
                </div>
                
                {/* Years of Experience */}
                <div className="space-y-1 border-b border-gray-100 dark:border-gray-800 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium flex items-center gap-1.5">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" /> Years of Experience
                      </h3>
                      {editField !== 'yearsExperience' && (
                        <p className="text-base mt-1">{profileData.yearsExperience || "Not provided"}</p>
                      )}
                    </div>
                    {editField !== 'yearsExperience' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setEditField('yearsExperience')}
                        className="text-primary"
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                  
                  {editField === 'yearsExperience' && (
                    <ProfileEditForm
                      fieldName="Years of Experience"
                      initialValue={profileData.yearsExperience}
                      onSave={(value) => handleProfileSave('yearsExperience', value)}
                      onCancel={() => setEditField(null)}
                      placeholder="Your years of experience"
                    />
                  )}
                </div>
                
                {/* Summary */}
                <div className="space-y-1 border-b border-gray-100 dark:border-gray-800 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="w-full">
                      <h3 className="text-sm font-medium flex items-center gap-1.5">
                        <Award className="h-4 w-4 text-muted-foreground" /> Professional Summary
                      </h3>
                      {editField !== 'summary' ? (
                        <p className="text-base mt-1 max-w-full break-words">
                          {profileData.summary || "No professional summary provided"}
                        </p>
                      ) : null}
                    </div>
                    {editField !== 'summary' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setEditField('summary')}
                        className="text-primary"
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                  
                  {editField === 'summary' && (
                    <ProfileEditForm
                      fieldName="Professional Summary"
                      initialValue={profileData.summary}
                      onSave={(value) => handleProfileSave('summary', value)}
                      onCancel={() => setEditField(null)}
                      placeholder="Your professional summary"
                      isTextarea={true}
                    />
                  )}
                </div>
                
                {/* LinkedIn */}
                <div className="space-y-1 border-b border-gray-100 dark:border-gray-800 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium">LinkedIn</h3>
                      {editField !== 'linkedin' && (
                        <p className="text-base mt-1 break-all">
                          {profileData.linkedin || "Not provided"}
                        </p>
                      )}
                    </div>
                    {editField !== 'linkedin' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setEditField('linkedin')}
                        className="text-primary"
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                  
                  {editField === 'linkedin' && (
                    <ProfileEditForm
                      fieldName="LinkedIn"
                      initialValue={profileData.linkedin}
                      onSave={(value) => handleProfileSave('linkedin', value)}
                      onCancel={() => setEditField(null)}
                      placeholder="Your LinkedIn profile URL"
                    />
                  )}
                </div>
                
                {/* GitHub */}
                <div className="space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium">GitHub</h3>
                      {editField !== 'github' && (
                        <p className="text-base mt-1 break-all">
                          {profileData.github || "Not provided"}
                        </p>
                      )}
                    </div>
                    {editField !== 'github' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setEditField('github')}
                        className="text-primary"
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                  
                  {editField === 'github' && (
                    <ProfileEditForm
                      fieldName="GitHub"
                      initialValue={profileData.github}
                      onSave={(value) => handleProfileSave('github', value)}
                      onCancel={() => setEditField(null)}
                      placeholder="Your GitHub profile URL"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;
