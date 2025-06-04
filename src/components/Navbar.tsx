import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Globe, Sun, Moon, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/components/theme-provider";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import NavbarLogo from "./NavbarLogo";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { currentLanguage, setLanguage, languages } = useLanguage();
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simple auth state check: user is logged in if any localStorage key has a valid email
  useEffect(() => {
    const userKeys = Object.keys(localStorage);
    const loggedIn = userKeys.some((key) => key.includes('@') && localStorage.getItem(key));
    setIsLoggedIn(loggedIn);
  }, [location.pathname]);
  

  const handleSignOut = () => {
    // Clear all user data from localStorage
    Object.keys(localStorage).forEach(k => {
      if (k.includes('@')) localStorage.removeItem(k);
    });
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <NavbarLogo />
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 text-transparent bg-clip-text">
              {t("app.name")}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/jobs" 
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/jobs') ? 'text-primary' : ''}`}
          >
            {t("nav.jobs")}
          </Link>
          <Link 
            to="/candidates" 
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/candidates') ? 'text-primary' : ''}`}
          >
            {t("nav.candidates")}
          </Link>
          <Link 
            to="/companies" 
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/companies') ? 'text-primary' : ''}`}
          >
            {t("nav.companies")}
          </Link>
          <Link 
            to="/about" 
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/about') ? 'text-primary' : ''}`}
          >
            {t("nav.about")}
          </Link>
          <a 
            href="https://discord.com/channels/1119885301872070706/1280461670979993613"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t("nav.discord")}
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                <Globe className="h-4 w-4" />
                <span>{currentLanguage.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.code}
                  onClick={() => setLanguage(lang)}
                  className={lang.code === currentLanguage.code ? "bg-primary/10" : ""}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {!isLoggedIn ? (
            <>
              <Button variant="outline" asChild>
                <a href="https://www.seventechnologies.cloud/talent/login">{t("auth.signIn")}</a>
              </Button>
              <Button asChild>
                <Link to="/register">{t("auth.signUp")}</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/profile">
                  <User className="h-5 w-5 mr-2" />
                  {t("nav.profile")}
                </Link>
              </Button>
              <Button variant="destructive" onClick={handleSignOut}>
                <LogOut className="h-5 w-5 mr-2" />
                {t("auth.signOut")}
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link 
                to="/jobs" 
                className={`text-lg font-medium transition-colors hover:text-primary ${isActive('/jobs') ? 'text-primary' : ''}`}
              >
                {t("nav.jobs")}
              </Link>
              <Link 
                to="/candidates" 
                className={`text-lg font-medium transition-colors hover:text-primary ${isActive('/candidates') ? 'text-primary' : ''}`}
              >
                {t("nav.candidates")}
              </Link>
              <Link 
                to="/companies" 
                className={`text-lg font-medium transition-colors hover:text-primary ${isActive('/companies') ? 'text-primary' : ''}`}
              >
                {t("nav.companies")}
              </Link>
              <Link 
                to="/about" 
                className={`text-lg font-medium transition-colors hover:text-primary ${isActive('/about') ? 'text-primary' : ''}`}
              >
                {t("nav.about")}
              </Link>
              <a 
                href="https://discord.com/channels/1119885301872070706/1280461670979993613"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium transition-colors hover:text-primary"
              >
                {t("nav.discord")}
              </a>
              
              <div className="flex flex-col gap-2 pt-4 border-t mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t('nav.language')}</span>
                  <select 
                    value={currentLanguage.code}
                    onChange={(e) => {
                      const langCode = e.target.value;
                      const selectedLang = languages.find(l => l.code === langCode);
                      if (selectedLang) setLanguage(selectedLang);
                    }}
                    className="bg-background border rounded px-2 py-1 text-sm"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t('nav.theme')}</span>
                  <Button variant="ghost" size="sm" onClick={toggleTheme}>
                    {theme === "dark" ? (
                      <Sun className="h-4 w-4 mr-2" />
                    ) : (
                      <Moon className="h-4 w-4 mr-2" />
                    )}
                    {theme === "dark" ? t('nav.lightMode') : t('nav.darkMode')}
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 pt-4 border-t mt-4">
                {!isLoggedIn ? (
                  <>
                    <Button variant="outline" asChild>
                      <a href="https://www.seventechnologies.cloud/talent/login">{t("auth.signIn")}</a>
                    </Button>
                    <Button asChild>
                      <Link to="/register">{t("auth.signUp")}</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" asChild>
                      <Link to="/profile">
                        <User className="h-5 w-5 mr-2" />
                        {t("nav.profile")}
                      </Link>
                    </Button>
                    <Button variant="destructive" onClick={handleSignOut}>
                      <LogOut className="h-5 w-5 mr-2" />
                      {t("auth.signOut")}
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
