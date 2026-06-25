import { motion } from "framer-motion";
import { useLang } from "@/contexts/language-context";

export function Gallery() {
  const { t } = useLang();
  
  const images = [
    "https://images.unsplash.com/photo-1532938911079-1b06ac7ce122?q=80&w=800&auto=format&fit=crop", // Social
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop", // Community
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop", // Nature
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop", // Hands
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop", // Children
    "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=800&auto=format&fit=crop", // Learning
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop", // Team
  ];

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
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative rounded-xl overflow-hidden group break-inside-avoid shadow-sm hover:shadow-xl transition-shadow"
            >
              <img 
                src={img} 
                alt={`Gallery image ${idx + 1}`} 
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

        <div className="mt-16 text-center">
          <button className="bg-transparent border-2 border-primary text-primary px-8 py-3 rounded font-bold hover:bg-primary hover:text-primary-foreground transition-colors uppercase tracking-wider">
            {t("Mehr anzeigen", "Ver Mais")}
          </button>
        </div>

      </div>
    </section>
  );
}
