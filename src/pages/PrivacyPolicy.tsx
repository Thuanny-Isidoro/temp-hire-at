
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <p className="text-muted-foreground mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Name and contact information</li>
                  <li>Professional experience and education</li>
                  <li>Skills and certifications</li>
                  <li>Portfolio and work samples</li>
                  <li>Communication preferences</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Create and maintain your account</li>
                  <li>Match you with relevant job opportunities</li>
                  <li>Improve our services and user experience</li>
                  <li>Communicate with you about our services</li>
                  <li>Ensure platform security and prevent fraud</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
                <p className="text-muted-foreground">
                  We do not sell your personal information to third parties. We may share your information with:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
                  <li>Service providers who assist in operating our platform</li>
                  <li>Potential employers when you apply for jobs</li>
                  <li>Law enforcement when required by law</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
