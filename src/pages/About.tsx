
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

const About = () => {
  const { t } = useTranslation();
  
  const teamMembers = [
    {
      name: "Maria Rodriguez",
      role: "about.team.founderCEO",
      image: "https://randomuser.me/api/portraits/women/34.jpg",
      bio: "about.team.mariaBio"
    },
    {
      name: "David Chen",
      role: "about.team.cto",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      bio: "about.team.davidBio"
    },
    {
      name: "Sophie Klein",
      role: "about.team.headOperations",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "about.team.sophieBio"
    },
    {
      name: "Carlos Mendes",
      role: "about.team.headLatam",
      image: "https://randomuser.me/api/portraits/men/55.jpg",
      bio: "about.team.carlosBio"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary-50 to-white dark:from-primary-950 dark:to-background py-16">
          <div className="container mx-auto text-center max-w-3xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("about.mission.title")}</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              {t("about.mission.description")}
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-12 px-4 container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t("about.story.title")}</h2>
              <div className="space-y-4">
                <p>
                  {t("about.story.paragraph1")}
                </p>
                <p>
                  {t("about.story.paragraph2")}
                </p>
                <p>
                  {t("about.story.paragraph3")}
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-100 rounded-lg -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                alt={t("about.story.imageAlt")} 
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary-200 rounded-lg -z-10"></div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">{t("about.values.title")}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-t-4 border-t-primary-500">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">{t("about.values.opportunity.title")}</h3>
                  <p>
                    {t("about.values.opportunity.description")}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-t-4 border-t-primary-500">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">{t("about.values.culture.title")}</h3>
                  <p>
                    {t("about.values.culture.description")}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-t-4 border-t-primary-500">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">{t("about.values.transparency.title")}</h3>
                  <p>
                    {t("about.values.transparency.description")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 px-4 container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("about.team.title")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-primary mb-2">{t(member.role)}</p>
                  <p className="text-sm text-muted-foreground line-clamp-3">{t(member.bio)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-500 text-white py-12 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">{t("about.cta.title")}</h2>
            <p className="text-xl mb-8">
              {t("about.cta.description")}
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="min-w-[200px]"
            >
              {t("about.cta.button")}
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
