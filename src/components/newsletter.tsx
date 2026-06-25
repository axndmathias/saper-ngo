import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import { useLang } from "@/contexts/language-context";

export function Newsletter() {
  const { t } = useLang();

  return (
    <section className="py-20 bg-accent relative overflow-hidden" id="contact">
      <div className="absolute top-0 right-0 opacity-10">
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M44.7,-76.4C58.5,-69.2,70.7,-57.4,80.1,-43.3C89.5,-29.2,96.1,-12.8,93.4,2.2C90.8,17.2,78.8,30.8,68.2,43.2C57.6,55.5,48.4,66.8,36.1,74.5C23.9,82.2,8.6,86.4,-6.2,88.1C-21,89.8,-35.3,89.1,-48.2,83C-61.1,76.9,-72.5,65.4,-81.4,51.8C-90.3,38.2,-96.7,22.4,-97.6,6.3C-98.5,-9.7,-93.8,-26.1,-84.9,-40C-76,-53.8,-62.8,-65.2,-48.4,-72.2C-34,-79.2,-18.4,-81.8,-1.7,-79.3C15.1,-76.8,30.9,-83.6,44.7,-76.4Z" transform="translate(100 100) scale(1.1)" fill="#000" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-primary rounded-3xl p-8 md:p-16 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-serif">
              {t("Bleiben Sie auf dem Laufenden", "Fique por dentro")}
            </h2>
            <p className="text-gray-300 text-lg">
              {t(
                "Abonnieren Sie unseren Newsletter und erhalten Sie aktuelle Infos zu unseren Events, Projekten und Aktionen.",
                "Subscreva a nossa newsletter e receba atualizações sobre os nossos eventos, projetos e campanhas."
              )}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2 w-full"
          >
            <form className="flex flex-col sm:flex-row gap-4 w-full" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={t("Ihre E-Mail-Adresse...", "O seu endereço de e-mail...")}
                className="flex-grow px-6 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-primary font-medium"
                required
              />
              <button 
                type="submit"
                className="bg-accent text-primary px-8 py-4 rounded-md font-bold hover:bg-white transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-lg hover:shadow-xl"
              >
                {t("Anmelden", "Inscrever-se")} <FaPaperPlane />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
