import { motion } from "framer-motion";
import { FaQuoteRight } from "react-icons/fa";
import { useLang } from "@/contexts/language-context";

export function Testimonials() {
  const { t } = useLang();

  const testimonials = [
    {
      name: "Markus B.",
      location: t("Amriswil, Schweiz", "Amriswil, Suíça"),
      quote: t(
        "Das SAPER-Fest war ein unvergessliches Erlebnis. Man spürt, dass jeder Franken wirklich bei den Menschen in Rio ankommt.",
        "A festa da SAPER foi uma experiência inesquecível. Sente-se que cada franco realmente chega às pessoas no Rio."
      ),
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Carla M.",
      location: t("Frauenfeld, Schweiz", "Frauenfeld, Suíça"),
      quote: t(
        "Als Freiwillige beim letzten Event war ich tief berührt von der Energie und dem Engagement aller Beteiligten.",
        "Como voluntária no último evento, fiquei profundamente tocada pela energia e o empenho de todos os envolvidos."
      ),
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "João P.",
      location: t("Rio de Janeiro, Brasilien", "Rio de Janeiro, Brasil"),
      quote: t(
        "Die Unterstützung von SAPER hat unserem Zentrum ermöglicht, viele weitere Kinder zu begleiten. Ein grosses Dankeschön aus Rio!",
        "O apoio da SAPER permitiu ao nosso centro acompanhar muitas outras crianças. Um grande obrigado do Rio!"
      ),
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-primary relative overflow-hidden" id="testimonials">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-accent font-semibold tracking-wider uppercase mb-2">
            {t("Stimmen", "Depoimentos")}
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold text-white relative inline-block font-serif">
            {t("Was unsere Gemeinschaft sagt", "O que a nossa comunidade diz")}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-accent rounded-full" />
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-md relative"
            >
              <FaQuoteRight className="text-4xl text-accent/50 absolute top-8 right-8" />
              <p className="text-gray-200 text-lg leading-relaxed mb-8 relative z-10">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-accent"
                />
                <div>
                  <h4 className="text-white font-bold text-lg">{item.name}</h4>
                  <p className="text-accent text-sm">{item.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
