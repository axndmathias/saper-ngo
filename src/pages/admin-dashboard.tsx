import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/auth-context";
import { useLang } from "@/contexts/language-context";
import { FaHome, FaCalendarAlt, FaImages, FaHandsHelping, FaCommentDots, FaInfoCircle, FaEnvelope, FaCog, FaSignOutAlt, FaLock, FaCheckCircle } from "react-icons/fa";

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
  const { logout, isAuthenticated, changePassword } = useAuth();
  const { lang, setLang, t } = useLang();
  const [, setLocation] = useLocation();
  const [pwdCurrent, setPwdCurrent] = useState("");
  const [pwdNew, setPwdNew] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [pwdSuccess, setPwdSuccess] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);

  if (!isAuthenticated) {
    setLocation("/admin");
    return null;
  }

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError("");
    setPwdSuccess(false);

    if (!pwdCurrent || !pwdNew || !pwdConfirm) {
      setPwdError(t("Bitte alle Felder ausfüllen", "Preencha todos os campos"));
      return;
    }

    if (pwdNew.length < 4) {
      setPwdError(t("Neues Passwort muss mindestens 4 Zeichen lang sein", "Nova senha deve ter pelo menos 4 caracteres"));
      return;
    }

    if (pwdNew !== pwdConfirm) {
      setPwdError(t("Passwörter stimmen nicht überein", "As senhas não coincidem"));
      return;
    }

    setPwdLoading(true);
    try {
      const ok = await changePassword(pwdCurrent, pwdNew);
      if (ok) {
        setPwdSuccess(true);
        setPwdCurrent("");
        setPwdNew("");
        setPwdConfirm("");
      } else {
        setPwdError(t("Aktuelles Passwort ist falsch", "Senha atual está incorreta"));
      }
    } catch {
      setPwdError(t("Fehler beim Ändern des Passworts", "Erro ao alterar a senha"));
    } finally {
      setPwdLoading(false);
    }
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
                className="flex flex-col items-center gap-3 bg-white/5 border border-white/10 rounded-md p-6 hover:bg-white/10 hover:border-accent/50 transition-all text-center"
              >
                <Icon className="text-2xl text-accent" />
                <span className="text-white text-sm font-medium">
                  {lang === "de" ? comp.labelDe : comp.labelPt}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 max-w-md">
          <details className="group">
            <summary className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-white transition-colors text-sm font-medium list-none [&::-webkit-details-marker]:hidden">
              <FaLock className="text-xs" />
              <span>{t("Passwort ändern", "Alterar senha")}</span>
              <span className="ml-auto text-xs opacity-50 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <form onSubmit={handleChangePassword} className="mt-4 space-y-3">
              <input
                type="password"
                value={pwdCurrent}
                onChange={(e) => setPwdCurrent(e.target.value)}
                placeholder={t("Aktuelles Passwort", "Senha atual")}
                className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-accent/50"
              />
              <input
                type="password"
                value={pwdNew}
                onChange={(e) => setPwdNew(e.target.value)}
                placeholder={t("Neues Passwort", "Nova senha")}
                className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-accent/50"
              />
              <input
                type="password"
                value={pwdConfirm}
                onChange={(e) => setPwdConfirm(e.target.value)}
                placeholder={t("Neues Passwort bestätigen", "Confirmar nova senha")}
                className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-accent/50"
              />
              {pwdError && (
                <p className="text-red-400 text-xs">{pwdError}</p>
              )}
              {pwdSuccess && (
                <p className="text-green-400 text-xs flex items-center gap-1">
                  <FaCheckCircle /> {t("Passwort geändert", "Senha alterada")}
                </p>
              )}
              <button
                type="submit"
                disabled={pwdLoading}
                className="bg-accent/20 text-accent text-xs font-bold px-4 py-2 rounded-md hover:bg-accent/30 transition-colors disabled:opacity-50"
              >
                {pwdLoading
                  ? t("Wird geändert...", "Alterando...")
                  : t("Passwort ändern", "Alterar senha")}
              </button>
            </form>
          </details>
        </div>
      </div>
    </div>
  );
}
