import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { FaBars, FaTimes, FaInstagram } from "react-icons/fa";
import saperLogo from "@/assets/saper_logo.png";
import { useLang } from "@/contexts/language-context";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("Startseite", "Início"), href: "/" },
    { name: t("Über uns", "Sobre nós"), href: "#about" },
    { name: t("Galerie", "Galeria"), href: "#gallery" },
    { name: t("Aktionen", "Causas"), href: "#causes" },
    { name: t("Geschichten", "Histórias"), href: "#testimonials" },
    { name: t("Events", "Eventos"), href: "#events" },
    { name: t("Kontakt", "Contato"), href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-primary shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <img src={saperLogo} alt="SAPER" className="h-12 w-12 rounded-full object-cover border-2 border-accent shadow-md" />
          <span className="text-white text-2xl font-serif font-bold tracking-wide">SAPER</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-white text-sm font-medium transition-colors hover:text-accent px-3 py-1 rounded-full hover:bg-white/10 ${
                (location === "/" && link.name === t("Startseite", "Início")) || location === link.href
                  ? "text-accent bg-white/10"
                  : ""
              }`}
            >
              {link.name}
            </a>
          ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang("pt")}
              className={`rounded-md px-2.5 py-1 text-xs font-bold transition-colors ${lang === "pt" ? "bg-accent text-accent-foreground" : "bg-transparent text-white hover:bg-white/10"}`}
            >
              PT
            </button>
            <button
              onClick={() => setLang("de")}
              className={`rounded-md px-2.5 py-1 text-xs font-bold transition-colors ${lang === "de" ? "bg-accent text-accent-foreground" : "bg-transparent text-white hover:bg-white/10"}`}
            >
              DE
            </button>
          </div>

          <a 
            href="https://www.instagram.com/saperrj?igsh=dTkzODA4Z20wd3Vs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-accent hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] transition-all text-xl"
          >
            <FaInstagram />
          </a>

          <a
            href="#donate"
            className="bg-accent text-accent-foreground px-6 py-2 rounded-md font-bold text-sm hover:bg-white hover:text-primary transition-colors"
          >
            {t("Jetzt Spenden", "Doe Agora")}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-primary flex flex-col items-center py-6 shadow-xl gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white text-lg font-medium hover:text-accent"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}

          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={() => setLang("pt")}
              className={`rounded-md px-3 py-1 text-sm font-bold transition-colors ${lang === "pt" ? "bg-accent text-accent-foreground" : "bg-transparent text-white hover:bg-white/10"}`}
            >
              PT
            </button>
            <button
              onClick={() => setLang("de")}
              className={`rounded-md px-3 py-1 text-sm font-bold transition-colors ${lang === "de" ? "bg-accent text-accent-foreground" : "bg-transparent text-white hover:bg-white/10"}`}
            >
              DE
            </button>
          </div>

          <a 
            href="https://www.instagram.com/saperrj?igsh=dTkzODA4Z20wd3Vs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-accent transition-all text-2xl mt-2"
          >
            <FaInstagram />
          </a>

          <a
            href="#donate"
            className="bg-accent text-accent-foreground px-8 py-3 rounded-md font-bold hover:bg-white hover:text-primary transition-colors mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("Jetzt Spenden", "Doe Agora")}
          </a>
        </div>
      )}
    </nav>
  );
}
