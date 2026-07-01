# Product Requirement Document (PRD) - SAPER Landing Page

## 1. Visao do produto / Produktuebersicht
* **Nome do produto / Produktname:** SAPER Landing Page
* **Formato / Format:** Single Page Application com seções ancoradas
* **Status / Status:** Em producao / In Produktion
* **Idioma / Sprache:** Alemao como padrao, com alternancia manual para Portugues
* **Canal principal / Hauptkanal:** Instagram oficial `@saperrj`
* **Publicacao / Deployment:** Hospedagem estatica compativel com Vite e GitHub Pages

### 1.1 Objetivo
* **PT-BR:** Apresentar a SAPER de forma institucional, clara e emocional, reunindo em uma unica pagina a missao do projeto, o proximo evento, o voluntariado, as areas de impacto social, a prova social e a informacao legal.
* **DE-CH:** Die SAPER soll institutionell, klar und emotional auf einer einzigen Seite praesentiert werden, mit Mission, naechstem Event, Freiwilligenarbeit, Wirkungsbereichen, Social Proof und rechtlichen Informationen.

### 1.2 Problema que a pagina resolve
* **PT-BR:** Antes da landing page, a comunicacao do projeto estava dispersa entre contatos, redes sociais e informacoes pontuais. O visitante nao encontrava rapidamente quem e a SAPER, o que ela faz e como apoiar.
* **DE-CH:** Vor der Landingpage war die Projektkommunikation auf Kontakte, Social Media und einzelne Informationen verteilt. Besucher fanden nicht schnell heraus, wer SAPER ist, was der Verein macht und wie man helfen kann.

### 1.3 Proposta de valor
* **PT-BR:** A pagina reduz friccao, passa confianca, destaca um proximo evento e converte interesse em acao simples: conhecer, participar, voluntariar ou acompanhar.
* **DE-CH:** Die Seite reduziert Reibung, schafft Vertrauen, hebt das naechste Event hervor und wandelt Interesse in einfache Aktionen um: informieren, teilnehmen, mithelfen oder folgen.

## 2. Publico-alvo / Zielgruppe
1. **Moradores locais / Lokale Bevoelkerung**
   * **PT-BR:** Pessoas da regiao que buscam um evento cultural e beneficente com informacoes objetivas.
   * **DE-CH:** Menschen aus der Region, die ein kulturelles Benefiz-Event mit klaren Informationen suchen.
2. **Comunidade lusofona / Lusophone Community**
   * **PT-BR:** Brasileiros, portugueses e simpatizantes que querem se aproximar da causa e apoiar.
   * **DE-CH:** Brasilianer, Portugiesen und Sympathisanten, die sich der Sache naehern und unterstuetzen moechten.
3. **Apoiadores institucionais / Institutionelle Unterstuetzer**
   * **PT-BR:** Pessoas que precisam validar legitimidade, transparencia e contato oficial.
   * **DE-CH:** Personen, die Legitimitat, Transparenz und offizielle Kontaktdaten pruefen wollen.

## 3. Jornada principal / Haupt-User-Journey
1. O usuario entra na home e entende imediatamente o proposito da SAPER.
2. O usuario visualiza o proximo evento e pode abrir o mapa ou a area de participacao.
3. O usuario percorre a secao institucional, ve as causas, depoimentos e galeria.
4. O usuario decide se vai se voluntariar, acompanhar a pagina ou acessar o Instagram.
5. O usuario encontra o rodape com transparencia financeira e informacao legal.

## 4. Escopo atual do produto / Aktueller Produktumfang
### 4.1 Header / Kopfbereich
* **PT-BR:** Logo, navegacao por ancoras, botao de idioma, link do Instagram e CTA de doacao.
* **DE-CH:** Logo, Anker-Navigation, Sprachumschalter, Instagram-Link und Spenden-CTA.

### 4.2 Hero
* **PT-BR:** Mensagem central de impacto, dois botoes de acao e imagem principal da marca.
* **DE-CH:** Zentrale Wirkungsbotschaft, zwei Aktionsbuttons und das Hauptbild der Marke.

### 4.3 Eventos
* **PT-BR:** Evento fixo com data, horario, local, resumo bilingu e link para Google Maps.
* **DE-CH:** Festes Event mit Datum, Uhrzeit, Ort, zweisprachiger Kurzbeschreibung und Google-Maps-Link.

