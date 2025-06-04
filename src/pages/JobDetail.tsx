
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Briefcase, Building, DollarSign, Share2, Bookmark, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { featuredJobs, getUserAppliedJobs, saveJobApplication } from "@/data/jobs";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const job = featuredJobs.find(job => job.id.toString() === id);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const userKeys = Object.keys(localStorage);
    for (const key of userKeys) {
      if (key.includes('@')) {
        setUserEmail(key);
        const appliedJobs = getUserAppliedJobs(key);
        if (job && appliedJobs.includes(job.id)) {
          setHasApplied(true);
        }
        break;
      }
    }
  }, [job]);

  const handleApply = () => {
    if (!userEmail) {
      toast({
        title: "Login Required",
        description: "Please log in to apply for this position.",
        variant: "destructive"
      });
      navigate("/signin");
      return;
    }

    if (job) {
      saveJobApplication(userEmail, job.id);
      setHasApplied(true);
      toast({
        title: "Application Submitted",
        description: "Your application has been recorded successfully."
      });
      window.open(job.externalLink, '_blank');
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
            <p className="text-muted-foreground mb-6">The job listing you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/jobs">Browse All Jobs</Link>
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
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-6">
          <Button variant="ghost" asChild className="gap-1 mb-4">
            <Link to="/jobs">
              <ChevronLeft className="h-4 w-4" />
              Back to Jobs
            </Link>
          </Button>

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-md overflow-hidden bg-primary-100">
                <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{job.title}</h1>
                <p className="text-muted-foreground flex items-center gap-1 mt-1">
                  <Building className="h-4 w-4" />
                  {job.company}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Bookmark className="h-4 w-4" />
                Save
              </Button>
              <Button size="sm" onClick={handleApply} disabled={hasApplied}>
                {hasApplied ? "Already Applied" : "Apply Now"}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_300px] gap-8">
          <div>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Posted {job.postedAt}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300">
                      {tag}
                    </Badge>
                  ))}
                  {job.isRemote && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300">
                      Remote
                    </Badge>
                  )}
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <h2>About the Role</h2>
                  <p>
                    We are seeking a talented {job.title} to join our team at {job.company}. 
                    This is an exciting opportunity to work on cutting-edge technology and 
                    contribute to our growing portfolio of products.
                  </p>

                  <h3>Responsibilities</h3>
                  <ul>
                    <li>Design, develop, and maintain high-quality software</li>
                    <li>Collaborate with cross-functional teams to define and implement new features</li>
                    <li>Write clean, maintainable, and efficient code</li>
                    <li>Participate in code reviews and contribute to technical documentation</li>
                    <li>Troubleshoot and fix bugs in existing applications</li>
                  </ul>

                  <h3>Requirements</h3>
                  <ul>
                    <li>Strong experience with {job.tags.join(", ")}</li>
                    <li>Excellent problem-solving skills and attention to detail</li>
                    <li>Ability to work independently and in a team environment</li>
                    <li>Good communication skills</li>
                    <li>Passion for creating great user experiences</li>
                  </ul>

                  <h3>Benefits</h3>
                  <ul>
                    <li>Competitive salary ({job.salary})</li>
                    <li>Flexible working hours and {job.isRemote ? "remote work options" : "modern office space"}</li>
                    <li>Health, dental, and vision insurance</li>
                    <li>Generous PTO policy</li>
                    <li>Professional development opportunities</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium text-lg mb-4">Apply for this position</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {hasApplied 
                    ? "You have already applied for this position."
                    : "Submit your application today and take the next step in your career journey."}
                </p>
                <Button 
                  className="w-full mb-2" 
                  onClick={handleApply}
                  disabled={hasApplied}
                >
                  {hasApplied ? "Already Applied" : "Apply Now"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium text-lg mb-4">Company Information</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded overflow-hidden">
                    <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">{job.company}</p>
                    <p className="text-sm text-muted-foreground">Technology</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {job.company} is a leading technology company focused on innovation 
                  and delivering exceptional products to our global customer base.
                </p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link to={`/companies/${job.company.toLowerCase().replace(/\s+/g, '-')}`}>
                    View Company Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobDetail;
