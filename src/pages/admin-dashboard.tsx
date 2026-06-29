import { useLocation } from "wouter";
import { useAuth } from "@/contexts/auth-context";
import { FaHome, FaCalendarAlt, FaImages, FaHandsHelping, FaCommentDots, FaInfoCircle, FaEnvelope, FaCog, FaSignOutAlt } from "react-icons/fa";

const components = [
  { id: "hero", label: "Hero", icon: FaHome },
  { id: "events", label: "Eventos", icon: FaCalendarAlt },
  { id: "gallery", label: "Galeria", icon: FaImages },
  { id: "causes", label: "Causas", icon: FaHandsHelping },
  { id: "testimonials", label: "Depoimentos", icon: FaCommentDots },
  { id: "about", label: "Sobre", icon: FaInfoCircle },
  { id: "newsletter", label: "Newsletter", icon: FaEnvelope },
  { id: "footer", label: "Rodapé", icon: FaCog },
];

export default function AdminDashboard() {
  const { logout, isAuthenticated } = useAuth();
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
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <FaSignOutAlt />
            Sair
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10">
        <p className="text-gray-400 mb-8">Escolha um componente para gerenciar:</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {components.map((comp) => {
            const Icon = comp.icon;
            return (
              <button
                key={comp.id}
                className="flex flex-col items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-accent/50 transition-all text-center"
              >
                <Icon className="text-2xl text-accent" />
                <span className="text-white text-sm font-medium">{comp.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
