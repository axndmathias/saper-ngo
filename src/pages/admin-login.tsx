import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/auth-context";
import saperLogo from "@/assets/saper_logo.png";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  if (isAuthenticated) {
    setLocation("/admin/dashboard");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Preencha todos os campos");
      return;
    }

    if (login(username, password)) {
      setLocation("/admin/dashboard");
    } else {
      setError("Usuário ou senha incorretos");
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <img src={saperLogo} alt="SAPER" className="h-16 w-16 rounded-full object-cover border-2 border-accent shadow-md mb-4" />
          <h1 className="text-white text-2xl font-bold">Admin SAPER</h1>
          <p className="text-gray-400 text-sm mt-1">Faça login para gerenciar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
              placeholder="••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-accent text-accent-foreground font-bold py-2.5 rounded-lg hover:bg-white hover:text-primary transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
