
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { MapPin, Building, Users, Briefcase, ArrowRight } from "lucide-react";
import FilterSidebar from "@/components/FilterSidebar";
import { useTranslation } from "@/hooks/useTranslation";
import { companies } from "@/data/companies";

const Companies = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string[]>>({
    industry: [],
    size: [],
  });
  const [filteredCompanies, setFilteredCompanies] = useState(companies);

  const filterGroups = [
    {
      id: "industry",
      title: "companies.filters.industry",
      options: [
        { id: "Software Development", label: "companies.industry.software" },
        { id: "AI & Machine Learning", label: "companies.industry.ai" },
        { id: "Cybersecurity", label: "companies.industry.cybersecurity" },
        { id: "FinTech", label: "companies.industry.fintech" },
        { id: "HealthTech", label: "companies.industry.healthtech" },
      ],
    },
    {
      id: "size",
      title: "companies.filters.size",
      options: [
        { id: "Startup (1-50)", label: "companies.size.startup" },
        { id: "SMB (51-200)", label: "companies.size.smb" },
        { id: "Mid-size (201-1000)", label: "companies.size.midsize" },
        { id: "Enterprise (1000+)", label: "companies.size.enterprise" },
      ],
    },
  ];

  useEffect(() => {
    const filtered = companies.filter(company => {
      const matchesSearch = searchTerm === "" || 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industries.some(industry => industry.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesIndustry = filters.industry.length === 0 || 
        company.industries.some(industry => filters.industry.includes(industry));
      
      const matchesSize = filters.size.length === 0 || 
        filters.size.includes(company.size);
      
      return matchesSearch && matchesIndustry && matchesSize;
    });
    
    setFilteredCompanies(filtered);
  }, [searchTerm, filters]);

  const handleFilterChange = (groupId: string, values: string[]) => {
    setFilters(prev => ({
      ...prev,
      [groupId]: values
    }));
  };

  const clearFilters = () => {
    setFilters({
      industry: [],
      size: [],
    });
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-950/50 dark:to-transparent py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("companies.title")}</h1>
            <p className="text-muted-foreground max-w-2xl">
              {t("companies.subtitle")}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            <div>
              <FilterSidebar
                groups={filterGroups}
                selectedFilters={filters}
                onFilterChange={handleFilterChange}
                onSearch={setSearchTerm}
                searchPlaceholder={t("companies.search")}
                clearFilters={clearFilters}
                className=""
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{t("companies.hiring")}</h2>
                  <p className="text-muted-foreground">
                    {t("companies.found", { count: filteredCompanies.length })}
                  </p>
                </div>
              </div>

              {filteredCompanies.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">{t("companies.noCompaniesMatch")}</p>
                  <Button onClick={clearFilters}>{t("common.clearAll")}</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredCompanies.map(company => (
                    <Card 
                      key={company.id} 
                      className="group hover:shadow-md transition-all duration-200"
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                          <div className="w-16 h-16 rounded-md flex-shrink-0 overflow-hidden bg-background">
                            <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                              <Link to={`/companies/${company.id}`}>{company.name}</Link>
                            </h3>
                            
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                              <div className="flex items-center text-sm text-muted-foreground gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>{company.location}</span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground gap-1">
                                <Users className="h-3.5 w-3.5" />
                                <span>{t(`companies.size.${company.size.toLowerCase().replace(/[\s()+-]/g, '')}`)}</span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground gap-1">
                                <Briefcase className="h-3.5 w-3.5" />
                                <span>{t("companies.openPositionsCount", { count: company.openPositions })}</span>
                              </div>
                            </div>
                            
                            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{company.description}</p>
                            
                            <div className="mt-4 flex flex-wrap gap-2">
                              {company.industries.map(industry => (
                                <Badge key={industry} variant="secondary" className="bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300">
                                  {t(`companies.industry.${industry.toLowerCase().replace(/[\s&]/g, '')}`)}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="md:self-center flex md:flex-col gap-2 mt-4 md:mt-0">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/companies/${company.id}`}>
                                {t("companies.viewProfile")}
                              </Link>
                            </Button>
                            <Button size="sm" asChild>
                              <Link to={`/companies/${company.id}/jobs`}>
                                {t("companies.viewJobs")}
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Companies;
