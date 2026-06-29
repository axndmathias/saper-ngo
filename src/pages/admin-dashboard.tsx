import { useLocation } from "wouter";
import { useAuth } from "@/contexts/auth-context";
import { useLang } from "@/contexts/language-context";
import { FaHome, FaCalendarAlt, FaImages, FaHandsHelping, FaCommentDots, FaInfoCircle, FaEnvelope, FaCog, FaSignOutAlt } from "react-icons/fa";

interface ComponentItem {
  id: string;
  labelDe: string;
  labelPt: string;
  icon: React.ComponentType;
}

const components: ComponentItem[] = [
  { id: "hero", labelDe: "Hero", labelPt: "Hero", icon: FaHome },
  { id: "events", labelDe: "Events", labelPt: "Eventos", icon: FaCalendarAlt },
  { id: "gallery", labelDe: "Galerie", labelPt: "Galeria", icon: FaImages },
  { id: "causes", labelDe: "Aktionen", labelPt: "Causas", icon: FaHandsHelping },
  { id: "testimonials", labelDe: "Geschichten", labelPt: "Depoimentos", icon: FaCommentDots },
  { id: "about", labelDe: "Über uns", labelPt: "Sobre", icon: FaInfoCircle },
  { id: "newsletter", labelDe: "Newsletter", labelPt: "Newsletter", icon: FaEnvelope },
  { id: "footer", labelDe: "Fußzeile", labelPt: "Rodapé", icon: FaCog },
];

export default function AdminDashboard() {
  const { logout, isAuthenticated } = useAuth();
  const { lang, setLang, t } = useLang();
  const [, setLocation] = useLocation();

  if (!isAuthenticated) {
    setLocation("/admin");
    return null;
  }

  const handleLogout = () => {
    logout();
    setLocation("/admin");
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <h1 className="text-white text-xl font-bold">Admin SAPER</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
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
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <FaSignOutAlt />
              {t("Abmelden", "Sair")}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10">
        <p className="text-gray-400 mb-8">{t("Wähle eine Komponente zum Verwalten:", "Escolha um componente para gerenciar:")}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {components.map((comp) => {
            const Icon = comp.icon;
            return (
              <button
                key={comp.id}
                onClick={() => comp.id === "gallery" && setLocation("/admin/gallery")}
                className="flex flex-col items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-accent/50 transition-all text-center"
              >
                <Icon className="text-2xl text-accent" />
                <span className="text-white text-sm font-medium">
                  {lang === "de" ? comp.labelDe : comp.labelPt}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
