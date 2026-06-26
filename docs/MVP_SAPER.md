# Escopo Tecnico do MVP da SAPER / Technischer MVP-Umfang der SAPER

## 1. Objetivo tecnico / Technisches Ziel
* **PT-BR:** Este documento descreve a implementacao real da landing page publicada da SAPER. O foco e registrar a estrutura do codigo, os componentes, o fluxo de dados local e o comportamento visual já em producao.
* **DE-CH:** Dieses Dokument beschreibt die reale Implementierung der publizierten SAPER-Landingpage. Der Fokus liegt auf Code-Struktur, Komponenten, lokalem Datenfluss und dem bereits produktiven visuellen Verhalten.

## 2. Stack e runtime / Stack und Runtime
* **PT-BR:** A aplicacao usa React, TypeScript, Vite, Tailwind CSS, `framer-motion`, `react-icons`, `wouter` e `@tanstack/react-query`.
* **DE-CH:** Die Anwendung nutzt React, TypeScript, Vite, Tailwind CSS, `framer-motion`, `react-icons`, `wouter` und `@tanstack/react-query`.

* **PT-BR:** O app roda como SPA em hospedagem estatica, com base configurada por `import.meta.env.BASE_URL`.
* **DE-CH:** Die App laeuft als SPA auf statischem Hosting mit einer Base-URL aus `import.meta.env.BASE_URL`.

## 3. Estrutura de execucao / Laufzeitstruktur
### 3.1 Inicializacao
* **PT-BR:** `main.tsx` monta `App` no elemento `#root`.
* **DE-CH:** `main.tsx` mountet `App` auf dem Element `#root`.

* **PT-BR:** `App.tsx` envolve a aplicacao com `QueryClientProvider`, `LanguageProvider`, `TooltipProvider`, `WouterRouter` e `Toaster`.
* **DE-CH:** `App.tsx` umschliesst die Anwendung mit `QueryClientProvider`, `LanguageProvider`, `TooltipProvider`, `WouterRouter` und `Toaster`.

### 3.2 Rotas
* **PT-BR:** Existe rota publica para `/` e fallback para `NotFound`.
* **DE-CH:** Es gibt eine oeffentliche Route fuer `/` und einen Fallback auf `NotFound`.

### 3.3 Base visual
* **PT-BR:** O layout global usa tokens de tema em `src/index.css`, com tipografia definida por `Inter`, `Playfair Display` e `Caveat`.
* **DE-CH:** Das globale Layout nutzt Design-Tokens in `src/index.css` und Typografie mit `Inter`, `Playfair Display` und `Caveat`.

## 4. Arquitetura de componentes / Komponentenarchitektur
### 4.1 Pagina principal
`src/pages/home.tsx` renderiza a ordem fixa:
1. `Navbar`
2. `Hero`
3. `Events`
4. `About`
5. `Causes`
6. `FeaturedCampaign`
7. `Gallery`
8. `Testimonials`
9. `Newsletter`
10. `Footer`

### 4.2 Responsabilidade de cada componente
* **Navbar:** navegação, idioma, Instagram e CTA.
* **Hero:** mensagem principal e chamada inicial.
* **Events:** bloco de evento fixo com data, local e CTA.
* **About:** apresentacao institucional e tres pilares.
* **Causes:** cards horizontais com quatro areas de impacto.
* **FeaturedCampaign:** formulario de voluntariado.
* **Gallery:** mosaico visual responsivo.
* **Testimonials:** prova social em cards.
* **Newsletter:** CTA simples de contato.
* **Footer:** doacao, links institucionais e legal.

## 5. Comportamentos implementados / Implementierte Verhaltensweisen
### 5.1 Idioma
* **PT-BR:** O idioma e controlado por `src/contexts/language-context.tsx`.
* **DE-CH:** Die Sprache wird ueber `src/contexts/language-context.tsx` gesteuert.

* **PT-BR:** O idioma selecionado e salvo em `localStorage` na chave `saper-lang`.
* **DE-CH:** Die gewaehlte Sprache wird in `localStorage` unter dem Key `saper-lang` gespeichert.

* **PT-BR:** A funcao `t(de, pt)` retorna o texto correto conforme o idioma atual.
* **DE-CH:** Die Funktion `t(de, pt)` liefert den Text gemaess aktueller Sprache.

### 5.2 Navegacao e scroll
* **PT-BR:** O `Navbar` muda de aparencia quando o usuario rola a pagina.
* **DE-CH:** Die `Navbar` aendert ihr Aussehen beim Scrollen.

* **PT-BR:** O menu mobile abre e fecha localmente, sem dependencias externas.
* **DE-CH:** Das Mobile-Menue oeffnet und schliesst lokal ohne externe Abhaengigkeiten.

### 5.3 Formulario de voluntariado
* **PT-BR:** `FeaturedCampaign` e o ponto principal de captura de voluntarios.
* **DE-CH:** `FeaturedCampaign` ist der Hauptpunkt zur Erfassung von Freiwilligen.

* **PT-BR:** Campos: nome, e-mail, telefone, funcao e consentimento.
* **DE-CH:** Felder: Name, E-Mail, Telefon, Rolle und Einwilligung.

* **PT-BR:** O envio depende do consentimento estar marcado.
* **DE-CH:** Das Absenden haengt davon ab, dass die Einwilligung gesetzt ist.

* **PT-BR:** O envio mostra toast de sucesso e reseta o estado local do formulario.
* **DE-CH:** Beim Absenden erscheint ein Success-Toast und der lokale Formularzustand wird zurueckgesetzt.

### 5.4 Doacao
* **PT-BR:** O rodape exibe a IBAN e permite copiar o valor para a area de transferencia.
* **DE-CH:** Der Footer zeigt die IBAN und erlaubt das Kopieren in die Zwischenablage.

