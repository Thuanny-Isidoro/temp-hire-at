
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, Building, ChevronLeft } from "lucide-react";
import { companies } from "@/data/companies";
import { featuredJobs } from "@/data/jobs";
import { useTranslation } from "@/hooks/useTranslation";

const CompanyJobs = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const companyId = parseInt(id || "0");
  
  const company = companies.find(c => c.id === companyId);
  const [relatedJobs, setRelatedJobs] = useState(
    featuredJobs.filter(job => job.company === company?.name)
  );

  useEffect(() => {
    if (!company) {
      console.error(`404 Error: Company with ID ${id} not found`);
    }
  }, [company, id]);

  if (!company) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Company Not Found</h1>
            <p className="text-muted-foreground mb-6">The company you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/companies">Browse All Companies</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-950/50 dark:to-transparent py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
              <Button variant="ghost" asChild className="gap-1">
                <Link to={`/companies/${company.id}`}>
                  <ChevronLeft className="h-4 w-4" />
                  {t("companies.details.backToCompanies")} 
                </Link>
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded overflow-hidden bg-background">
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <span className="font-medium">{company.name}</span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">
              {t("companies.details.openPositions")}
            </h1>
            <p className="text-muted-foreground">
              {relatedJobs.length} {t("companies.details.openPositions")} at {company.name}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {relatedJobs.length > 0 ? (
            <div className="grid gap-6">
              {relatedJobs.map(job => (
                <Card key={job.id} className="group hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                          <div className="flex items-center text-sm text-muted-foreground gap-1">
                            <Building className="h-3.5 w-3.5" />
                            <span>{job.company}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground gap-1">
                            <Briefcase className="h-3.5 w-3.5" />
                            <span>{job.type}</span>
                          </div>
                        </div>
                        
                        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                          We are seeking a talented {job.title} to join our team at {job.company}. 
                          This is an exciting opportunity to work on cutting-edge technology and 
                          contribute to our growing portfolio of products.
                        </p>
                      </div>
                      
                      <div className="flex flex-col gap-2 sm:flex-row md:flex-col justify-start md:justify-center min-w-[120px]">
                        <Button size="sm" asChild>
                          <Link to={`/jobs/${job.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">No Open Positions</h2>
              <p className="text-muted-foreground mb-6">
                {company.name} doesn't have any open positions at this time.
              </p>
              <Button asChild>
                <Link to="/companies">Browse All Companies</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CompanyJobs;
