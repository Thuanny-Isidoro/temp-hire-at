
import { ArrowRight, MapPin, Clock, Briefcase, Building, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { featuredJobs } from "@/data/jobs";
import { useTranslation } from "@/hooks/useTranslation";

const JobsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 px-4 lg:px-8 bg-muted/50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold">{t("jobs.featuredOpportunities")}</h2>
            <p className="mt-2 text-muted-foreground">{t("jobs.discoverLatest")}</p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link to="/jobs">
              {t("common.viewAll")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map(job => (
            <Card key={job.id} className="group hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md flex-shrink-0 overflow-hidden">
                    <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
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

                <div className="mt-4 flex items-center text-sm text-muted-foreground gap-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>{t(`jobs.${job.type.toLowerCase().replace('-', '')}`)}</span>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center text-sm text-muted-foreground gap-4">
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
                  {job.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300 hover:bg-primary-100">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  {job.isRemote && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300">
                      {t("jobs.remote")}
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" asChild className="ml-auto">
                    <Link to={`/jobs/${job.id}`}>
                      {t("jobs.viewDetails")}
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

export default JobsSection;
