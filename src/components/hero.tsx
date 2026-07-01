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
              {t(
                "Verein SAPER – A Suíça apoia projetos no Rio de Janeiro",
                "Associação SAPER – A Suíça apoia projetos no Rio de Janeiro"
              )}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif font-bold text-white leading-[1.08] mb-6">
            <span className="block text-4xl md:text-5xl lg:text-6xl">
              {t("Gemeinsam für", "Juntos por")}
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl">
              {t("eine bessere Welt", "um mundo melhor")}
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl text-accent mt-2">
              {t("in Rio de Janeiro.", "no Rio de Janeiro.")}
            </span>
          </h1>

          {/* Body */}
          <p className="text-gray-300 text-base md:text-lg mb-10 max-w-md leading-relaxed border-l-2 border-accent/50 pl-4">
            {t(
              "Verein SAPER sammelt in der Schweiz Mittel für soziale Projekte — für ältere Menschen, Kinder und soziale Wiedereingliederung in Rio de Janeiro.",
              "A Associação SAPER arrecada fundos na Suíça para projetos sociais — para idosos, crianças e reintegração social no Rio de Janeiro."
            )}
          </p>

          {/* CTA */}
          <div className="flex w-full max-w-md flex-nowrap gap-4">
            <a
              href="#about"
              className="flex h-14 min-w-0 flex-1 basis-0 items-center justify-center whitespace-nowrap rounded-md bg-accent px-4 text-center font-bold text-accent-foreground transition-all shadow-lg hover:-translate-y-0.5 hover:bg-white hover:text-primary sm:px-8"
            >
              {t("Mehr erfahren", "Saiba mais")}
            </a>
            <a
              href="#events"
              className="flex h-14 min-w-0 flex-1 basis-0 items-center justify-center whitespace-nowrap rounded-md border-2 border-white/30 px-4 text-center font-bold text-white transition-all hover:bg-white/10 sm:px-8"
            >
              {t("Nächstes Event", "Próximo evento")}
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
