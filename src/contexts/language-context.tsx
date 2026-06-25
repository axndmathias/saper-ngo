import { createContext, useContext, useState, useEffect } from "react";

type Lang = "de" | "pt";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (de: string, pt: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "de",
  setLang: () => {},
  t: (de) => de,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem("saper-lang");
    return (stored === "pt" || stored === "de") ? stored : "de";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("saper-lang", l);
  };

  const t = (de: string, pt: string) => lang === "pt" ? pt : de;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
