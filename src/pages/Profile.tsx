import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import { scrollToTop } from "@/utils/scroll";
import { User as UserIcon, X } from "lucide-react";
import { ProfileData, Experience, Education, Certification, Skill } from "@/types/profile";

// Import refactored components
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import AboutSection from "@/components/profile/AboutSection";
import SkillsSection from "@/components/profile/SkillsSection";
import ExperienceSection from "@/components/profile/ExperienceSection";
import EducationSection from "@/components/profile/EducationSection";
import CertificationsSection from "@/components/profile/CertificationsSection";

const defaultProfileData: ProfileData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  profilePhoto: "",
  title: "",
  yearsExperience: "",
  summary: "",
  experiences: [],
  educations: [],
  certifications: [],
  skills: [],
  salary: "",
  currency: "USD",
  availability: "",
  remotePreference: "",
  noticePeriod: "",
  portfolio: "",
  linkedin: "",
  github: "",
  additionalInfo: "",
  termsAgreed: false,
  communicationConsent: false
};

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfileData);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  
  // Edit states
  const [editingSummary, setEditingSummary] = useState(false);
  const [addingExperience, setAddingExperience] = useState(false);
  const [editingExperienceIndex, setEditingExperienceIndex] = useState<number | null>(null);
  const [addingEducation, setAddingEducation] = useState(false);
  const [editingEducationIndex, setEditingEducationIndex] = useState<number | null>(null);
  const [addingCertification, setAddingCertification] = useState(false);
  const [editingCertificationIndex, setEditingCertificationIndex] = useState<number | null>(null);
  const [addingSkill, setAddingSkill] = useState(false);
  const [editingSkillIndex, setEditingSkillIndex] = useState<number | null>(null);
  const [editingSocialLinks, setEditingSocialLinks] = useState(false);

  useEffect(() => {
    scrollToTop();
    const getUserData = () => {
      const userKeys = Object.keys(localStorage);
      for (const key of userKeys) {
        if (key.includes('@')) {
          try {
            const userData = JSON.parse(localStorage.getItem(key) || "{}");
            setProfileData((prev) => ({
              ...defaultProfileData,
              ...userData
            }));
            return true;
          } catch (err) {
            setError("Failed to load profile data");
          }
        }
      }
      return false;
    };
    
    const hasUser = getUserData();
    if (!hasUser) {
      // Set demo data if no user found
      setProfileData({
        ...defaultProfileData,
        firstName: "Demo",
        lastName: "User",
        email: "admin@seventechnologies.cloud",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        title: "Full Stack Developer",
        summary: "Experienced full-stack developer with expertise in React, Node.js, and cloud technologies.",
        experiences: [
          {
            company: "Tech Solutions Inc",
            position: "Senior Developer",
            startDate: "2020-01",
            endDate: "Present",
            description: "Leading development of enterprise applications"
          }
        ],
        educations: [
          {
            institution: "Stanford University",
            degree: "Computer Science",
            field: "Master's",
            year: "2015"
          }
        ],
        skills: [
          { name: "React", years: "5" },
          { name: "Node.js", years: "6" },
          { name: "TypeScript", years: "4" }
        ]
      });
    }
  }, []);

  // Save profile data to localStorage
  const handleProfilePhotoChange = (url: string) => {
    saveProfileData({ ...profileData, profilePhoto: url });
    setShowPhotoUpload(false);
    toast({
      title: t("common.success"),
      description: "Profile photo updated successfully",
    });
  };

  const saveProfileData = (newData: ProfileData) => {
    const email = newData.email || "demo@example.com";
    localStorage.setItem(email, JSON.stringify(newData));
    setProfileData(newData);
  };

  const handleSummarySave = (summary: string) => {
    saveProfileData({ ...profileData, summary });
    setEditingSummary(false);
  };

  const handleSocialLinksSave = (links: { linkedin: string; github: string; portfolio: string }) => {
    saveProfileData({ ...profileData, ...links });
    setEditingSocialLinks(false);
  };

  const handleExperienceSave = (experience: Experience) => {
    let updatedExperiences: Experience[];
    
    if (editingExperienceIndex !== null) {
      updatedExperiences = [...profileData.experiences];
      updatedExperiences[editingExperienceIndex] = experience;
      setEditingExperienceIndex(null);
    } else {
      updatedExperiences = [...profileData.experiences, experience];
      setAddingExperience(false);
    }
    
    saveProfileData({ ...profileData, experiences: updatedExperiences });
  };

  const handleEducationSave = (education: Education) => {
    let updatedEducations: Education[];
    
    if (editingEducationIndex !== null) {
      updatedEducations = [...profileData.educations];
      updatedEducations[editingEducationIndex] = education;
      setEditingEducationIndex(null);
    } else {
      updatedEducations = [...profileData.educations, education];
      setAddingEducation(false);
    }
    
    saveProfileData({ ...profileData, educations: updatedEducations });
  };

  const handleCertificationSave = (certification: Certification) => {
    let updatedCertifications: Certification[];
    
    if (editingCertificationIndex !== null) {
      updatedCertifications = [...profileData.certifications];
      updatedCertifications[editingCertificationIndex] = certification;
      setEditingCertificationIndex(null);
    } else {
      updatedCertifications = [...profileData.certifications, certification];
      setAddingCertification(false);
    }
    
    saveProfileData({ ...profileData, certifications: updatedCertifications });
  };

  const handleSkillSave = (skill: Skill) => {
    let updatedSkills: Skill[];
    
    if (editingSkillIndex !== null) {
      updatedSkills = [...profileData.skills];
      updatedSkills[editingSkillIndex] = skill;
      setEditingSkillIndex(null);
    } else {
      updatedSkills = [...profileData.skills, skill];
      setAddingSkill(false);
    }
    
    saveProfileData({ ...profileData, skills: updatedSkills });
  };

  const handleSignOut = () => {
    Object.keys(localStorage).forEach(k => {
      if (k.includes('@')) localStorage.removeItem(k);
    });
    navigate('/');
  };

  const handleDeleteExperience = (index: number) => {
    const updatedExperiences = profileData.experiences.filter((_, i) => i !== index);
    saveProfileData({ ...profileData, experiences: updatedExperiences });
    toast({
      title: t("common.success"),
      description: "Experience deleted successfully",
    });
  };

  const handleDeleteEducation = (index: number) => {
    const updatedEducations = profileData.educations.filter((_, i) => i !== index);
    saveProfileData({ ...profileData, educations: updatedEducations });
    toast({
      title: t("common.success"),
      description: "Education deleted successfully",
    });
  };

  const handleDeleteCertification = (index: number) => {
    const updatedCertifications = profileData.certifications.filter((_, i) => i !== index);
    saveProfileData({ ...profileData, certifications: updatedCertifications });
    toast({
      title: t("common.success"),
      description: "Certification deleted successfully",
    });
  };

  const handleDeleteSkill = (index: number) => {
    const updatedSkills = profileData.skills.filter((_, i) => i !== index);
    saveProfileData({ ...profileData, skills: updatedSkills });
    toast({
      title: t("common.success"),
      description: "Skill deleted successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with profile info */}
          <ProfileSidebar
            profileData={profileData}
            showPhotoUpload={showPhotoUpload}
            setShowPhotoUpload={setShowPhotoUpload}
            editingSocialLinks={editingSocialLinks}
            setEditingSocialLinks={setEditingSocialLinks}
            handleProfilePhotoChange={handleProfilePhotoChange}
            handleSocialLinksSave={handleSocialLinksSave}
            handleSignOut={handleSignOut}
          />

          {/* Main Content */}
          <main className="flex-1">
            <div className="space-y-8">
              {/* About section */}
              <AboutSection
                summary={profileData.summary}
                editingSummary={editingSummary}
                setEditingSummary={setEditingSummary}
                handleSummarySave={handleSummarySave}
              />

              {/* Skills section */}
              <SkillsSection
                skills={profileData.skills}
                addingSkill={addingSkill}
                editingSkillIndex={editingSkillIndex}
                setAddingSkill={setAddingSkill}
                setEditingSkillIndex={setEditingSkillIndex}
                handleSkillSave={handleSkillSave}
              />

              {/* Experience section */}
              <ExperienceSection
                experiences={profileData.experiences}
                addingExperience={addingExperience}
                editingExperienceIndex={editingExperienceIndex}
                setAddingExperience={setAddingExperience}
                setEditingExperienceIndex={setEditingExperienceIndex}
                handleExperienceSave={handleExperienceSave}
                handleDeleteExperience={handleDeleteExperience}
              />

              {/* Education section */}
              <EducationSection
                educations={profileData.educations}
                addingEducation={addingEducation}
                editingEducationIndex={editingEducationIndex}
                setAddingEducation={setAddingEducation}
                setEditingEducationIndex={setEditingEducationIndex}
                handleEducationSave={handleEducationSave}
                handleDeleteEducation={handleDeleteEducation}
              />

              {/* Certifications section */}
              <CertificationsSection
                certifications={profileData.certifications}
                addingCertification={addingCertification}
                editingCertificationIndex={editingCertificationIndex}
                setAddingCertification={setAddingCertification}
                setEditingCertificationIndex={setEditingCertificationIndex}
                handleCertificationSave={handleCertificationSave}
                handleDeleteCertification={handleDeleteCertification}
              />
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
