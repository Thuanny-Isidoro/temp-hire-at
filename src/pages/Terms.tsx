
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using HireAt's platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>You must be at least 18 years old to create an account</li>
                  <li>You are responsible for maintaining the security of your account</li>
                  <li>All information provided must be accurate and up-to-date</li>
                  <li>We reserve the right to terminate accounts that violate our terms</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">3. Platform Rules</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>Users agree not to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Submit false or misleading information</li>
                    <li>Violate any applicable laws or regulations</li>
                    <li>Interfere with platform security</li>
                    <li>Share account credentials</li>
                    <li>Engage in discriminatory practices</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
                <p className="text-muted-foreground">
                  The platform, including all content, features, and functionality, is owned by HireAt and protected by international copyright, trademark, and other intellectual property laws.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
