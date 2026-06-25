import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/language-context";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Volunteer() {
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

    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      consent: false,
    });
  };

  return (
    <section className="py-20 bg-background" id="volunteer">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h3 className="text-accent font-semibold tracking-wider uppercase mb-2">
            {t("Mitmachen", "Participe")}
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold text-primary font-serif mb-4">
            {t("Freiwilligenzentrale", "Central de Voluntariado")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("Helfen Sie uns bei unseren Veranstaltungen. Jede Unterstützung zählt!", "Ajude-nos em nossos eventos. Cada apoio conta!")}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">{t("Vollständiger Name", "Nome completo")} *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("E-Mail-Adresse", "Endereço de e-mail")} *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t("Telefon (optional)", "Telefone (opcional)")}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>{t("Rolle", "Função")}</Label>
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

              <div className="flex items-start space-x-3 pt-2">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => setFormData({ ...formData, consent: checked === true })}
                  required
                  className="mt-1"
                />
                <Label htmlFor="consent" className="text-sm font-normal text-muted-foreground leading-snug">
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
