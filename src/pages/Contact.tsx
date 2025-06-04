
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-muted-foreground text-lg">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Input placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <Input type="email" placeholder="Email Address" />
                  </div>
                  <div className="space-y-2">
                    <Input placeholder="Subject" />
                  </div>
                  <div className="space-y-2">
                    <Textarea 
                      placeholder="Your Message" 
                      className="min-h-[150px]"
                    />
                  </div>
                  <Button className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Our Location</h3>
                      <p className="text-muted-foreground">
                        123 Tech Street, Silicon Valley
                        <br />
                        California, USA
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Email Us</h3>
                      <p className="text-muted-foreground">
                        support@hireat.com
                        <br />
                        careers@hireat.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Call Us</h3>
                      <p className="text-muted-foreground">
                        +1 (555) 123-4567
                        <br />
                        Mon - Fri, 9am - 6pm PST
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
