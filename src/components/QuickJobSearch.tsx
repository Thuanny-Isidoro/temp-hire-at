
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Popular search terms
const popularSearches = [
  "React Developer",
  "Software Engineer",
  "Full Stack",
  "Remote",
  "JavaScript",
  "DevOps",
  "Product Manager",
  "UI/UX Designer"
];

const QuickJobSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem("recentJobSearches");
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      toast({
        title: "Empty search",
        description: "Please enter a keyword, job title or skill",
        variant: "destructive",
      });
      return;
    }
    
    // Save search to recent searches
    const newRecentSearches = [
      searchTerm,
      ...recentSearches.filter(s => s !== searchTerm)
    ].slice(0, 5); // Keep only 5 most recent
    
    setRecentSearches(newRecentSearches);
    localStorage.setItem("recentJobSearches", JSON.stringify(newRecentSearches));
    
    // Navigate to jobs page with search query
    navigate(`/jobs?q=${encodeURIComponent(searchTerm)}`);
  };

  const handlePopularSearch = (term: string) => {
    setSearchTerm(term);
    // Submit the form programmatically
    handleSearch(new Event("submit") as unknown as React.FormEvent);
  };

  const handleRecentSearch = (term: string) => {
    setSearchTerm(term);
    // Submit the form programmatically
    handleSearch(new Event("submit") as unknown as React.FormEvent);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentJobSearches");
    toast({
      title: "Cleared",
      description: "Your recent searches have been cleared",
    });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Job title, skills or keyword" 
            className="pl-9 bg-white dark:bg-slate-900"
          />
        </div>
        <Button type="submit" className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Search
        </Button>
      </form>
      
      <div className="mt-4">
        {recentSearches.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium mb-2">Recent Searches</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearRecentSearches}
                className="h-6 text-xs text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3 mr-1" /> Clear
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term, i) => (
                <Badge 
                  key={i} 
                  variant="outline"
                  className="cursor-pointer bg-white dark:bg-slate-800 hover:bg-muted"
                  onClick={() => handleRecentSearch(term)}
                >
                  {term}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div>
          <h4 className="text-sm font-medium mb-2">Popular Searches</h4>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term, i) => (
              <Badge 
                key={i}
                variant="outline"
                className="cursor-pointer bg-white dark:bg-slate-800 hover:bg-muted"
                onClick={() => handlePopularSearch(term)}
              >
                {term}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickJobSearch;
