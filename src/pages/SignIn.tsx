import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/hooks/useTranslation";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Validate inputs
    if (!email) {
      setError("Please enter your email address");
      setIsLoading(false);
      return;
    }
    
    if (!password) {
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }

    // Check for demo admin account
    if (email === "admin@seventechnologies.cloud") {
      // Set mock data for demo
      const mockUserData = {
        email: "admin@seventechnologies.cloud",
        firstName: "Admin",
        lastName: "User",
        title: "Senior Technology Manager",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        bio: "Experienced technology professional with expertise in cloud solutions and enterprise architecture.",
        website: "https://seventechnologies.cloud",
        education: "Master's in Computer Science\nStanford University (2015-2017)\n\nBachelor's in Software Engineering\nMIT (2011-2015)",
        experience: "Senior Technology Manager at Seven Technologies\n2020 - Present\n\nTechnical Lead at Cloud Solutions Inc.\n2017 - 2020",
        skills: ["Cloud Architecture", "Enterprise Solutions", "Team Leadership"]
      };

      localStorage.setItem(email, JSON.stringify(mockUserData));
      
      setTimeout(() => {
        toast({
          title: "Welcome back, Admin!",
          description: "You have successfully signed in to the demo account.",
        });
        setIsLoading(false);
        navigate('/profile');
      }, 1000);
      
      return;
    }
    
    // Regular authentication logic for non-demo users
    const storedUser = localStorage.getItem(email);
    
    if (!storedUser) {
      setError("No account found with this email");
      setIsLoading(false);
      return;
    }
    
    try {
      const user = JSON.parse(storedUser);
      
      // Simple password verification
      if (user.password !== password) {
        setError("Incorrect password");
        setIsLoading(false);
        return;
      }
      
      // Simulate successful authentication
      setTimeout(() => {
        toast({
          title: "Success!",
          description: "You have successfully signed in.",
        });
        setIsLoading(false);
        navigate('/profile'); // Navigate to profile page
      }, 1500);
    } catch (err) {
      setError("Authentication error");
      setIsLoading(false);
    }
  };

  const handleSSOSignIn = (provider: string) => {
    setIsLoading(true);
    setError("");
    
    // Simulate SSO authentication
    setTimeout(() => {
      // For demonstration, create a mock user in localStorage if not exists
      const mockEmail = `user_${Math.random().toString(36).substring(2)}@${provider.toLowerCase()}.com`;
      
      if (!localStorage.getItem(mockEmail)) {
        localStorage.setItem(mockEmail, JSON.stringify({ 
          email: mockEmail, 
          provider,
          firstName: "John",
          lastName: "Doe",
          createdAt: new Date().toISOString()
        }));
      }
      
      toast({
        title: "SSO Authentication",
        description: `Signing in with ${provider}...`,
      });
      setIsLoading(false);
      navigate('/profile'); // Navigate to profile page
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 bg-muted/20">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">{t("auth.signIn")}</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 pb-0">
              {error && (
                <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("auth.email")}</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{t("auth.password")}</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-primary hover:underline"
                    >
                      {t("auth.forgotPassword")}
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm font-normal">{t("auth.rememberMe")}</Label>
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : t("auth.signIn")}
                </Button>
              </form>
              
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-muted"></div>
                <span className="flex-shrink mx-4 text-muted-foreground text-sm">{t("auth.or")}</span>
                <div className="flex-grow border-t border-muted"></div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2" 
                  onClick={() => handleSSOSignIn("Google")}
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
                  {t("auth.ssoGoogle")}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => handleSSOSignIn("LinkedIn")}
                  disabled={isLoading}
                >
                  <svg className="h-5 w-5 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  {t("auth.ssoLinkedin")}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => handleSSOSignIn("Email Magic Link")}
                  disabled={isLoading}
                >
                  <Mail className="h-5 w-5" />
                  {t("auth.ssoMagicLink")}
                </Button>
              </div>
              
              <div className="text-center text-sm mt-6">
                {t("auth.dontHaveAccount")}{" "}
                <Link to="/register" className="text-primary font-medium hover:underline">
                  {t("auth.signUp")}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
