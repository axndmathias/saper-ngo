import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { useLang } from "@/contexts/language-context";

export function Events() {
  const { t, lang } = useLang();

  const eventData = {
    id: 1,
    active: true,
    date: "05.09.2026",
    time: "13:00 - 19:00",
    location_name: "Radolfzellerpark, Amriswil (TG)",
    google_maps_url: "https://maps.app.goo.gl/Ym9b9S8P2Vz4wVp8A",
    highlights: {
      de: "Brasilianische Gastronomie, Live-Musik und Kultur.",
      pt: "Gastronomia brasileira, música ao vivo e cultura."
    }
  };

  return (
    <section className="py-20 bg-secondary" id="events">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h3 className="text-accent font-semibold tracking-wider uppercase mb-2">
            {t("Kommende Veranstaltungen", "Próximos Eventos")}
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold text-primary font-serif relative inline-block">
            {t("Nächste Events", "Próximos Eventos")}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-accent rounded-full" />
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-md overflow-hidden shadow-2xl flex flex-col md:flex-row"
        >
          {/* Left — image */}
          <div className="md:w-1/2 relative h-[280px] md:h-auto">
            <img
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop"
              alt="SAPER Event"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/30" />
            <div className="absolute top-6 left-6">
              <span className="bg-accent text-accent-foreground font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider shadow-lg">
                SAPER 2026
              </span>
            </div>
          </div>

          {/* Right — event details */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="space-y-5 mb-8">
              <div className="flex items-center gap-4 text-primary">
                <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                  <FaCalendarAlt className="text-accent text-lg" />
                </div>
                <span className="text-lg font-semibold">{eventData.date}</span>
              </div>
              <div className="flex items-center gap-4 text-primary">
                <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-accent text-lg" />
                </div>
                <span className="text-lg font-semibold">{eventData.time}</span>
              </div>
              <div className="flex items-center gap-4 text-primary">
                <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-accent text-lg" />
                </div>
                <span className="text-lg font-semibold">{eventData.location_name}</span>
              </div>
            </div>

            <p className="italic text-muted-foreground mb-8 border-l-4 border-accent pl-4 leading-relaxed">
              "{eventData.highlights[lang]}"
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={eventData.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex h-14 items-center justify-center bg-accent text-accent-foreground px-4 sm:px-8 rounded-md font-bold text-center whitespace-nowrap hover:bg-accent/90 transition-colors"
              >
                Google Maps
              </a>
              <a
                href="#volunteer"
                className="flex-1 flex h-14 items-center justify-center bg-transparent border-2 border-primary text-primary px-4 sm:px-8 rounded-md font-bold text-center whitespace-nowrap hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {t("Ich komme!", "Vou participar!")}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
