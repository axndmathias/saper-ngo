import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/auth-context";
import { useLang } from "@/contexts/language-context";
import { useGalleryData } from "@/hooks/use-gallery-data";
import { FaArrowUp, FaArrowDown, FaPlus, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";

type ModalMode = "add" | "edit" | null;

export default function AdminGallery() {
  const { isAuthenticated } = useAuth();
  const { lang, t } = useLang();
  const [, setLocation] = useLocation();
  const { items, add, update, remove, moveUp, moveDown } = useGalleryData();

  const [modal, setModal] = useState<ModalMode>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [src, setSrc] = useState("");
  const [altDe, setAltDe] = useState("");
  const [altPt, setAltPt] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  if (!isAuthenticated) {
    setLocation("/admin");
    return null;
  }

  const openAdd = () => {
    setSrc("");
    setAltDe("");
    setAltPt("");
    setEditId(null);
    setModal("add");
  };

  const openEdit = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    setSrc(item.src);
    setAltDe(item.altDe);
    setAltPt(item.altPt);
    setEditId(id);
    setModal("edit");
  };

  const handleSave = () => {
    if (!src.trim() || !altDe.trim() || !altPt.trim()) return;
    if (modal === "add") {
      add(src.trim(), altDe.trim(), altPt.trim());
    } else if (modal === "edit" && editId) {
      update(editId, { src: src.trim(), altDe: altDe.trim(), altPt: altPt.trim() });
    }
    setModal(null);
    setEditId(null);
  };

  const handleDelete = (id: string) => {
    remove(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation("/admin/dashboard")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaArrowLeft />
            </button>
            <h1 className="text-white text-xl font-bold">{t("Galerie verwalten", "Gerenciar Galeria")}</h1>
          </div>
          <button
            onClick={openAdd}
            disabled={!items.length || items.length >= 12}
            className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FaPlus /> {t("Hinzufügen", "Adicionar")}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        {items.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">{t("Keine Fotos in der Galerie.", "Nenhuma foto na galeria.")}</p>
            <button onClick={openAdd} className="mt-4 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
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
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group"
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
          <div className="bg-primary border border-white/10 rounded-xl w-full max-w-lg p-6">
            <h2 className="text-white text-lg font-bold mb-4">
              {modal === "add" ? t("Foto hinzufügen", "Adicionar foto") : t("Foto bearbeiten", "Editar foto")}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-1">{t("Bild-URL", "URL da imagem")}</label>
                <input
                  type="text"
                  value={src}
                  onChange={(e) => setSrc(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">{t("Alt-Text (Deutsch)", "Texto alternativo (Alemão)")}</label>
                <input
                  type="text"
                  value={altDe}
                  onChange={(e) => setAltDe(e.target.value)}
                  placeholder={t("Kurze Beschreibung auf Deutsch", "Descrição curta em alemão")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">{t("Alt-Text (Portugiesisch)", "Texto alternativo (Português)")}</label>
                <input
                  type="text"
                  value={altPt}
                  onChange={(e) => setAltPt(e.target.value)}
                  placeholder="Descrição curta em português"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50"
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
                disabled={!src.trim() || !altDe.trim() || !altPt.trim()}
                className="bg-accent text-accent-foreground px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t("Speichern", "Salvar")}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-primary border border-white/10 rounded-xl w-full max-w-sm p-6">
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
                className="bg-red-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-600 transition-colors"
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
