import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/auth-context";
import { useLang } from "@/contexts/language-context";
import saperLogo from "@/assets/saper_logo.png";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, isSetup, login } = useAuth();
  const { lang, setLang, t } = useLang();
  const [, setLocation] = useLocation();

  if (!isSetup) {
    setLocation("/admin/setup");
    return null;
  }

  if (isAuthenticated) {
    setLocation("/admin/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError(t("Bitte Passwort eingeben", "Por favor, insira a senha"));
      return;
    }

    setLoading(true);
    try {
      const ok = await login(password);
      if (ok) {
        setLocation("/admin/dashboard");
      } else {
        setError(t("Passwort falsch", "Senha incorreta"));
      }
    } catch {
      setError(t("Fehler beim Anmelden", "Erro ao fazer login"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="bg-white/5 border border-white/10 rounded-md p-8 w-full max-w-sm">
        <div className="flex justify-end mb-4">
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
        </div>

        <div className="flex flex-col items-center mb-8">
          <img src={saperLogo} alt="SAPER" className="h-16 w-16 rounded-full object-cover border-2 border-accent shadow-md mb-4" />
          <h1 className="text-white text-2xl font-bold">Admin SAPER</h1>
          <p className="text-gray-400 text-sm mt-1">{t("Anmelden um zu verwalten", "Faça login para gerenciar")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">{t("Passwort", "Senha")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
              placeholder="••••"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-accent-foreground font-bold py-2.5 rounded-md hover:bg-white hover:text-primary transition-colors disabled:opacity-50"
          >
            {loading
              ? t("Wird angemeldet...", "Entrando...")
              : t("Einloggen", "Entrar")}
          </button>
        </form>
      </div>
    </div>
  );
}
