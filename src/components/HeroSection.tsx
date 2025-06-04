
import { ArrowRight, Briefcase, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import QuickJobSearch from "./QuickJobSearch";
import { useTranslation } from "@/hooks/useTranslation";

const HeroSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 px-4 lg:px-8 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Find Your <span className="text-primary-500">Global Tech Career</span> Opportunity
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Connect with top tech companies from US, Europe, and Latin America. 
              Remote positions and relocation opportunities available.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base">
                <Link to="/jobs">
                  Browse Jobs <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link to="/register">
                  Create Profile <Users className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <div className="mt-12 pt-8 border-t">
              <p className="text-sm font-medium mb-4">{t("quickSearch.title")}</p>
              <QuickJobSearch />
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary-100 dark:bg-primary-900/20 blur-3xl opacity-50"></div>
            <div className="bg-card border shadow-lg rounded-xl p-6 z-10 relative">
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                <div className="flex flex-col gap-3 p-4 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors">
                  <Globe className="h-8 w-8 text-primary-500" />
                  <h3 className="text-lg font-semibold">Global Opportunities</h3>
                  <p className="text-sm text-muted-foreground">Access job positions from companies in US, Europe, and Latin America.</p>
                </div>
                <div className="flex flex-col gap-3 p-4 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors">
                  <Briefcase className="h-8 w-8 text-primary-500" />
                  <h3 className="text-lg font-semibold">Remote & Relocation</h3>
                  <p className="text-sm text-muted-foreground">Find remote positions or opportunities with relocation packages.</p>
                </div>
                <div className="flex flex-col gap-3 p-4 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors">
                  <Users className="h-8 w-8 text-primary-500" />
                  <h3 className="text-lg font-semibold">Top Tech Talent</h3>
                  <p className="text-sm text-muted-foreground">Connect with a community of skilled tech professionals worldwide.</p>
                </div>
                <div className="flex flex-col gap-3 p-4 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors">
                  <svg className="h-8 w-8 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 9H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 9H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3 className="text-lg font-semibold">Career Support</h3>
                  <p className="text-sm text-muted-foreground">Get assistance with your job applications and interview process.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
