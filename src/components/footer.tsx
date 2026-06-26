import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHandHoldingHeart, FaCheckCircle, FaCopy } from "react-icons/fa";
import saperLogo from "@/assets/saper_logo.png";
import { useLang } from "@/contexts/language-context";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
  const { t } = useLang();
  const { toast } = useToast();

  const handleCopyIBAN = () => {
    navigator.clipboard.writeText("CH00 0000 0000 0000 0000 0");
    toast({
      title: t("IBAN kopiert", "IBAN copiado"),
      description: "CH00 0000 0000 0000 0000 0"
    });
  };

  return (
    <footer className="bg-primary pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Donations & Transparency Row */}
        <div className="bg-white/5 rounded-2xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <h3 className="text-white text-2xl font-bold flex items-center gap-3">
                <FaHandHoldingHeart className="text-accent" />
                {t("Spenden & Transparenz", "Doações & Transparência")}
              </h3>
              <p className="text-green-400 text-sm flex items-center gap-2">
                <FaCheckCircle />
                {t(
                  "100% des Nettoerlöses fliesst direkt in die sozialen Projekte in Rio de Janeiro.",
                  "100% da arrecadação líquida vai diretamente para os projetos sociais no Rio de Janeiro."
                )}
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="bg-white/10 rounded-xl p-4 inline-flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-gray-300 text-sm font-medium">
                  {t("Spendenkonto (IBAN)", "Conta para doações (IBAN)")}:
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-accent">CH00 0000 0000 0000 0000 0</span>
                  <button 
                    onClick={handleCopyIBAN}
                    className="text-gray-400 hover:text-white transition-colors p-1"
                    title={t("Kopieren", "Copiar")}
                  >
                    <FaCopy />
                  </button>
                </div>
              </div>
              <p className="text-gray-400 text-sm italic">
                {t("Twint: QR-Code wird in Kürze verfügbar.", "Twint: QR-Code disponível em breve.")}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={saperLogo} alt="Saper" className="h-14 w-14 rounded-full object-cover border-2 border-accent shadow-md" />
              <span className="text-white text-3xl font-serif font-bold tracking-wide">Saper.</span>
            </div>
            <p className="text-gray-300 mb-8 max-w-sm leading-relaxed">
              {t(
                "SAPER ist ein gemeinnütziger Verein in der Schweiz, der sich für das Wohl der Bevölkerung in Rio de Janeiro einsetzt.",
                "A SAPER é uma associação sem fins lucrativos na Suíça que se dedica ao bem-estar da população no Rio de Janeiro."
              )}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-primary hover:bg-white transition-colors shadow-sm">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-primary hover:bg-white transition-colors shadow-sm">
                <FaTwitter />
              </a>
              <a 
                href="https://www.instagram.com/saperrj?igsh=dTkzODA4Z20wd3Vs" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-primary hover:bg-white transition-colors shadow-sm"
              >
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-primary hover:bg-white transition-colors shadow-sm">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-xl mb-6 relative inline-block">
              {t("Über uns", "Sobre nós")}
              <div className="absolute -bottom-2 left-0 w-10 h-1 bg-accent rounded-full" />
            </h4>
            <ul className="space-y-4">
              {[
                { de: 'Unsere Geschichte', pt: 'Nossa História' },
                { de: 'Vorstand', pt: 'Direção' },
                { de: 'Mitmachen', pt: 'Voluntariado' },
                { de: 'Jahresbericht', pt: 'Relatório Anual' },
                { de: 'Kontakt', pt: 'Contato' },
              ].map(link => (
                <li key={link.de}>
                  <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                    {t(link.de, link.pt)}
                  </a>
                </li>
              ))}
            </ul>
          </div>


          <div>
            <h4 className="text-white font-bold text-xl mb-6 relative inline-block">
              {t("Entdecken", "Explorar")}
              <div className="absolute -bottom-2 left-0 w-10 h-1 bg-accent rounded-full" />
            </h4>
            <ul className="space-y-4">
              {[t('Aktionen', 'Campanhas'), t('Mitmachen', 'Voluntariado'), t('Spenden', 'Doar'), t('Blog', 'Blog'), t('Events', 'Eventos')].map(link => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
        </div>

        {/* Impressum */}
        <div className="border-t border-white/10 pt-6 mt-6 mb-8 text-xs text-gray-500 space-y-1">
          <p className="font-bold text-white mb-2">Impressum</p>
          <p>Verein SAPER – A Suíça apoia projetos no Rio de Janeiro</p>
          <p>Adresse: [Amriswil, Thurgau, Schweiz]</p>
          <p>E-Mail: info@saper.ch</p>
          <p>UID: CHE-000.000.000</p>
          <p className="pt-2">
            <a href="#datenschutz" className="text-accent hover:underline">Datenschutzerklärung</a>
          </p>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>{t("© 2026 Verein SAPER. Alle Rechte vorbehalten.", "© 2026 Associação SAPER. Todos os direitos reservados.")}</p>
          <div className="flex gap-6">
            <a href="#datenschutz" className="hover:text-white transition-colors">{t("Datenschutz", "Privacidade")}</a>
            <a href="#" className="hover:text-white transition-colors">{t("Nutzungsbedingungen", "Termos de uso")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
