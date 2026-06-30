# Guia da Galeria SAPER

## Para Visitantes

A galeria do site SAPER mostra fotos dos projetos e atividades. As fotos são carregadas automaticamente do GitHub e podem levar **1-2 minutos** para aparecer após uma atualização.

- **Atualize a página** (F5) para ver as fotos mais recentes
- Se as fotos não aparecerem, aguarde alguns minutos e tente novamente

---

## Para Administradores

### Acessar a Galeria

1. Faça login em `/admin`
2. Clique em **Galeria** no painel

### Interface

![Admin Gallery](*screenshot*)

| Botão | Ação |
|-------|------|
| 💾 (verde) | Publicar alterações no GitHub |
| ＋ (laranja) | Adicionar nova foto |
| ⬆ ⬇ | Reordenar fotos |
| ✏️ | Editar foto |
| 🗑️ | Excluir foto |
| ☁️ (download) | Carregar dados publicados do GitHub |
| ⚙️ | Configurar token do GitHub |

### Fluxo Completo

#### 1. Primeiro Acesso

Ao entrar na Galeria pela primeira vez em um dispositivo:
- O sistema **sincroniza automaticamente** com os dados publicados no GitHub
- Você vê as mesmas fotos que estão no site público
- Uma mensagem azul "Sincronizando..." aparece brevemente

#### 2. Adicionar Foto

1. Clique em **＋**
2. Escolha uma das duas opções:

**Opção A — URL**
- Cole o link de uma imagem (ex: Unsplash, Imgur)
- Funciona para qualquer imagem já hospedada na internet

**Opção B — Upload**
- Selecione um arquivo do seu computador/celular
- A imagem é convertida e armazenada localmente

3. Preencha os campos:
   - **Texto alternativo (Alemão)** — descrição curta em alemão
   - **Texto alternativo (Português)** — descrição curta em português
4. Clique em **Salvar**

#### 3. Reordenar Fotos

Use os botões ⬆ e ⬇ para mover as fotos. As primeiras 6 fotos aparecem sempre visíveis no site; o restante fica atrás do botão "Ver Mais".

#### 4. Editar ou Excluir

- Clique em ✏️ para editar URL/textos de uma foto
- Clique em 🗑️ para excluir (confirme na caixa de diálogo)

#### 5. Publicar no GitHub

> ⚠️ **Importante**: as alterações só ficam visíveis no site depois de publicar!

1. Configure o **token do GitHub** na primeira vez (⚙️):
   - Vá em GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Crie um token com escopo **repo**
   - Cole o token no campo e clique em **Salvar**

2. Clique em **💾** (verde) para publicar
3. Aguarde a mensagem **"Live! Os dados agora estão públicos."**
   - Se quiser, clique em **Verificar** para checar se o deploy já terminou
   - O deploy leva de 1 a 5 minutos

#### 6. Sincronizar entre Dispositivos

Quando você publica de um dispositivo, o outro precisa **carregar os dados mais recentes**:

- **Automaticamente**: se for o primeiro acesso no dispositivo, a sincronização é feita ao entrar
- **Manual**: clique no botão ☁️ (Carregar dados publicados)
- Ou veja o **banner roxo** "Novos dados publicados disponíveis" com botão **Carregar**

### Indicadores de Status

| Indicador | Significado |
|-----------|-------------|
| 🟡 **"Não publicado"** | Há edições locais que ainda não foram publicadas |
| 🟢 **"Publicado"** | Os dados locais estão em sincronia com o GitHub |
| 🔵 **"Sincronizando..."** | Carregando dados do GitHub |
| 🟣 Banner roxo | Dados mais recentes disponíveis no GitHub (clique em "Carregar") |

### Solução de Problemas

**As fotos não aparecem no site público**
- Você clicou em **💾 Publicar**? (só editar não basta)
- Aguarde 1-2 minutos para o deploy do GitHub Actions
- Atualize a página do site (F5)

**Erro ao publicar**
- Verifique se o token do GitHub está configurado (⚙️)
- O token precisa ter escopo **repo**
- Se expirou, gere um novo token

**Foto não carrega no admin**
- Verifique se a URL da imagem é válida
- Para uploads, tente um arquivo menor
- Imagens muito grandes (>5MB) podem demorar para processar

**Dispositivo diferente não vê as mudanças**
- No novo dispositivo, o banner roxo deve aparecer — clique em **Carregar**
- Ou clique no botão ☁️ manualmente
- Certifique-se de que o publish terminou (aguarde o "Live!")