### 4.4 Sobre a SAPER
* **PT-BR:** Explicacao da missao e dos tres pilares sociais: idosos, educacao e reintegracao social.
* **DE-CH:** Erlaeuterung der Mission und der drei sozialen Schwerpunkte: Senioren, Bildung und soziale Wiedereingliederung.

### 4.5 Causas
* **PT-BR:** Quatro cards de apoio: idosos, educacao, reintegracao e eventos beneficentes.
* **DE-CH:** Vier Support-Karten: Senioren, Bildung, Wiedereingliederung und Benefizveranstaltungen.

### 4.6 Voluntariado
* **PT-BR:** Formulario com nome, e-mail, telefone, funcao desejada e consentimento obrigatorio.
* **DE-CH:** Formular mit Name, E-Mail, Telefon, gewuenschter Rolle und verpflichtender Einwilligung.

### 4.7 Galeria
* **PT-BR:** Mosaico visual responsivo com 6 fotos visiveis, botao "Ver Mais" expande o grid ate 12 fotos. A primeira foto (Social) comeca oculta atras do botao. Admin gerencia fotos via CRUD com compressao automatica (1200px, JPEG 0.8) e publicacao para o GitHub via API com version tracking.
* **DE-CH:** Responsives visuelles Mosaik mit 6 sichtbaren Fotos, Button "Mehr anzeigen" erweitert das Grid auf bis zu 12 Fotos. Das erste Foto (Social) beginnt versteckt hinter dem Button. Admin verwaltet Fotos via CRUD mit automatischer Komprimierung (1200px, JPEG 0.8) und GitHub-API-Publikation mit Version-Tracking.

### 4.8 Depoimentos
* **PT-BR:** Tres depoimentos para reforcar confianca e validacao social.
* **DE-CH:** Drei Testimonials zur Vertrauensbildung und sozialen Validierung.

### 4.9 Newsletter / Contato
* **PT-BR:** Captura simples de interesse por e-mail como CTA de contato.
* **DE-CH:** Einfache E-Mail-Interessenabfrage als Kontakt-CTA.

### 4.11 Admin
* **PT-BR:** Sistema de administracao embutido na SPA: login protegido com SHA-256 (/admin, /admin/setup), dashboard com grid de componentes e alterar senha, CRUD visual por secao com publicacao via GitHub API. Toggle DE/PT disponivel.
* **DE-CH:** In die SPA integriertes Admin-System: geschuetzter Login mit SHA-256 (/admin, /admin/setup), Dashboard mit Komponenten-Grid und Passwort-aendern, visuelles CRUD pro Bereich mit GitHub-API-Publikation. DE/PT-Umschalter verfuegbar.

### 4.10 Rodape
* **PT-BR:** Transparencia de doacoes, IBAN, links institucionais e blocos legais.
* **DE-CH:** Transparenz zu Spenden, IBAN, institutionelle Links und rechtliche Bereiche.

## 5. Requisitos funcionais / Funktionale Anforderungen
| ID | Requisito (PT-BR) | Anforderung (DE-CH) |
| :--- | :--- | :--- |
| RF-01 | Alternar entre PT e DE com persistencia da escolha. | Zwischen PT und DE wechseln und die Auswahl speichern. |
| RF-02 | Exibir a narrativa institucional da SAPER na home. | Die institutionelle SAPER-Erzaehlung auf der Startseite anzeigen. |
| RF-03 | Destacar o proximo evento com informacoes praticas. | Das naechste Event mit praktischen Informationen hervorheben. |
| RF-04 | Conduzir o usuario ate voluntariado, galeria e contato. | Nutzer zu Freiwilligenarbeit, Galerie und Kontakt fuehren. |
| RF-05 | Reforcar prova social com depoimentos e imagens. | Soziale Glaubwuerdigkeit mit Testimonials und Bildern staerken. |
| RF-06 | Exibir informacao de doacao com transparencia. | Spendeninformationen mit Transparenz anzeigen. |
| RF-07 | Manter o rodape legal acessivel e visivel. | Den rechtlichen Footer sichtbar und zugänglich halten. |
| RF-08 | Autenticar admin com hash SHA-256, senha definida no primeiro acesso via /admin/setup. | Admin mit SHA-256-Hash authentifizieren, Passwort beim ersten Zugriff via /admin/setup festlegen. |
| RF-09 | Exibir dashboard admin com grid de componentes gerenciáveis e opcao de alterar senha. | Admin-Dashboard mit Grid verwaltbarer Komponenten und Passwort-aendern-Option anzeigen. |
| RF-10 | CRUD visual da galeria de fotos com limite de 12, compressao automatica no upload. | Visuelles CRUD fuer Fotogalerie mit Limit von 12, automatischer Komprimierung beim Upload. |
| RF-11 | Exibir 6 fotos na galeria com botao "Ver Mais" para expandir. Buscar dados do GitHub com fallback localStorage. | 6 Fotos in der Galerie anzeigen mit "Mehr anzeigen"-Button. Daten von GitHub abrufen mit localStorage-Fallback. |
| RF-12 | Alternar idioma DE/PT no admin. | Sprache DE/PT im Admin umschalten. |
| RF-13 | Publicar dados da galeria no GitHub via API com version tracking. | Galerie-Daten ueber GitHub-API mit Version-Tracking publizieren. |
| RF-14 | Sincronizar dados publicados do GitHub com indicadores visuais de status (publicado/nao publicado). | Publizierte Daten von GitHub synchronisieren mit visuellen Status-Indikatoren (publiziert/nicht publiziert). |
| RF-15 | Comprimir imagens no upload (max 1200px, JPEG 0.8) para reduzir ~90% do tamanho. | Bilder beim Upload komprimieren (max 1200px, JPEG 0.8) fuer ~90% Groessenreduktion. |

