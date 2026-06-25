import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useLang } from "@/contexts/language-context";

export function Causes() {
  const { t } = useLang();

  const causes = [
    {
      title: t("Amparo a Idosos", "Unterstützung älterer Menschen"),
      description: t(
        "Suporte, acompanhamento e cuidado para pessoas idosas em situação de vulnerabilidade no Rio de Janeiro.",
        "Unterstützung, Begleitung und Fürsorge für ältere Menschen in schwierigen Situationen in Rio de Janeiro."
      ),
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ce122?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: t("Educação Infantil e Juvenil", "Bildung für Kinder & Jugend"),
      description: t(
        "Apoio escolar, materiais e incentivo ao aprendizado para crianças e jovens em comunidades carentes.",
        "Schulunterstützung, Materialien und Lernförderung für Kinder und Jugendliche in benachteiligten Gemeinschaften."
      ),
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: t("Reintegração Social", "Soziale Wiedereingliederung"),
      description: t(
        "Acompanhamento e suporte para pessoas em processo de reintegração à sociedade.",
        "Begleitung und Unterstützung für Menschen auf dem Weg zurück in die Gesellschaft."
      ),
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: t("Eventos Beneficentes", "Benefizveranstaltungen"),
      description: t(
        "Eventos culturais brasileiros na Suíça que arrecadam fundos diretamente para os projetos sociais.",
        "Brasilianische Kulturveranstaltungen in der Schweiz, die Mittel direkt für die sozialen Projekte sammeln."
      ),
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-background overflow-hidden" id="causes">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16">
          <h3 className="text-accent font-semibold tracking-wider uppercase mb-2">
            {t("Unsere Schwerpunkte", "Nossos Pilares")}
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold text-primary relative inline-block">
            {t("Wofür wir uns einsetzen", "Pelo que lutamos")}
            <div className="absolute -bottom-3 left-0 w-24 h-1 bg-accent rounded-full" />
          </h2>
        </div>
      </div>

      <div className="pl-4 md:pl-0">
        <div className="container mx-auto md:px-6">
          <div className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {causes.map((cause, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="min-w-[320px] md:min-w-[400px] w-[320px] md:w-[400px] snap-center bg-white rounded-2xl shadow-xl overflow-hidden group border border-border/40 shrink-0"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={cause.image} 
                    alt={cause.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/20" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    {cause.title}
                  </h3>
                  <p className="text-muted-foreground mb-8 line-clamp-2">
                    {cause.description}
                  </p>
                  <a
                    href="#donate"
                    className="w-full py-4 rounded bg-secondary text-primary font-bold hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center gap-2 group/btn"
                  >
                    {t("Jetzt spenden", "Doe agora")}
                    <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
