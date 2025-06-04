
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { MapPin, Clock, Briefcase, Building, DollarSign, ArrowRight } from "lucide-react";
import FilterSidebar from "@/components/FilterSidebar";
import { useTranslation } from "@/hooks/useTranslation";

// Import the job data
import { featuredJobs } from "@/data/jobs";

const Jobs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const query = new URLSearchParams(location.search);
  const queryParam = query.get('q') || "";
  
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [filters, setFilters] = useState<Record<string, string[]>>({
    jobType: [],
    location: [],
    experience: [],
  });
  const [filteredJobs, setFilteredJobs] = useState(featuredJobs);

  // Filter groups for sidebar
  const filterGroups = [
    {
      id: "jobType",
      title: "jobs.filters.jobType",
      options: [
        { id: "Full-time", label: "jobs.fullTime" },
        { id: "Contract", label: "jobs.contract" },
        { id: "Part-time", label: "jobs.partTime" },
        { id: "Internship", label: "jobs.internship" },
      ],
    },
    {
      id: "location",
      title: "jobs.filters.location",
      options: [
        { id: "Remote", label: "jobs.remote" },
        { id: "On-site", label: "jobs.onSite" },
      ],
    },
    {
      id: "experience",
      title: "jobs.filters.experience",
      options: [
        { id: "Entry Level", label: "jobs.entryLevel" },
        { id: "Mid Level", label: "jobs.midLevel" },
        { id: "Senior", label: "jobs.senior" },
        { id: "Lead", label: "jobs.lead" },
      ],
    },
  ];

  // Update search when the URL query parameter changes
  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  // Apply filters when they change
  useEffect(() => {
    const filtered = featuredJobs.filter(job => {
      const matchesSearch = searchTerm === "" || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesJobType = filters.jobType.length === 0 || 
        filters.jobType.includes(job.type);
      
      const matchesLocation = filters.location.length === 0 || 
        (filters.location.includes("Remote") && job.isRemote) ||
        (filters.location.includes("On-site") && !job.isRemote);
      
      // Experience level filter would require additional data in the job objects
      const matchesExperience = filters.experience.length === 0;
      
      return matchesSearch && matchesJobType && matchesLocation && matchesExperience;
    });
    
    setFilteredJobs(filtered);
  }, [searchTerm, filters]);

  const handleFilterChange = (groupId: string, values: string[]) => {
    setFilters(prev => ({
      ...prev,
      [groupId]: values
    }));
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    navigate(`/jobs?q=${encodeURIComponent(term)}`);
  };

  const clearFilters = () => {
    setFilters({
      jobType: [],
      location: [],
      experience: [],
    });
    setSearchTerm("");
    navigate('/jobs');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-950/50 dark:to-transparent py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold">{t("jobs.title")}</h1>
            <p className="text-muted-foreground max-w-2xl">
              {t("jobs.subtitle")}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar with filters */}
            <div>
              <FilterSidebar
                groups={filterGroups}
                selectedFilters={filters}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                searchValue={searchTerm}
                searchPlaceholder={t("jobs.search")}
                clearFilters={clearFilters}
                className=""
              />
            </div>

            {/* Job listings */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{t("jobs.openPositions")}</h2>
                  <p className="text-muted-foreground">
                    {t("jobs.found", { count: filteredJobs.length })}
                  </p>
                </div>
              </div>

              {filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">{t("jobs.noMatchingJobs")}</p>
                  <Button onClick={clearFilters}>{t("common.clearAll")}</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredJobs.map(job => (
                    <Card 
                      key={job.id} 
                      className="group hover:shadow-md transition-all duration-200"
                      onClick={() => navigate(`/jobs/${job.id}`)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-md flex-shrink-0 overflow-hidden bg-background">
                            <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
                              <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                            </h3>
                            <p className="text-muted-foreground flex items-center gap-1 mt-1">
                              <Building className="h-3.5 w-3.5" />
                              {job.company}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center text-sm text-muted-foreground gap-x-4 gap-y-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-3.5 w-3.5" />
                            <span>{t(`jobs.${job.type.toLowerCase().replace('-', '')}`)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3.5 w-3.5" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{job.postedAt}</span>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {job.tags.slice(0, 4).map(tag => (
                            <Badge key={tag} variant="secondary" className="bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300 hover:bg-primary-100">
                              {tag}
                            </Badge>
                          ))}
                          {job.tags.length > 4 && (
                            <Badge variant="outline">{t("common.plusMore", { count: job.tags.length - 4 })}</Badge>
                          )}
                        </div>

                        <div className="mt-4 pt-4 border-t flex justify-between items-center">
                          {job.isRemote && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300">
                              {t("jobs.remote")}
                            </Badge>
                          )}
                          <Button variant="ghost" size="sm" asChild className="ml-auto group-hover:bg-primary/10">
                            <Link to={`/jobs/${job.id}`} className="flex items-center">
                              {t("jobs.viewDetails")}
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
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

export default Jobs;
