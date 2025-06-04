
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import FilterSidebar from "@/components/FilterSidebar";
import { useTranslation } from "@/hooks/useTranslation";
import { featuredCandidates } from "@/data/candidates";

const Candidates = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string[]>>({
    experience: [],
    remoteWork: [],
    location: [],
  });
  const [filteredCandidates, setFilteredCandidates] = useState(featuredCandidates);

  // Filter groups for sidebar
  const filterGroups = [
    {
      id: "experience",
      title: t("candidates.filters.experience"),
      options: [
        { id: "Junior", label: t("candidates.junior") },
        { id: "Mid-level", label: t("candidates.midLevel") },
        { id: "Senior", label: t("candidates.senior") },
      ],
    },
    {
      id: "remoteWork",
      title: t("candidates.filters.remote"),
      options: [
        { id: "Remote", label: t("candidates.openToRemote") },
      ],
    },
    {
      id: "location",
      title: t("candidates.filters.location"),
      options: [
        { id: "London", label: t("candidates.locationLondon") },
        { id: "Berlin", label: t("candidates.locationBerlin") },
        { id: "Madrid", label: t("candidates.locationMadrid") },
        { id: "São Paulo", label: t("candidates.locationSaoPaulo") },
      ],
    },
  ];

  // Apply filters when they change
  useEffect(() => {
    const filtered = featuredCandidates.filter(candidate => {
      const matchesSearch = searchTerm === "" || 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesExperience = filters.experience.length === 0 || 
        (filters.experience.includes("Junior") && parseInt(candidate.experience) < 3) ||
        (filters.experience.includes("Mid-level") && parseInt(candidate.experience) >= 3 && parseInt(candidate.experience) < 6) ||
        (filters.experience.includes("Senior") && parseInt(candidate.experience) >= 6);
      
      const matchesRemote = filters.remoteWork.length === 0 || 
        (filters.remoteWork.includes("Remote") && candidate.openToRemote);
      
      const matchesLocation = filters.location.length === 0 || 
        filters.location.some(location => candidate.location.includes(location));
      
      return matchesSearch && matchesExperience && matchesRemote && matchesLocation;
    });
    
    setFilteredCandidates(filtered);
  }, [searchTerm, filters]);

  const handleFilterChange = (groupId: string, values: string[]) => {
    setFilters(prev => ({
      ...prev,
      [groupId]: values
    }));
  };

  const clearFilters = () => {
    setFilters({
      experience: [],
      remoteWork: [],
      location: [],
    });
    setSearchTerm("");
  };

  // Format name as "Last Name, First Initial."
  const formatName = (fullName: string) => {
    const nameParts = fullName.split(' ');
    const lastName = nameParts.pop() || '';
    const firstInitial = nameParts.length > 0 ? nameParts[0].charAt(0) : '';
    return `${lastName}, ${firstInitial}.`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-950/50 dark:to-transparent py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("candidates.title")}</h1>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              {t("candidates.subtitle")}
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
                searchPlaceholder={t("candidates.search")}
                searchValue={searchTerm}
                clearFilters={clearFilters}
                className=""
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{t("candidates.available")}</h2>
                  <p className="text-muted-foreground">
                    {t("candidates.found", { count: filteredCandidates.length })}
                  </p>
                </div>
              </div>

              {filteredCandidates.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">{t("candidates.noCandidatesMatch")}</p>
                  <Button onClick={clearFilters}>{t("common.clearAll")}</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCandidates.map(candidate => (
                    <Card 
                      key={candidate.id} 
                      className="group hover:shadow-md transition-all duration-200"
                      onClick={() => navigate(`/candidates/${candidate.id}`)}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                            <img src={candidate.avatar} alt={formatName(candidate.name)} className="w-full h-full object-cover" />
                          </div>
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            <Link to={`/candidates/${candidate.id}`}>{formatName(candidate.name)}</Link>
                          </h3>
                          <p className="text-primary font-medium">{candidate.title}</p>
                          
                          <div className="mt-2 flex items-center justify-center text-sm text-muted-foreground gap-2">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{candidate.location}</span>
                          </div>
                          
                          <div className="mt-1 flex items-center justify-center text-sm text-muted-foreground gap-2">
                            <Briefcase className="h-3.5 w-3.5" />
                            <span>{t("candidates.yearsExperience", { years: candidate.experience })}</span>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                          {candidate.skills.slice(0, 3).map(skill => (
                            <Badge key={skill} variant="secondary" className="bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 3 && (
                            <Badge variant="outline">{t("common.plusMore", { count: candidate.skills.length - 3 })}</Badge>
                          )}
                        </div>

                        <div className="mt-4 pt-4 border-t flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium">{candidate.availability}</span>
                            {candidate.openToRemote && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300">
                                {t("candidates.remoteOk")}
                              </Badge>
                            )}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            asChild 
                            className="w-full mt-2 group-hover:bg-primary/10"
                          >
                            <Link to={`/candidates/${candidate.id}`} className="flex items-center justify-center">
                              {t("candidates.viewProfile")}
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

export default Candidates;
