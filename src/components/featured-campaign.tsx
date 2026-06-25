import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/language-context";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function FeaturedCampaign() {
  const { t, lang } = useLang();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    consent: false,
  });

  const rolesDe = ["Küche & Gastronomie", "Kasse & Verwaltung", "Logistik & Aufbau", "Sonstiges"];
  const rolesPt = ["Cozinha & Gastronomia", "Caixa & Administração", "Logística & Montagem", "Outro"];
  const roles = lang === "pt" ? rolesPt : rolesDe;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;
    toast({
      title: t("Vielen Dank! Wir melden uns bald bei Ihnen.", "Obrigado! Entraremos em contacto em breve."),
    });
    setFormData({ name: "", email: "", phone: "", role: "", consent: false });
  };

  return (
    <section className="py-20 bg-primary text-white" id="volunteer">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
        >
          {/* Left — image */}
          <div className="md:w-1/2 relative h-[300px] md:h-auto">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"
              alt="Freiwilligenzentrale"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/30" />
            <div className="absolute top-6 left-6 bg-accent text-primary font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider shadow-lg">
              {t("Mitmachen", "Participe")}
            </div>
            <div className="absolute bottom-8 left-8 right-8">
              <h2 className="text-white text-3xl md:text-4xl font-bold font-serif drop-shadow-lg">
                {t("Freiwilligenzentrale", "Central de Voluntariado")}
              </h2>
              <p className="text-white/80 mt-2 text-sm leading-relaxed">
                {t(
                  "Helfen Sie uns bei unseren Veranstaltungen. Jede Unterstützung zählt!",
                  "Ajude-nos em nossos eventos. Cada apoio conta!"
                )}
              </p>
            </div>
          </div>

          {/* Right — volunteer form */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="vol-name" className="text-primary font-semibold">
                  {t("Vollständiger Name", "Nome completo")} *
                </Label>
                <Input
                  id="vol-name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="vol-email" className="text-primary font-semibold">
                  {t("E-Mail-Adresse", "Endereço de e-mail")} *
                </Label>
                <Input
                  id="vol-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="vol-phone" className="text-primary font-semibold">
                  {t("Telefon (optional)", "Telefone (opcional)")}
                </Label>
                <Input
                  id="vol-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-primary font-semibold">{t("Rolle", "Função")}</Label>
                <Select
                  value={formData.role}
                  onValueChange={(val) => setFormData({ ...formData, role: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("Wählen Sie eine Rolle...", "Selecione uma função...")} />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-start space-x-3 pt-1">
                <Checkbox
                  id="vol-consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => setFormData({ ...formData, consent: checked === true })}
                  className="mt-1"
                />
                <Label htmlFor="vol-consent" className="text-sm font-normal text-muted-foreground leading-snug">
                  {t(
                    "Ich stimme der Verarbeitung meiner Daten gemäss der Datenschutzerklärung zu.",
                    "Concordo com o tratamento dos meus dados conforme a política de privacidade."
                  )} *
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-6 text-lg font-bold"
                disabled={!formData.consent}
              >
                {t("Anmeldung senden", "Enviar inscrição")}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
