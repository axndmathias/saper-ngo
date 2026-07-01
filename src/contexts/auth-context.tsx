import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

const STORAGE_KEY_HASH = "saper-admin-hash";
const STORAGE_KEY_AUTH = "saper-admin-auth";
const SALT = "saper-admin-2026";

interface AuthContextType {
  isAuthenticated: boolean;
  isSetup: boolean;
  login: (password: string) => Promise<boolean>;
  setup: (password: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isSetup: false,
  login: async () => false,
  setup: async () => {},
  changePassword: async () => false,
  logout: () => {},
});

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + SALT);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSetup, setIsSetup] = useState(false);

  useEffect(() => {
    const hash = localStorage.getItem(STORAGE_KEY_HASH);
    setIsSetup(!!hash);
    const stored = localStorage.getItem(STORAGE_KEY_AUTH);
    if (stored === "true" && hash) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = useCallback(async (password: string): Promise<boolean> => {
    const storedHash = localStorage.getItem(STORAGE_KEY_HASH);
    if (!storedHash) return false;
    const enteredHash = await hashPassword(password);
    if (enteredHash === storedHash) {
      localStorage.setItem(STORAGE_KEY_AUTH, "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const setup = useCallback(async (password: string) => {
    const hash = await hashPassword(password);
    localStorage.setItem(STORAGE_KEY_HASH, hash);
    localStorage.setItem(STORAGE_KEY_AUTH, "true");
    setIsSetup(true);
    setIsAuthenticated(true);
  }, []);

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string): Promise<boolean> => {
      const storedHash = localStorage.getItem(STORAGE_KEY_HASH);
      if (!storedHash) return false;
      const currentHash = await hashPassword(currentPassword);
      if (currentHash !== storedHash) return false;
      const newHash = await hashPassword(newPassword);
      localStorage.setItem(STORAGE_KEY_HASH, newHash);
      return true;
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY_AUTH);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isSetup, login, setup, changePassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
