import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/language-context";
import { useGalleryData } from "@/hooks/use-gallery-data";

const INITIAL_VISIBLE = 6;

export function Gallery() {
  const { t, lang } = useLang();
  const { items } = useGalleryData();
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? items : items.slice(0, INITIAL_VISIBLE);
  const hasMore = items.length > INITIAL_VISIBLE;

  return (
    <section className="py-20 bg-background" id="gallery">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h3 className="text-accent font-semibold tracking-wider uppercase mb-2">
            {t("Unsere Galerie", "Nossa Galeria")}
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold text-primary relative inline-block">
            {t("Ein Blick auf SAPER", "Um vislumbre da SAPER")}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-accent rounded-full" />
          </h2>
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {displayed.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative rounded-xl overflow-hidden group break-inside-avoid shadow-sm hover:shadow-xl transition-shadow"
            >
              <img 
                src={item.src} 
                alt={lang === "de" ? item.altDe : item.altPt}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-bold tracking-wider uppercase border-2 border-white px-4 py-2 rounded">
                  {t("Ansehen", "Ver")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="bg-transparent border-2 border-primary text-primary px-8 py-3 rounded font-bold hover:bg-primary hover:text-primary-foreground transition-colors uppercase tracking-wider"
            >
              {showAll ? t("Weniger anzeigen", "Ver Menos") : t("Mehr anzeigen", "Ver Mais")}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
