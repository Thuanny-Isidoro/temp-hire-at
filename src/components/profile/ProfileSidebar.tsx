
import React from "react";
import { Link } from "react-router-dom";
import { User, PenSquare, LogOut, Briefcase, FileText, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ProfileData } from "@/types/profile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

interface ProfileSidebarProps {
  profileData: ProfileData;
  showPhotoUpload: boolean;
  setShowPhotoUpload: (show: boolean) => void;
  editingSocialLinks: boolean;
  setEditingSocialLinks: (editing: boolean) => void;
  handleProfilePhotoChange: (url: string) => void;
  handleSocialLinksSave: (links: { linkedin: string; github: string; portfolio: string }) => void;
  handleSignOut: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  profileData,
  showPhotoUpload,
  setShowPhotoUpload,
  editingSocialLinks,
  setEditingSocialLinks,
  handleProfilePhotoChange,
  handleSocialLinksSave,
  handleSignOut,
}) => {
  const { firstName, lastName, email, title, location, profilePhoto, linkedin, github, portfolio } = profileData;

  // Setup form for social links
  const form = useForm({
    defaultValues: {
      linkedin: linkedin || "",
      github: github || "",
      portfolio: portfolio || "",
    },
  });

  const onSocialLinksSave = (data: { linkedin: string; github: string; portfolio: string }) => {
    handleSocialLinksSave(data);
  };

  return (
    <aside className="w-full md:w-64 md:mr-8">
      <Card className="mb-4 border border-gray-200 dark:border-gray-700 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <Avatar className="h-24 w-24 border-2 border-primary/20 ring-2 ring-primary/10">
                {profilePhoto ? (
                  <AvatarImage src={profilePhoto} alt={`${firstName} ${lastName}`} />
                ) : (
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {firstName && lastName 
                      ? `${firstName.charAt(0)}${lastName.charAt(0)}`
                      : <User className="h-10 w-10" />
                    }
                  </AvatarFallback>
                )}
              </Avatar>
              <Button
                variant="outline"
                size="icon"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-background shadow-md hover:bg-primary hover:text-white transition-colors"
                onClick={() => setShowPhotoUpload(!showPhotoUpload)}
              >
                <PenSquare className="h-4 w-4" />
              </Button>
            </div>

            <h2 className="text-xl font-bold">{firstName} {lastName}</h2>
            {title && <p className="text-muted-foreground mt-1">{title}</p>}
            {location && (
              <p className="text-sm text-muted-foreground mt-2">{location}</p>
            )}
            <p className="text-sm text-muted-foreground mt-1">{email}</p>

            <div className="w-full mt-6 space-y-2">
              {/* Social links section */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full gap-2">
                    <Settings className="h-4 w-4" />
                    Social Links
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <h3 className="text-lg font-semibold mb-4">Edit Social Links</h3>
                  <form onSubmit={form.handleSubmit(onSocialLinksSave)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/username" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="github"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://github.com/username" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="portfolio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Portfolio URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourportfolio.com" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full mt-4">Save Changes</Button>
                  </form>
                </SheetContent>
              </Sheet>

              <Link to="/profile/edit">
                <Button variant="outline" className="w-full">
                  <PenSquare className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </Link>

              <Link to="/profile/applied-jobs">
                <Button variant="outline" className="w-full">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Applied Jobs
                </Button>
              </Link>

              <Link to="/profile/saved-jobs">
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Saved Jobs
                </Button>
              </Link>

              <Button variant="outline" onClick={handleSignOut} className="w-full text-destructive hover:text-destructive-foreground hover:bg-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};

export default ProfileSidebar;
