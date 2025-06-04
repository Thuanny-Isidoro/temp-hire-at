
import { ArrowRight, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { featuredCandidates } from "@/data/candidates";
import { useTranslation } from "@/hooks/useTranslation";

const CandidatesSection = () => {
  const { t } = useTranslation();
  
  // Format name as "Last Name, First Initial."
  const formatName = (fullName: string) => {
    const nameParts = fullName.split(' ');
    const lastName = nameParts.pop() || '';
    const firstInitial = nameParts.length > 0 ? nameParts[0].charAt(0) : '';
    return `${lastName}, ${firstInitial}.`;
  };

  return (
    <section className="py-16 px-4 lg:px-8 bg-muted/20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold">{t("home.featuredTalent")}</h2>
            <p className="mt-2 text-muted-foreground">{t("home.connectWithTalent")}</p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link to="/candidates">
              {t("home.viewAllCandidates")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCandidates.slice(0, 4).map(candidate => (
            <Card key={candidate.id} className="group hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                    <img src={candidate.avatar} alt={formatName(candidate.name)} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    <Link to={`/candidates/${candidate.id}`}>{formatName(candidate.name)}</Link>
                  </h3>
                  <p className="text-primary-500 font-medium">{candidate.title}</p>
                  
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
                  <Button variant="ghost" size="sm" asChild className="w-full mt-2">
                    <Link to={`/candidates/${candidate.id}`}>
                      {t("home.viewProfile")}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CandidatesSection;
