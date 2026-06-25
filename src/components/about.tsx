import { motion } from "framer-motion";
import { FaHeart, FaBook, FaHandshake } from "react-icons/fa";
import { useLang } from "@/contexts/language-context";

export function About() {
  const { t } = useLang();

  return (
    <section className="py-20 bg-secondary" id="about">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-accent font-semibold tracking-wider uppercase mb-2">
              {t("Wer ist die SAPER?", "Quem é a SAPER?")}
            </h3>
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
              {t("Schweiz unterstützt Projekte im Rio de Janeiro", "A Suíça apoia projetos no Rio de Janeiro")}
            </h2>
            <div className="w-20 h-1 bg-accent rounded-full mb-8" />
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {t("SAPER ist ein gemeinnütziger Verein in der Schweiz, der sich für das Wohl der Bevölkerung in Rio de Janeiro einsetzt. Durch Benefizveranstaltungen sammeln wir Mittel, die direkt und vollständig in drei soziale Schwerpunkte fliessen.", "A SAPER é uma associação sem fins lucrativos na Suíça que se dedica ao bem-estar da população no Rio de Janeiro. Através de eventos beneficentes, arrecadamos recursos que vão direta e integralmente para três pilares sociais.")}
            </p>

            <div className="space-y-4 mb-10">
              <div className="bg-accent/10 rounded-xl p-4 border-l-4 border-accent flex items-start gap-4">
                <div className="mt-1 text-accent text-xl">
                  <FaHeart />
                </div>
                <div>
                  <h4 className="font-bold text-primary">
                    {t("Amparo a Idosos", "Apoio a Idosos")}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("Unterstützung und Begleitung älterer Menschen.", "Suporte e acompanhamento a pessoas idosas.")}
                  </p>
                </div>
              </div>

              <div className="bg-accent/10 rounded-xl p-4 border-l-4 border-accent flex items-start gap-4">
                <div className="mt-1 text-accent text-xl">
                  <FaBook />
                </div>
                <div>
                  <h4 className="font-bold text-primary">
                    {t("Bildung für Kinder & Jugend", "Educação Infantil e Juvenil")}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("Lernförderung und Schulunterstützung.", "Apoio escolar e incentivo ao aprendizado.")}
                  </p>
                </div>
              </div>

              <div className="bg-accent/10 rounded-xl p-4 border-l-4 border-accent flex items-start gap-4">
                <div className="mt-1 text-accent text-xl">
                  <FaHandshake />
                </div>
                <div>
                  <h4 className="font-bold text-primary">
                    {t("Soziale Wiedereingliederung", "Reintegração Social")}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("Begleitung auf dem Weg zurück in die Gesellschaft.", "Acompanhamento no caminho de volta à sociedade.")}
                  </p>
                </div>
              </div>
            </div>
            
            <button className="bg-primary text-primary-foreground px-8 py-4 rounded font-bold hover:bg-primary/90 transition-all shadow-md">
              {t("Mehr erfahren", "Saiba mais")}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1000&auto=format&fit=crop" 
                alt="Diverse hands clasped together in compassion" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
            
            {/* Decorative block */}
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent rounded-2xl -z-10" />
            <div className="absolute -top-10 -right-10 w-48 h-48 border-4 border-accent rounded-2xl -z-10 opacity-30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
