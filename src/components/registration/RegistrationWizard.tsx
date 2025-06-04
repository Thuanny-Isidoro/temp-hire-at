
import React, { useState } from "react";
import { Card } from "../ui/card";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import PersonalDetails from "./steps/PersonalDetails";
import ProfessionalDetails from "./steps/ProfessionalDetails";
import SkillsCompensation from "./steps/SkillsCompensation";
import AdditionalInfo from "./steps/AdditionalInfo";
import { useTranslation } from "@/hooks/useTranslation";

type Step = "personal" | "professional" | "skills" | "additional";

export interface RegistrationData {
  // Personal details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  profilePhoto: string;
  
  // Professional details
  title: string;
  yearsExperience: string;
  summary: string;
  experiences: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  educations: Array<{
    institution: string;
    degree: string;
    field: string;
    year: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    year: string;
    expiry?: string;
  }>;
  
  // Skills & compensation
  skills: Array<{
    name: string;
    years: string;
  }>;
  salary: string;
  currency: string;
  availability: string;
  remotePreference: string;
  noticePeriod: string;
  
  // Additional info
  portfolio: string;
  linkedin: string;
  github: string;
  additionalInfo: string;
  termsAgreed: boolean;
  communicationConsent: boolean;
}

export const RegistrationWizard = () => {
  const [currentStep, setCurrentStep] = useState<Step>("personal");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  // Form data storage
  const [formData, setFormData] = useState<RegistrationData>({
    // Personal details
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    profilePhoto: "",
    
    // Professional details
    title: "",
    yearsExperience: "",
    summary: "",
    experiences: [],
    educations: [],
    certifications: [],
    
    // Skills & compensation
    skills: [],
    salary: "",
    currency: "USD",
    availability: "",
    remotePreference: "",
    noticePeriod: "",
    
    // Additional info
    portfolio: "",
    linkedin: "",
    github: "",
    additionalInfo: "",
    termsAgreed: false,
    communicationConsent: false,
  });

  const updateFormData = (data: Partial<RegistrationData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNextStep = () => {
    if (currentStep === "personal") setCurrentStep("professional");
    else if (currentStep === "professional") setCurrentStep("skills");
    else if (currentStep === "skills") setCurrentStep("additional");
  };

  const handlePreviousStep = () => {
    if (currentStep === "professional") setCurrentStep("personal");
    else if (currentStep === "skills") setCurrentStep("professional");
    else if (currentStep === "additional") setCurrentStep("skills");
  };

  const handleSSOSignUp = (provider: string) => {
    setIsLoading(true);
    
    // Simulate SSO authentication
    setTimeout(() => {
      toast({
        title: "SSO Authentication",
        description: `Creating account with ${provider}...`,
      });
      setIsLoading(false);
      navigate('/profile');
    }, 1500);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      toast({
        title: t("auth.accountCreated"),
        description: "Your profile has been created successfully!",
      });
      setIsLoading(false);
      navigate('/profile');
    }, 1500);
  };

  // Rendering the appropriate step component
  const renderStepContent = () => {
    switch (currentStep) {
      case "personal":
        return (
          <PersonalDetails 
            formData={formData} 
            updateFormData={updateFormData}
            onNextStep={handleNextStep}
            isLoading={isLoading}
            onSSOSignUp={handleSSOSignUp}
          />
        );
      case "professional":
        return (
          <ProfessionalDetails 
            data={formData} 
            updateData={updateFormData}
            onNextStep={handleNextStep}
            onPreviousStep={handlePreviousStep}
          />
        );
      case "skills":
        return (
          <SkillsCompensation 
            data={formData} 
            updateData={updateFormData}
            onNextStep={handleNextStep}
            onPreviousStep={handlePreviousStep}
          />
        );
      case "additional":
        return (
          <AdditionalInfo 
            data={formData} 
            updateData={updateFormData}
            onPreviousStep={handlePreviousStep}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  // Progress indicators
  const steps: Step[] = ["personal", "professional", "skills", "additional"];
  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <Card className="w-full">
      <div className="p-1">
        {/* Progress indicator */}
        <div className="mb-6 px-6 pt-6">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === currentStep 
                      ? "bg-primary text-primary-foreground" 
                      : index < steps.indexOf(currentStep) 
                        ? "bg-primary/80 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-xs mt-1 hidden sm:block">
                  {step.charAt(0).toUpperCase() + step.slice(1)}
                </span>
              </div>
            ))}
          </div>
          <div className="relative flex h-1 bg-muted mt-2 sm:mt-5">
            <div 
              className="absolute h-full bg-primary transition-all duration-300"
              style={{ 
                width: `${((currentStepIndex + 1) / steps.length) * 100}%` 
              }}
            />
          </div>
        </div>
        
        {/* Step content */}
        {renderStepContent()}
      </div>
    </Card>
  );
};
