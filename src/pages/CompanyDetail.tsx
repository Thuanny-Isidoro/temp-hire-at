
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { MapPin, Building, Users, Briefcase, Link as LinkIcon, ExternalLink, ChevronLeft } from "lucide-react";
import { companies } from "@/data/companies";
import { featuredJobs } from "@/data/jobs";
import { useTranslation } from "@/hooks/useTranslation";

const CompanyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const companyId = parseInt(id || "0");
  
  const company = companies.find(c => c.id === companyId);
  
  const [relatedJobs, setRelatedJobs] = useState(
    featuredJobs.filter(job => job.company === company?.name).slice(0, 3)
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
            <Button variant="ghost" asChild className="gap-1 mb-6">
              <Link to="/companies">
                <ChevronLeft className="h-4 w-4" />
                {t("companies.details.backToCompanies")}
              </Link>
            </Button>
            
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="w-20 h-20 rounded-md overflow-hidden bg-background flex-shrink-0">
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  className="w-full h-full object-contain" 
                />
              </div>
              
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{company.name}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                  <div className="flex items-center text-sm text-muted-foreground gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>{company.size}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground gap-1">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>{company.openPositions} {t("companies.details.openPositions")}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 md:mt-0 md:ml-auto">
                <Button variant="outline" size="sm" asChild className="gap-1">
                  <a href={company.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    {t("companies.details.website")}
                  </a>
                </Button>
                <Button asChild size="sm">
                  <Link to={`/companies/${company.id}/jobs`}>
                    {t("companies.viewJobs")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-[1fr_300px] gap-8">
            <div>
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">{t("companies.details.aboutCompany")}</h2>
                  <p className="text-muted-foreground mb-6">{company.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {company.industries.map(industry => (
                      <Badge key={industry} variant="secondary" className="bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div>
                <h2 className="text-xl font-bold mb-4">{t("companies.details.openPositions")}</h2>
                
                {relatedJobs.length > 0 ? (
                  <div className="space-y-4">
                    {relatedJobs.map(job => (
                      <Card key={job.id} className="group hover:shadow-md transition-all duration-200">
                        <CardContent className="p-4">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold group-hover:text-primary transition-colors">
                                <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                              </h3>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                <div className="flex items-center text-sm text-muted-foreground gap-1">
                                  <MapPin className="h-3.5 w-3.5" />
                                  <span>{job.location}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground gap-1">
                                  <Briefcase className="h-3.5 w-3.5" />
                                  <span>{job.type}</span>
                                </div>
                              </div>
                            </div>
                            <Button size="sm" asChild>
                              <Link to={`/jobs/${job.id}`}>View</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <div className="text-center mt-6">
                      <Button variant="outline" asChild>
                        <Link to={`/companies/${company.id}/jobs`}>
                          {t("companies.details.viewAllJobs")}
                        </Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No open positions at this time.</p>
                )}
              </div>
            </div>
            
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium text-lg mb-4">{t("companies.details.companyInfo")}</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("companies.details.founded")}
                      </p>
                      <p className="font-medium">{company.founded}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("companies.details.size")}
                      </p>
                      <p className="font-medium">{company.size}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("companies.details.location")}
                      </p>
                      <p className="font-medium">{company.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("companies.details.industry")}
                      </p>
                      <p className="font-medium">{company.industries.join(", ")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("companies.details.website")}
                      </p>
                      <a 
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline flex items-center gap-1"
                      >
                        <LinkIcon className="h-3.5 w-3.5" />
                        {company.website.replace("https://", "")}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CompanyDetail;
