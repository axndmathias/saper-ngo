import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/auth-context";
import { useLang } from "@/contexts/language-context";
import type { GalleryItem } from "@/types/gallery";
import { useGalleryData, isDirty, loadPublishedIntoAdmin, fetchPublishedGallery, getAdminGallery, jsonHash } from "@/hooks/use-gallery-data";
import { commitFiles, loadGitHubConfig, saveGitHubConfig, clearGitHubConfig, type GitHubConfig } from "@/lib/github-api";
import { compressImage } from "@/lib/image-utils";
import { FaArrowUp, FaArrowDown, FaPlus, FaEdit, FaTrash, FaArrowLeft, FaLink, FaUpload, FaCog, FaSave, FaCheckCircle, FaExclamationCircle, FaSpinner, FaCloudDownloadAlt, FaExclamationTriangle, FaSyncAlt } from "react-icons/fa";

type ModalMode = "add" | "edit" | null;
type InputMode = "url" | "upload";
type PublishStatus = "idle" | "publishing" | "success" | "error";

export default function AdminGallery() {
  const { isAuthenticated } = useAuth();
  const { lang, t } = useLang();
  const [, setLocation] = useLocation();
  const { items, add, update, remove, moveUp, moveDown, replaceAll, markPublished } = useGalleryData();
  const [dirty, setDirty] = useState(true);
  const [publishedItems, setPublishedItems] = useState<GalleryItem[] | null>(null);
  const [syncing, setSyncing] = useState(true);
  useEffect(() => {
    setDirty(isDirty(items));
  }, [items]);

  useEffect(() => {
    const init = async () => {
      const existing = getAdminGallery();
      const published = await fetchPublishedGallery();
      setPublishedItems(published);

      if (!existing) {
        if (published) {
          replaceAll(published);
        }
      } else {
        setDirty(isDirty(items));
      }
      setSyncing(false);
    };
    init();
  }, []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [modal, setModal] = useState<ModalMode>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<InputMode>("url");
  const [src, setSrc] = useState("");
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [compressionInfo, setCompressionInfo] = useState("");
  const [altDe, setAltDe] = useState("");
  const [altPt, setAltPt] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [publishStatus, setPublishStatus] = useState<PublishStatus>("idle");
  const [publishMessage, setPublishMessage] = useState("");

  const [gitToken, setGitToken] = useState("");
  const [gitTokenSaved, setGitTokenSaved] = useState(false);
  const [showTokenConfig, setShowTokenConfig] = useState(false);
  const [tokenConfigured, setTokenConfigured] = useState(false);

  useEffect(() => {
    setTokenConfigured(loadGitHubConfig() !== null);
  }, []);

  if (!isAuthenticated) {
    setLocation("/admin");
    return null;
  }

  const resetModal = () => {
    setSrc("");
    setFilePreview(null);
    setFileName("");
    setAltDe("");
    setAltPt("");
    setEditId(null);
    setInputMode("url");
    setModal(null);
  };

  const openAdd = () => {
    resetModal();
    setModal("add");
  };

  const openEdit = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    const isDataUrl = item.src.startsWith("data:");
    setSrc(isDataUrl ? "" : item.src);
    setFilePreview(isDataUrl ? item.src : null);
    setFileName(isDataUrl ? t("Hochgeladenes Bild", "Imagem enviada") : "");
    setInputMode(isDataUrl ? "upload" : "url");
    setAltDe(item.altDe);
    setAltPt(item.altPt);
    setEditId(id);
    setModal("edit");
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setCompressionInfo("");
    try {
      const result = await compressImage(file);
      setFilePreview(result.dataUrl);
      setSrc(result.dataUrl);
      const saved = (result.compressedSize / 1024).toFixed(0);
      const original = (result.originalSize / 1024).toFixed(0);
      const ratio = ((1 - result.compressedSize / result.originalSize) * 100).toFixed(0);
      setCompressionInfo(`${original}KB → ${saved}KB (${ratio}% menor)`);
    } catch {
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result as string);
        setSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const finalSrc = src.trim();
    if (!finalSrc || !altDe.trim() || !altPt.trim()) return;
    if (modal === "add") {
      add(finalSrc, altDe.trim(), altPt.trim());
    } else if (modal === "edit" && editId) {
      update(editId, { src: finalSrc, altDe: altDe.trim(), altPt: altPt.trim() });
    }
    resetModal();
  };

  const handleDelete = (id: string) => {
    remove(id);
    setDeleteConfirm(null);
  };

  const handleSaveConfig = () => {
    if (!gitToken.trim()) return;
    saveGitHubConfig({ token: gitToken.trim(), owner: "axndmathias", repo: "saper-ngo", branch: "main" });
    setGitTokenSaved(true);
    setTokenConfigured(true);
    setGitToken("");
  };

  const handleClearConfig = () => {
    clearGitHubConfig();
    setGitToken("");
    setGitTokenSaved(false);
    setTokenConfigured(false);
  };

  const handlePublish = async () => {
    const config = loadGitHubConfig();
    if (!config) {
      setPublishMessage(t("GitHub-Token nicht konfiguriert.", "Token GitHub não configurado."));
      setPublishStatus("error");
      return;
    }
    if (items.length === 0) return;

    setPublishStatus("publishing");
    setPublishMessage(t("Veröffentlichung läuft...", "Publicando..."));

    try {
      const files: { path: string; content: string; encoding: "base64" | "utf-8" }[] = [];

      const publishedItems = items.map((item) => {
        if (item.src.startsWith("data:")) {
          const base64Data = item.src.split(",")[1];
          const ext = item.src.startsWith("data:image/png") ? "png" : "jpg";
          files.push({
            path: `public/uploads/gallery/${item.id}.${ext}`,
            content: base64Data,
            encoding: "base64",
          });
          return { ...item, src: `/saper-ngo/uploads/gallery/${item.id}.${ext}` };
        }
        return item;
      });

      const currentVersion = parseInt(localStorage.getItem("saper-gallery-published-version") ?? "0", 10);
      const newVersion = currentVersion + 1;
      files.push({
        path: "public/data/gallery.json",
        content: JSON.stringify({ items: publishedItems, version: newVersion }, null, 2),
        encoding: "utf-8",
      });

      await commitFiles(config, files, `B-23: publish gallery data (v${newVersion})`);

      localStorage.setItem("saper-gallery-published-version", String(newVersion));
      markPublished();
      setPublishMessage(t("Veröffentlicht! Das Deployment wird in 1-2 Minuten abgeschlossen.", "Publicado! A implantação será concluída em 1-2 minutos."));
      setPublishStatus("success");
    } catch (err) {
      setPublishMessage(err instanceof Error ? err.message : t("Unbekannter Fehler", "Erro desconhecido"));
      setPublishStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => setLocation("/admin/dashboard")}
              className="text-gray-400 hover:text-white transition-colors shrink-0"
            >
              <FaArrowLeft />
            </button>
            <h1 className="text-white text-base md:text-xl font-bold truncate">{t("Galerie verwalten", "Gerenciar Galeria")}</h1>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
            {dirty && (
              <span className="hidden sm:flex items-center gap-1.5 text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full px-3 py-1.5">
                <FaExclamationTriangle size={10} />
                {t("Nicht veröffentlicht", "Não publicado")}
              </span>
            )}
            {!dirty && publishedItems && (
              <span className="hidden sm:flex items-center gap-1.5 text-xs text-green-400 bg-green-400/10 border border-green-400/20 rounded-full px-3 py-1.5">
                <FaCheckCircle size={10} />
                {t("Veröffentlicht", "Publicado")}
              </span>
            )}
            <button
              onClick={async () => {
                setPublishStatus("publishing");
                setPublishMessage(t("Lade veröffentlichte Daten...", "Carregando dados publicados..."));
                const result = await loadPublishedIntoAdmin();
                if (result) {
                  replaceAll(result.items);
                  setPublishedItems(result.items);
                  setPublishMessage(t("Veröffentlichte Daten geladen.", "Dados publicados carregados."));
                  setPublishStatus("success");
                } else {
                  setPublishMessage(t("Keine veröffentlichten Daten gefunden.", "Nenhum dado publicado encontrado."));
                  setPublishStatus("error");
                }
              }}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-md hover:bg-white/10"
              title={t("Veröffentlichte Daten laden", "Carregar dados publicados")}
            >
              <FaCloudDownloadAlt />
            </button>
            <button
              onClick={() => setShowTokenConfig(!showTokenConfig)}
              className={`relative text-gray-400 hover:text-white transition-colors p-2 rounded-md hover:bg-white/10 ${showTokenConfig ? "bg-white/10 text-white" : ""}`}
              title={t("GitHub Token einrichten", "Configurar token GitHub")}
            >
              <FaCog />
              {tokenConfigured && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-primary" />
              )}
            </button>
            <button
              onClick={handlePublish}
              disabled={publishStatus === "publishing"}
              className="flex items-center justify-center bg-green-600 text-white w-9 h-9 rounded-md text-sm hover:bg-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              title={t("Veröffentlichen", "Publicar")}
            >
              {publishStatus === "publishing" ? <FaSpinner className="animate-spin" /> : <FaSave />}
            </button>
            <button
              onClick={openAdd}
              disabled={!items.length || items.length >= 12}
              className="flex items-center justify-center bg-accent text-accent-foreground w-9 h-9 rounded-md text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              title={t("Hinzufügen", "Adicionar")}
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>

      {showTokenConfig && (
        <div className="border-b border-white/10 bg-white/[0.02]">
          <div className="container mx-auto px-4 md:px-6 py-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaCog className="text-gray-400 text-sm" />
                <span className="text-white text-sm font-semibold">
                  {t("GitHub Token", "Token GitHub")}
                </span>
                {tokenConfigured ? (
                  <span className="flex items-center gap-1 text-green-400 text-xs">
                    <FaCheckCircle size={10} />
                    {t("Konfiguriert", "Configurado")}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-amber-400 text-xs">
                    <FaExclamationTriangle size={10} />
                    {t("Nicht konfiguriert", "Não configurado")}
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowTokenConfig(false)}
                className="text-gray-500 hover:text-white transition-colors text-xs"
              >
                ✕
              </button>
            </div>

            <div className="text-gray-500 text-xs leading-relaxed">
              {t(
                "Der Token ist nötig, um Bilder und Daten direkt ins GitHub-Repository zu veröffentlichen.",
                "O token é necessário para publicar imagens e dados diretamente no repositório do GitHub."
              )}
              <br />
              {t(
                "Erstelle einen Token unter GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) mit dem Scope 'repo'.",
                "Crie um token em GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) com o escopo 'repo'."
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <input
                  type="password"
                  value={gitToken}
                  onChange={(e) => setGitToken(e.target.value)}
                  placeholder={t("Token hier einfügen", "Cole o token aqui")}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-accent/50"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveConfig}
                  disabled={!gitToken.trim()}
                  className="bg-accent text-accent-foreground px-5 py-2.5 rounded-md text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {t("Speichern", "Salvar")}
                </button>
                <button
                  onClick={handleClearConfig}
                  disabled={!tokenConfigured}
                  className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2.5 rounded-md text-sm font-bold hover:bg-red-500/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {t("Löschen", "Limpar")}
                </button>
              </div>
            </div>

            {gitTokenSaved && (
              <p className="text-green-400 text-xs flex items-center gap-1">
                <FaCheckCircle /> {t("Token gespeichert!", "Token salvo!")}
              </p>
            )}
          </div>
        </div>
      )}

      {syncing && (
        <div className="border-b border-blue-500/30 bg-blue-500/10 text-blue-300 px-4 md:px-6 py-3 flex items-center gap-3 text-sm">
          <FaSpinner className="animate-spin shrink-0" />
          <span>{t("Synchronisiere mit veröffentlichten Daten...", "Sincronizando com dados publicados...")}</span>
        </div>
      )}

      {!syncing && publishedItems && jsonHash(publishedItems) !== jsonHash(items) && publishStatus === "idle" && (
        <div className="border-b border-purple-500/30 bg-purple-500/10 text-purple-300 px-4 md:px-6 py-3 flex items-center gap-3 text-sm">
          <FaSyncAlt className="shrink-0" />
          <span className="flex-1">
            {t("Neuere veröffentlichte Daten verfügbar.", "Novos dados publicados disponíveis.")}
          </span>
          <button
            onClick={async () => {
              setSyncing(true);
              const result = await loadPublishedIntoAdmin();
              if (result) replaceAll(result.items);
              setSyncing(false);
            }}
            className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 px-3 py-1 rounded-md text-xs font-bold transition-colors"
          >
            {t("Laden", "Carregar")}
          </button>
        </div>
      )}

      {!syncing && publishStatus !== "idle" && (
        <div className={`border-b px-4 md:px-6 py-3 flex items-center gap-3 text-sm ${
          publishStatus === "publishing" ? "border-blue-500/30 bg-blue-500/10 text-blue-300" :
          publishStatus === "success" ? "border-green-500/30 bg-green-500/10 text-green-300" :
          "border-red-500/30 bg-red-500/10 text-red-300"
        }`}>
          {publishStatus === "publishing" && <FaSpinner className="animate-spin shrink-0" />}
          {publishStatus === "success" && <FaCheckCircle className="shrink-0" />}
          {publishStatus === "error" && <FaExclamationCircle className="shrink-0" />}
          <span className="flex-1">{publishMessage}</span>
          {publishStatus === "success" && (
            <>
              <button
                onClick={async () => {
                  setPublishStatus("publishing");
                  setPublishMessage(t("Überprüfe Deployment...", "Verificando implantação..."));
                  for (let i = 0; i < 12; i++) {
                    await new Promise((r) => setTimeout(r, 5000));
                    const data = await fetchPublishedGallery();
                    if (data) {
                      setPublishMessage(t("Live! Die Daten sind jetzt öffentlich.", "Live! Os dados agora estão públicos."));
                      setPublishStatus("success");
                      return;
                    }
                  }
                  setPublishMessage(t("Zeitüberschreitung. Bitte aktualisieren und erneut prüfen.", "Tempo esgotado. Atualize e verifique novamente."));
                  setPublishStatus("error");
                }}
                className="bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 px-3 py-1 rounded-md text-xs font-bold transition-colors"
              >
                {t("Prüfen", "Verificar")}
              </button>
            </>
          )}
          {(publishStatus === "error" || publishStatus === "success") && (
            <button
              onClick={() => setPublishStatus("idle")}
              className="text-white/60 hover:text-white transition-colors ml-1"
            >
              ✕
            </button>
          )}
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6 py-8">
        {items.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">{t("Keine Fotos in der Galerie.", "Nenhuma foto na galeria.")}</p>
            <button onClick={openAdd} className="mt-4 bg-accent text-accent-foreground px-6 py-3 rounded-md font-bold hover:opacity-90 transition-opacity">
              <FaPlus className="inline mr-2" />{t("Erstes Foto hinzufügen", "Adicionar primeira foto")}
            </button>
          </div>
        )}

        {items.length > 0 && (
          <div className="mb-4 text-sm text-gray-400">
            {t("{count} von {max} Fotos", "{count} de {max} fotos")
              .replace("{count}", String(items.length))
              .replace("{max}", "12")}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-md overflow-hidden group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.src}
                  alt={lang === "de" ? item.altDe : item.altPt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 space-y-1">
                <p className="text-white text-xs truncate">{lang === "de" ? item.altDe : item.altPt}</p>
                <p className="text-gray-500 text-[10px] truncate">{item.src}</p>
              </div>
              <div className="flex items-center justify-between px-3 pb-3">
                <div className="flex gap-1">
                  <button
                    onClick={() => moveUp(item.id)}
                    disabled={item.order <= 1}
                    className="text-gray-400 hover:text-white disabled:text-gray-700 disabled:cursor-not-allowed transition-colors p-1"
                    title={t("Nach oben", "Para cima")}
                  >
                    <FaArrowUp size={12} />
                  </button>
                  <button
                    onClick={() => moveDown(item.id)}
                    disabled={item.order >= items.length}
                    className="text-gray-400 hover:text-white disabled:text-gray-700 disabled:cursor-not-allowed transition-colors p-1"
                    title={t("Nach unten", "Para baixo")}
                  >
                    <FaArrowDown size={12} />
                  </button>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEdit(item.id)}
                    className="text-accent hover:text-accent/80 transition-colors p-1"
                    title={t("Bearbeiten", "Editar")}
                  >
                    <FaEdit size={12} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(item.id)}
                    className="text-red-400 hover:text-red-300 transition-colors p-1"
                    title={t("Löschen", "Excluir")}
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-primary border border-white/10 rounded-md w-full max-w-lg p-6">
            <h2 className="text-white text-lg font-bold mb-4">
              {modal === "add" ? t("Foto hinzufügen", "Adicionar foto") : t("Foto bearbeiten", "Editar foto")}
            </h2>

            <div className="space-y-4">
              <div className="flex gap-1 bg-white/5 rounded-md p-1">
                <button
                  type="button"
                  onClick={() => { setInputMode("url"); setSrc(""); setFilePreview(null); setFileName(""); }}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${inputMode === "url" ? "bg-accent text-accent-foreground" : "text-gray-400 hover:text-white"}`}
                >
                  <FaLink /> {t("URL", "URL")}
                </button>
                <button
                  type="button"
                  onClick={() => { setInputMode("upload"); setSrc(""); setFilePreview(null); setFileName(""); }}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${inputMode === "upload" ? "bg-accent text-accent-foreground" : "text-gray-400 hover:text-white"}`}
                >
                  <FaUpload /> {t("Hochladen", "Upload")}
                </button>
              </div>

              {inputMode === "url" ? (
                <div>
                  <label className="text-gray-400 text-sm block mb-1">{t("Bild-URL", "URL da imagem")}</label>
                  <input
                    type="text"
                    value={src}
                    onChange={(e) => setSrc(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50"
                  />
                </div>
              ) : (
                <div>
                  <label className="text-gray-400 text-sm block mb-1">{t("Bild hochladen", "Enviar imagem")}</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  {!filePreview ? (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-white/10 rounded-md p-8 flex flex-col items-center gap-2 text-gray-400 hover:border-accent/50 hover:text-accent transition-colors"
                    >
                      <FaUpload className="text-2xl" />
                      <span className="text-sm">{t("Klicken zum Auswählen", "Clique para selecionar")}</span>
                    </button>
                  ) : (
                    <div className="relative">
                      <img
                        src={filePreview}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => { setFilePreview(null); setSrc(""); setFileName(""); }}
                        className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-black/80 transition-colors"
                      >
                        ✕
                      </button>
                      <p className="text-gray-500 text-xs mt-1 truncate">{fileName}</p>
                      {compressionInfo && (
                        <p className="text-green-400 text-[10px] mt-0.5">{compressionInfo}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
              <div>
                <label className="text-gray-400 text-sm block mb-1">{t("Alt-Text (Deutsch)", "Texto alternativo (Alemão)")}</label>
                <input
                  type="text"
                  value={altDe}
                  onChange={(e) => setAltDe(e.target.value)}
                  placeholder={t("Kurze Beschreibung auf Deutsch", "Descrição curta em alemão")}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">{t("Alt-Text (Portugiesisch)", "Texto alternativo (Português)")}</label>
                <input
                  type="text"
                  value={altPt}
                  onChange={(e) => setAltPt(e.target.value)}
                  placeholder="Descrição curta em português"
                  className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setModal(null); setEditId(null); }}
                className="text-gray-400 hover:text-white transition-colors px-4 py-2"
              >
                {t("Abbrechen", "Cancelar")}
              </button>
              <button
                onClick={handleSave}
                disabled={(inputMode === "url" ? !src.trim() : !filePreview) || !altDe.trim() || !altPt.trim()}
                className="bg-accent text-accent-foreground px-6 py-2 rounded-md font-bold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t("Speichern", "Salvar")}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-primary border border-white/10 rounded-md w-full max-w-sm p-6">
            <h2 className="text-white text-lg font-bold mb-2">{t("Foto löschen?", "Excluir foto?")}</h2>
            <p className="text-gray-400 text-sm mb-6">
              {t("Diese Aktion kann nicht rückgängig gemacht werden.", "Esta ação não pode ser desfeita.")}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="text-gray-400 hover:text-white transition-colors px-4 py-2"
              >
                {t("Abbrechen", "Cancelar")}
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="bg-red-500 text-white px-6 py-2 rounded-md font-bold hover:bg-red-600 transition-colors"
              >
                {t("Löschen", "Excluir")}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