## 6. Requisitos de conteudo / Inhaltsanforderungen
* **PT-BR:** O texto deve existir em PT e DE para as areas visiveis da pagina.
* **DE-CH:** Fuer die sichtbaren Bereiche muessen Inhalte in PT und DE vorhanden sein.

* **PT-BR:** As imagens devem ser coerentes com a identidade da SAPER e com a narrativa de impacto social.
* **DE-CH:** Bilder muessen zur SAPER-Identitaet und zur sozialen Wirkungsnarration passen.

* **PT-BR:** O proximo evento, a conta de doacao e os links oficiais devem permanecer atualizados.
* **DE-CH:** Naechstes Event, Spendenkonto und offizielle Links muessen aktuell bleiben.

## 7. Regras de negocio / Geschaeftsregeln
* **RN-01:** O idioma padrao ao abrir a pagina e alemao.
* **RN-02:** O usuario pode alternar o idioma manualmente a qualquer momento.
* **RN-03:** O formulario de voluntariado exige consentimento explicito.
* **RN-04:** O site nao processa pagamentos nem armazena dados sensiveis de cartao.
* **RN-05:** A doacao e comunicada por IBAN oficial, nao por checkout interno.
* **RN-06:** Instagram, Google Maps e links legais sao canais oficiais e devem ser mantidos.

## 8. Fora de escopo / Ausserhalb des Scopes
* **PT-BR:** Login de usuario publico, area privada e workflow editorial.
* **DE-CH:** Benutzer-Login, privater Bereich und redaktioneller Workflow.

* **PT-BR:** Backend transacional para pagamentos, doacoes online ou automacoes complexas.
* **DE-CH:** Transaktionales Backend fuer Zahlungen, Online-Spenden oder komplexe Automationen.

## 9. Compliance e legal / Compliance und Recht
* **PT-BR:** O footer precisa exibir informacoes institucionais, contato e acesso a privacidade.
* **DE-CH:** Der Footer muss institutionelle Informationen, Kontakt und Datenschutzzugang zeigen.

* **PT-BR:** Nao ha uso de cookies de rastreamento de terceiros.
* **DE-CH:** Es werden keine Tracking-Cookies von Drittanbietern genutzt.

* **PT-BR:** Imagens e depoimentos devem respeitar direitos de uso e imagem.
* **DE-CH:** Bilder und Testimonials muessen Nutzungs- und Bildrechte respektieren.

## 10. Indicadores de sucesso / Erfolgskriterien
* **PT-BR:** O usuario entende a proposta da SAPER em poucos segundos.
* **DE-CH:** Nutzer verstehen den SAPER-Zweck in wenigen Sekunden.

* **PT-BR:** A pagina apoia engajamento real em evento, voluntariado e acompanhamento.
* **DE-CH:** Die Seite unterstuetzt echte Beteiligung an Event, Freiwilligenarbeit und Follow-up.

* **PT-BR:** A experiencia e consistente em desktop e mobile.
* **DE-CH:** Das Erlebnis ist auf Desktop und Mobile konsistent.
