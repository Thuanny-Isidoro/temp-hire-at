
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

const Footer = () => {
  const { currentLanguage, setLanguage, languages } = useLanguage();
  const { t } = useTranslation();
  
  return (
    <footer className="bg-muted py-12 px-4 lg:px-8 border-t">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 text-transparent bg-clip-text">
                {t("app.name")}
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              {t("app.tagline")}
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-base mb-4">{t("footer.forJobSeekers")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.jobs")}
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("auth.createAccount")}
                </Link>
              </li>
              <li>
                <Link to="/remote-jobs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.remoteJobs")}
                </Link>
              </li>
              <li>
                <Link to="/relocation" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.relocationOpportunities")}
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.careerResources")}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-base mb-4">{t("footer.company")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.termsOfService")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {t("footer.copyright", { year: new Date().getFullYear(), appName: t("app.name") })}
          </p>
          <div className="mt-4 md:mt-0 flex items-center">
            <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
            <select 
              className="text-sm bg-transparent border-none focus:ring-0"
              value={currentLanguage.code}
              onChange={(e) => {
                const langCode = e.target.value;
                const selectedLang = languages.find(l => l.code === langCode);
                if (selectedLang) setLanguage(selectedLang);
              }}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
