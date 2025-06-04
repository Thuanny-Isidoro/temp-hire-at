
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { featuredJobs, getUserSavedJobs, removeJobFromFavorites } from "@/data/jobs";
import { JobListings } from "@/components/JobListings";
import { useToast } from "@/components/ui/use-toast";
import { scrollToTop } from "@/utils/scroll";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SavedJobs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [location, setLocation] = useState("all");
  const [savedJobs, setSavedJobs] = useState<typeof featuredJobs>([]);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    scrollToTop();
    const userKeys = Object.keys(localStorage);
    for (const key of userKeys) {
      if (key.includes('@')) {
        setUserEmail(key);
        const savedJobIds = getUserSavedJobs(key);
        const jobs = featuredJobs.filter(job => savedJobIds.includes(job.id));
        setSavedJobs(jobs);
        break;
      }
    }
  }, []);

  const handleRemoveJob = (jobId: number) => {
    if (userEmail) {
      removeJobFromFavorites(userEmail, jobId);
      setSavedJobs(prev => prev.filter(job => job.id !== jobId));
      toast({
        title: "Job removed",
        description: "The job has been removed from your saved jobs."
      });
    }
  };

  const filteredJobs = savedJobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    
    const matchesType = type === "all" || job.type === type;
    const matchesLocation = location === "all" || 
      (location === "remote" ? job.isRemote : job.location.includes(location));
    
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Back button with better styling */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/profile")} 
            className="flex items-center gap-2 text-primary hover:bg-primary-50 dark:hover:bg-primary-900/50 pl-2 pr-4"
          >
            <ArrowLeft size={18} />
            <span className="font-medium">Back to Profile</span>
          </Button>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Saved Jobs</h1>
        
        <Card className="p-8 mb-8 shadow-xl border-none bg-white dark:bg-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label htmlFor="search" className="text-gray-700 dark:text-gray-300">Search</Label>
              <Input
                id="search"
                placeholder="Search by title, company, or skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-gray-300 dark:border-gray-700 focus:border-primary focus:ring focus:ring-primary/20"
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="type" className="text-gray-700 dark:text-gray-300">Job Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="border-gray-300 dark:border-gray-700">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="location" className="text-gray-700 dark:text-gray-300">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="border-gray-300 dark:border-gray-700">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="USA">USA</SelectItem>
                  <SelectItem value="Europe">Europe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {filteredJobs.length === 0 ? (
          <Card className="p-16 text-center border-none shadow-xl bg-white dark:bg-gray-800">
            <div className="mb-6">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-medium text-gray-700 dark:text-gray-300 mb-3">No saved jobs found</p>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">Try adjusting your filters or save some jobs from our job listings</p>
            <Button 
              onClick={() => navigate("/jobs")} 
              className="bg-primary hover:bg-primary-600 text-white px-8"
            >
              Browse Jobs
            </Button>
          </Card>
        ) : (
          <JobListings 
            jobs={filteredJobs} 
            showSaveButton 
            onSaveJob={handleRemoveJob}
            savedJobs={filteredJobs.map(job => job.id)}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SavedJobs;
