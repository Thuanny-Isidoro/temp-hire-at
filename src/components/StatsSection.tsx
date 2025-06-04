
import { Briefcase, Building, Globe, Users } from "lucide-react";

const stats = [
  {
    icon: <Briefcase className="h-12 w-12 text-primary-500" />,
    value: "5,000+",
    label: "Tech Jobs",
    description: "Available positions globally"
  },
  {
    icon: <Users className="h-12 w-12 text-primary-500" />,
    value: "25,000+",
    label: "Tech Professionals",
    description: "Talented candidates in our network"
  },
  {
    icon: <Building className="h-12 w-12 text-primary-500" />,
    value: "1,200+",
    label: "Partner Companies",
    description: "Hiring from our platform"
  },
  {
    icon: <Globe className="h-12 w-12 text-primary-500" />,
    value: "40+",
    label: "Countries",
    description: "Global opportunities"
  }
];

const StatsSection = () => {
  return (
    <section className="py-20 px-4 lg:px-8 bg-gradient-to-br from-primary-950/90 to-primary-900 text-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Connecting Global Tech Talent</h2>
          <p className="mt-4 text-primary-100 max-w-xl mx-auto">
            HireAt is building the bridge between exceptional tech talent and world-class companies across borders.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-white">{stat.value}</div>
              <div className="text-lg font-semibold text-primary-200 mt-1">{stat.label}</div>
              <p className="mt-2 text-sm text-primary-100">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
