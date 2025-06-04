
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    content: "HireAt helped me land a remote job at a US-based tech company while staying in Brazil. The platform was intuitive and the team provided great support throughout the hiring process.",
    author: "Mateus Silva",
    role: "Senior Developer",
    company: "TechGlobal Inc.",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg"
  },
  {
    content: "As a tech recruiter, HireAt has been invaluable in helping us find qualified candidates from Latin America. The quality of professionals on the platform is exceptional.",
    author: "Sarah Johnson",
    role: "Tech Recruiter",
    company: "Innovative Solutions",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg"
  },
  {
    content: "The international aspect of HireAt makes it unique. I was able to relocate from Spain to Germany thanks to the opportunities I found here. Their visa support was incredibly helpful.",
    author: "Carlos Mendez",
    role: "Frontend Developer",
    company: "Berlin Digital",
    avatar: "https://randomuser.me/api/portraits/men/35.jpg"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Success Stories</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Hear from professionals and companies who have found success through our platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="relative mb-6">
                  <svg className="absolute -top-2 -left-2 h-8 w-8 text-primary-300" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="relative text-base text-foreground">{testimonial.content}</p>
                </div>
                <div className="mt-auto flex items-center">
                  <div className="flex-shrink-0">
                    <img 
                      className="h-10 w-10 rounded-full"
                      src={testimonial.avatar} 
                      alt={testimonial.author}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{testimonial.author}</p>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
