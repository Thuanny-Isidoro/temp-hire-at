
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RegistrationWizard } from "@/components/registration/RegistrationWizard";
import { useTranslation } from "@/hooks/useTranslation";

const SignUp = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">{t("auth.createAccount")}</h1>
            <p className="text-muted-foreground">
              {t("auth.createAccountDescription")}
            </p>
          </div>
          
          <RegistrationWizard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