* **PT-BR:** A acao de copiar usa `navigator.clipboard.writeText`.
* **DE-CH:** Die Kopieraktion nutzt `navigator.clipboard.writeText`.

### 5.5 Conteudo visual
* **PT-BR:** As imagens da pagina sao majoritariamente externas e otimizadas via URLs publicas.
* **DE-CH:** Die Bilder der Seite sind groesstenteils extern und ueber oeffentliche URLs eingebunden.

* **PT-BR:** Os blocos usam `motion` para animacoes de entrada e hover.
* **DE-CH:** Die Bloecke verwenden `motion` fuer Einblend- und Hover-Animationen.

## 6. Fonte de dados / Datenquelle
* **PT-BR:** O site nao depende de backend para o conteudo atual.
* **DE-CH:** Die Website haengt fuer den aktuellen Inhalt nicht von einem Backend ab.

* **PT-BR:** Evento, pilares, depoimentos, roles do formulario e galerias estao codificados diretamente nos componentes.
* **DE-CH:** Event, Schwerpunkte, Testimonials, Formular-Rollen und Galerie sind direkt in den Komponenten codiert.

* **PT-BR:** Isso deixa o deploy simples, mas exige edicao de codigo para atualizar conteudo.
* **DE-CH:** Das macht das Deployment einfach, erfordert aber Codeaenderungen fuer Inhaltsupdates.

## 7. Componentes por arquivo / Komponenten nach Datei
| Arquivo | Funcao |
| :--- | :--- |
| `src/components/navbar.tsx` | Navegacao fixa, idioma, Instagram e CTA |
| `src/components/hero.tsx` | Hero principal com imagem e chamadas iniciais |
| `src/components/events.tsx` | Evento fixo com data, hora, local e mapa |
| `src/components/about.tsx` | Missao e tres pilares sociais |
| `src/components/causes.tsx` | Quatro cards de causas |
| `src/components/featured-campaign.tsx` | Formulario de voluntariado com toast |
| `src/components/gallery.tsx` | Mosaico de imagens responsivo |
| `src/components/testimonials.tsx` | Cards de depoimentos |
| `src/components/newsletter.tsx` | CTA de contato por e-mail |
| `src/components/footer.tsx` | Doacao, legal e links institucionais |

## 8. Requisitos tecnicos nao funcionais / Technische nicht-funktionale Anforderungen
* **PT-BR:** A interface precisa permanecer responsiva em desktop e mobile.
* **DE-CH:** Die Oberflaeche muss auf Desktop und Mobile responsiv bleiben.

* **PT-BR:** A pagina deve carregar sem dependencia de servidor dinamico.
* **DE-CH:** Die Seite soll ohne dynamische Server-Abhaengigkeit laden.

* **PT-BR:** O conteudo deve ser leve e renderizar com baixa complexidade.
* **DE-CH:** Der Inhalt soll leicht sein und mit geringer Komplexitaet rendern.

* **PT-BR:** A troca de idioma nao pode quebrar layout ou navegação.
* **DE-CH:** Der Sprachwechsel darf Layout und Navigation nicht beeintraechtigen.

## 9. Limitações atuais / Aktuelle Einschraenkungen
* **PT-BR:** O evento principal e fixo no codigo.
* **DE-CH:** Das Haupt-Event ist im Code fest hinterlegt.

* **PT-BR:** Nao existe persistencia remota para voluntarios ou newsletter.
* **DE-CH:** Es gibt keine entfernte Persistenz fuer Freiwillige oder Newsletter.

* **PT-BR:** A galeria e os depoimentos sao conteudo estatico.
* **DE-CH:** Galerie und Testimonials sind statische Inhalte.

* **PT-BR:** A copia da IBAN e o feedback de voluntariado sao apenas interacoes locais.
* **DE-CH:** IBAN-Kopie und Freiwilligen-Feedback sind nur lokale Interaktionen.

## 10. Roadmap tecnica / Technische Roadmap
* **PT-BR:** Um admin panel pode ser adicionado depois para gerenciar eventos e fotos.
* **DE-CH:** Ein Admin-Panel kann spaeter hinzugefuegt werden, um Events und Fotos zu verwalten.

* **PT-BR:** Um backend pode ser introduzido para persistir formulario de voluntariado e newsletter.
* **DE-CH:** Ein Backend kann spaeter eingefuehrt werden, um Freiwilligen- und Newsletter-Formulare zu speichern.

* **PT-BR:** O conteudo estatico pode migrar para uma fonte gerenciavel se a operacao crescer.
* **DE-CH:** Statische Inhalte koennen bei Wachstum auf eine verwaltbare Quelle migrieren.

## 11. Critérios de aceite tecnico / Technische Abnahmekriterien
* **PT-BR:** A home renderiza na ordem esperada sem erro de runtime.
* **DE-CH:** Die Startseite rendert in der erwarteten Reihenfolge ohne Laufzeitfehler.

* **PT-BR:** A troca PT/DE funciona em todos os blocos visiveis.
* **DE-CH:** Die PT/DE-Umschaltung funktioniert in allen sichtbaren Bloecken.

* **PT-BR:** O formulario de voluntariado envia apenas com consentimento e limpa o estado.
* **DE-CH:** Das Freiwilligenformular sendet nur mit Einwilligung und setzt den Zustand zurueck.

* **PT-BR:** O botao de copiar IBAN copia o valor com feedback de toast.
* **DE-CH:** Der IBAN-Kopierbutton kopiert den Wert mit Toast-Feedback.

* **PT-BR:** O deploy estatico abre a pagina principal sem necessidade de backend.
* **DE-CH:** Das statische Deployment oeffnet die Hauptseite ohne Backend-Bedarf.
