import { motion } from "framer-motion";
import saperLogo from "@/assets/saper_logo.png";
import { useLang } from "@/contexts/language-context";

export function Hero() {
  const { t } = useLang();

  return (
    <section className="relative min-h-[90vh] flex items-center bg-primary overflow-hidden pt-20">
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-accent inline-block" />
            <span className="text-accent text-xs font-bold tracking-widest uppercase">
              {t("Verein SAPER · Schweiz", "Associação SAPER · Suíça")}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif font-bold text-white leading-[1.08] mb-6">
            <span className="block text-4xl md:text-5xl lg:text-6xl">
              {t(
                "Suíça apoia projetos no Rio de Janeiro",
                "Suíça apoia projetos no Rio de Janeiro"
              )}
            </span>
          </h1>

          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-accent mb-6 leading-tight max-w-2xl">
            {t(
              "Gemeinsam für eine bessere Welt. (Juntos por um mundo melhor)",
              "Gemeinsam für eine bessere Welt in Rio de Janeiro."
            )}
          </h2>

          {/* Body */}
          <p className="text-gray-300 text-base md:text-lg mb-10 max-w-md leading-relaxed border-l-2 border-accent/50 pl-4">
            {t(
              "Verein SAPER sammelt in der Schweiz Mittel für soziale Projekte — für ältere Menschen, Kinder und soziale Wiedereingliederung in Rio de Janeiro.",
              "A Associação SAPER arrecada fundos na Suíça para projetos sociais voltados a idosos, crianças e reintegração social no Rio de Janeiro."
            )}
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#about"
              className="bg-accent text-accent-foreground px-8 py-3.5 rounded font-bold hover:bg-white hover:text-primary transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {t("Mehr erfahren", "Saber mais")}
            </a>
            <a
              href="#events"
              className="border border-white/30 text-white px-8 py-3.5 rounded font-bold hover:bg-white/10 transition-all"
            >
              {t("Nächstes Event", "Próximo Evento")}
            </a>
          </div>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-accent/20 blur-2xl scale-110" />
            <img
              src={saperLogo}
              alt="SAPER"
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-accent/40 shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
