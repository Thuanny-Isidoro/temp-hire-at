
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";

// Define the steps
type Step = "personal" | "professional" | "skills" | "additional";

// Define schemas for each step
const personalDetailsSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  location: z.string().min(1, { message: "Location is required" }),
  profilePhoto: z.string().optional(),
});

const professionalDetailsSchema = z.object({
  title: z.string().min(1, { message: "Professional title is required" }),
  yearsExperience: z.string().min(1, { message: "Experience range is required" }),
  summary: z.string().min(1, { message: "Summary is required" }),
  // We'll handle arrays separately since they're more complex
  experiences: z.array(z.object({
    company: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string(),
  })).optional(),
  educations: z.array(z.object({
    institution: z.string(),
    degree: z.string(),
    field: z.string(),
    year: z.string(),
  })).optional(),
  certifications: z.array(z.object({
    name: z.string(),
    issuer: z.string(),
    year: z.string(),
    expiry: z.string().optional(),
  })).optional(),
});

const skillsCompensationSchema = z.object({
  skills: z.array(z.object({
    name: z.string(),
    years: z.string(),
  })).optional(),
  salary: z.string().optional(),
  currency: z.string().default("USD"),
  availability: z.string().min(1, { message: "Availability is required" }),
  remotePreference: z.string().min(1, { message: "Remote preference is required" }),
  noticePeriod: z.string().optional(),
});

const additionalInfoSchema = z.object({
  portfolio: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  additionalInfo: z.string().optional(),
  termsAgreement: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  communicationConsent: z.boolean().optional(),
});

// For simplicity, we'll use a simplified schema for the first implementation
const registerSchema = z.object({
  ...personalDetailsSchema.shape,
  ...professionalDetailsSchema.shape,
  ...skillsCompensationSchema.shape,
  ...additionalInfoSchema.shape,
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterFlow = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<Step>("personal");
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize the form with default values
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
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
      termsAgreement: false,
      communicationConsent: false,
    },
  });

  const handleSSOSignUp = (provider: string) => {
    setIsLoading(true);
    
    // Simulate SSO authentication
    setTimeout(() => {
      toast({
        title: "SSO Authentication",
        description: `Creating account with ${provider}...`,
      });
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  const nextStep = async () => {
    let isValid = false;
    
    if (currentStep === "personal") {
      isValid = await form.trigger([
        "firstName", "lastName", "email", "phone", "location", "profilePhoto"
      ]);
      if (isValid) setCurrentStep("professional");
    } 
    else if (currentStep === "professional") {
      isValid = await form.trigger([
        "title", "yearsExperience", "summary"
      ]);
      if (isValid) setCurrentStep("skills");
    } 
    else if (currentStep === "skills") {
      isValid = await form.trigger([
        "availability", "remotePreference", "noticePeriod"
      ]);
      if (isValid) setCurrentStep("additional");
    }
  };

  const prevStep = () => {
    if (currentStep === "professional") setCurrentStep("personal");
    else if (currentStep === "skills") setCurrentStep("professional");
    else if (currentStep === "additional") setCurrentStep("skills");
  };

  const onSubmit = (data: RegisterFormValues) => {
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", data);
      toast({
        title: "Account created!",
        description: "Your candidate account has been created successfully.",
      });
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "personal":
        return (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
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
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 000-0000" {...field} />
                  </FormControl>
                  <FormDescription>
                    Optional but recommended for job notifications
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
        
      case "professional":
        return (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Senior Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yearsExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience</FormLabel>
                  <FormControl>
                    <Input placeholder="5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Summary</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write a brief summary of your professional background and key skills..."
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* For simplicity, we're not implementing the full arrays management in this version */}
            <p className="text-sm text-muted-foreground">
              You'll be able to add your work experiences, education, and certifications after creating your account.
            </p>
          </>
        );
        
      case "skills":
        return (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              You'll be able to add your detailed skills after creating your account.
            </p>
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Availability</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="">Select availability</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="freelance">Freelance</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remotePreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remote Preference</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="">Select preference</option>
                      <option value="remote">Remote only</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="onsite">On-site</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Salary</FormLabel>
                    <FormControl>
                      <Input placeholder="70000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="JPY">JPY (¥)</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="noticePeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notice Period (weeks)</FormLabel>
                  <FormControl>
                    <Input placeholder="2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
        
      case "additional":
        return (
          <>
            <FormField
              control={form.control}
              name="portfolio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourportfolio.com" {...field} />
                  </FormControl>
                  <FormDescription>Optional</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/in/username" {...field} />
                    </FormControl>
                    <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Anything else you'd like employers to know?"
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="termsAgreement"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I agree to the <Link to="/terms" className="text-primary underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary underline">Privacy Policy</Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="communicationConsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I'd like to receive job recommendations and career tips via email
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-10 bg-muted/20">
        <div className="container max-w-3xl">
          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">{t("auth.createAccount")}</CardTitle>
              <CardDescription>
                Create your candidate profile and start your job search
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  {["personal", "professional", "skills", "additional"].map((step, index) => (
                    <div key={step} className="flex flex-col items-center">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step === currentStep 
                            ? "bg-primary text-primary-foreground" 
                            : index < ["personal", "professional", "skills", "additional"].indexOf(currentStep) 
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
                      width: `${(["personal", "professional", "skills", "additional"].indexOf(currentStep) + 1) * 25}%` 
                    }}
                  />
                </div>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <ScrollArea className="max-h-[450px] pr-4">
                    <div className="space-y-6 p-1">
                      {renderStepContent()}
                    </div>
                  </ScrollArea>
                  
                  <div className="flex justify-between pt-2">
                    {currentStep !== "personal" ? (
                      <Button type="button" variant="outline" onClick={prevStep}>
                        Previous
                      </Button>
                    ) : (
                      <Button type="button" variant="outline" disabled>
                        Previous
                      </Button>
                    )}
                    
                    {currentStep !== "additional" ? (
                      <Button type="button" onClick={nextStep}>
                        Next
                      </Button>
                    ) : (
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Creating Account..." : "Create Account"}
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
              
              {currentStep === "personal" && (
                <>
                  <div className="mt-6 relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        {t("auth.or")}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2" 
                      onClick={() => handleSSOSignUp("Google")}
                      disabled={isLoading}
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Sign up with Google
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => handleSSOSignUp("LinkedIn")}
                      disabled={isLoading}
                    >
                      <svg className="h-5 w-5 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      Sign up with LinkedIn
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex flex-col py-6">
              <div className="text-center text-sm">
                {t("auth.alreadyHaveAccount")}{" "}
                <Link to="/signin" className="text-primary font-medium hover:underline">
                  {t("auth.signIn")}
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterFlow;
