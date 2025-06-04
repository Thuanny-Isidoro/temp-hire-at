
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import JobsSection from "@/components/JobsSection";
import CandidatesSection from "@/components/CandidatesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <JobsSection />
        <StatsSection />
        <CandidatesSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
