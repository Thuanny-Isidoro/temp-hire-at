
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  MapPin, 
  Briefcase, 
  Calendar, 
  Mail, 
  Phone, 
  Globe, 
  Linkedin, 
  Github,
  ChevronLeft,
  MessageSquare,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";
import { featuredCandidates } from "@/data/candidates";
import { BlurredSection } from "@/components/BlurredSection";
import { useTranslation } from "@/hooks/useTranslation";

const CandidateProfile = () => {
  const { id } = useParams<{ id: string }>();
  const candidate = featuredCandidates.find(candidate => candidate.id.toString() === id);
  const { t } = useTranslation();

  if (!candidate) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">{t("candidates.notFound")}</h1>
            <p className="text-muted-foreground mb-6">{t("candidates.notFoundDesc")}</p>
            <Button asChild>
              <Link to="/candidates">{t("candidates.browseAll")}</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Format name as "Last Name, First Initial."
  const nameParts = candidate.name.split(' ');
  const lastName = nameParts.pop() || '';
  const firstInitial = nameParts.length > 0 ? nameParts[0].charAt(0) : '';
  const formattedName = `${lastName}, ${firstInitial}.`;

  // Mock data for the profile
  const education = [
    { 
      degree: "MSc in Computer Science", 
      school: "Technical University of Berlin", 
      years: "2015-2017" 
    },
    { 
      degree: "BSc in Software Engineering", 
      school: "University of Madrid", 
      years: "2011-2015" 
    }
  ];

  const experience = [
    {
      role: "Senior Frontend Developer",
      company: "TechGlobal Inc.",
      years: "2020-Present",
      description: "Led development of React-based applications, reducing load times by 40%. Implemented TypeScript across legacy codebase."
    },
    {
      role: "Full Stack Developer",
      company: "Innovative Solutions",
      years: "2017-2020",
      description: "Developed and maintained client applications with React, Node.js, and MongoDB. Participated in all phases of the software development lifecycle."
    }
  ];

  const certifications = [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2022",
      expiry: "2025"
    },
    {
      name: "Professional Scrum Master I",
      issuer: "Scrum.org",
      year: "2021",
      expiry: "N/A"
    },
    {
      name: "Google Cloud Professional Developer",
      issuer: "Google",
      year: "2023",
      expiry: "2026"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <Button variant="ghost" asChild className="gap-1 mb-6">
          <Link to="/candidates">
            <ChevronLeft className="h-4 w-4" />
            {t("candidates.backToList")}
          </Link>
        </Button>

        <div className="grid md:grid-cols-[1fr_350px] gap-8">
          <div className="space-y-8">
            <Card className="overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-primary-100 to-primary-200"></div>
              <div className="-mt-16 px-6 pb-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:items-end mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background">
                    <img 
                      src={candidate.avatar} 
                      alt={formattedName}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="space-y-1">
                    <h1 className="text-2xl font-bold">{formattedName}</h1>
                    <p className="text-primary-500">{candidate.title}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {candidate.location}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        {t("candidates.yearsExperience", { years: candidate.experience })}
                      </Badge>
                      {candidate.openToRemote && (
                        <Badge className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300">
                          {t("candidates.remoteOk")}
                        </Badge>
                      )}
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {candidate.availability}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-1 gap-4 mt-6">
                  <Button className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {t("candidates.contact")}
                  </Button>
                </div>
              </div>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">{t("candidates.about")}</h2>
              </CardHeader>
              <CardContent>
                <p>
                  {t("candidates.experiencedProfessional", {
                    title: candidate.title,
                    years: candidate.experience,
                    skills: candidate.skills.join(", ")
                  })}
                </p>
                <p className="mt-4">
                  {t("candidates.thriveIn")}
                  {candidate.availability.toLowerCase()}.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">{t("candidates.skills")}</h2>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300 px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">{t("candidates.workExperience")}</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {experience.map((item, index) => (
                    <div key={index} className="border-l-2 border-primary-200 pl-4 ml-2 relative">
                      <div className="absolute w-3 h-3 bg-primary-500 rounded-full -left-[7px] top-1"></div>
                      <h3 className="font-semibold text-lg">{item.role}</h3>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <span>{item.company}</span>
                        <span className="mx-2">•</span>
                        <span>{item.years}</span>
                      </div>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">{t("candidates.education")}</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {education.map((item, index) => (
                    <div key={index} className="border-l-2 border-primary-200 pl-4 ml-2 relative">
                      <div className="absolute w-3 h-3 bg-primary-500 rounded-full -left-[7px] top-1"></div>
                      <h3 className="font-semibold text-lg">{item.degree}</h3>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <span>{item.school}</span>
                        <span className="mx-2">•</span>
                        <span>{item.years}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">{t("candidates.certifications")}</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {certifications.map((item, index) => (
                    <div key={index} className="border-l-2 border-primary-200 pl-4 ml-2 relative">
                      <div className="absolute w-3 h-3 bg-primary-500 rounded-full -left-[7px] top-1"></div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <Badge variant="outline" className="ml-2">
                          <Award className="h-3 w-3 mr-1" />
                          {item.issuer}
                        </Badge>
                      </div>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <span>{t("candidates.obtained")}: {item.year}</span>
                        {item.expiry !== "N/A" && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{t("candidates.expires")}: {item.expiry}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <BlurredSection title={t("candidates.contactInfo")}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span>contact@{candidate.name.toLowerCase().replace(' ', '')}tech.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <a href="#" className="text-primary hover:underline">
                    {candidate.name.toLowerCase().replace(' ', '')}tech.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-muted-foreground" />
                  <a href="#" className="text-primary hover:underline">
                    linkedin.com/in/{candidate.name.toLowerCase().replace(' ', '')}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-muted-foreground" />
                  <a href="#" className="text-primary hover:underline">
                    github.com/{candidate.name.toLowerCase().replace(' ', '')}
                  </a>
                </div>
              </div>
            </BlurredSection>

            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">{t("candidates.languages")}</h2>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>{t("languages.english")}</span>
                  <span className="text-muted-foreground">{t("languages.native")}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("languages.spanish")}</span>
                  <span className="text-muted-foreground">{t("languages.fluent")}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("languages.german")}</span>
                  <span className="text-muted-foreground">{t("languages.intermediate")}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CandidateProfile;
