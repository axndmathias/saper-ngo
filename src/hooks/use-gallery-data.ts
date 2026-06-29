import { useCallback, useEffect, useState } from "react";
import type { GalleryItem } from "@/types/gallery";
import { GALLERY_DEFAULTS } from "@/data/gallery-defaults";

const STORAGE_KEY = "saper-gallery";
const MAX_ITEMS = 12;

function loadGallery(): GalleryItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as GalleryItem[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch { /* ignore */ }
  return [...GALLERY_DEFAULTS];
}

function saveGallery(items: GalleryItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function useGalleryData() {
  const [items, setItems] = useState<GalleryItem[]>(loadGallery);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (isDirty) {
      saveGallery(items);
      setIsDirty(false);
    }
  }, [items, isDirty]);

  const sorted = [...items].sort((a, b) => a.order - b.order);

  const visibleItems = sorted.filter((item) => item.order <= 6);
  const hiddenItems = sorted.filter((item) => item.order > 6);
  const canAdd = items.length < MAX_ITEMS;

  const add = useCallback((src: string, altDe: string, altPt: string) => {
    setItems((prev) => {
      const maxOrder = prev.reduce((max, item) => Math.max(max, item.order), 0);
      const newItem: GalleryItem = {
        id: `gallery-${Date.now()}`,
        src,
        altDe,
        altPt,
        order: maxOrder + 1,
      };
      return [...prev, newItem];
    });
    setIsDirty(true);
  }, []);

  const update = useCallback((id: string, updates: Partial<Pick<GalleryItem, "src" | "altDe" | "altPt">>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
    setIsDirty(true);
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => {
      const filtered = prev.filter((item) => item.id !== id);
      return filtered.map((item, idx) => ({ ...item, order: idx + 1 }));
    });
    setIsDirty(true);
  }, []);

  const moveUp = useCallback((id: string) => {
    setItems((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((item) => item.id === id);
      if (idx <= 0) return prev;
      [sorted[idx - 1], sorted[idx]] = [sorted[idx], sorted[idx - 1]];
      return sorted.map((item, i) => ({ ...item, order: i + 1 }));
    });
    setIsDirty(true);
  }, []);

  const moveDown = useCallback((id: string) => {
    setItems((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((item) => item.id === id);
      if (idx === -1 || idx >= sorted.length - 1) return prev;
      [sorted[idx], sorted[idx + 1]] = [sorted[idx + 1], sorted[idx]];
      return sorted.map((item, i) => ({ ...item, order: i + 1 }));
    });
    setIsDirty(true);
  }, []);

  const reset = useCallback(() => {
    setItems([...GALLERY_DEFAULTS]);
    setIsDirty(true);
  }, []);

  return {
    items: sorted,
    visibleItems,
    hiddenItems,
    canAdd,
    add,
    update,
    remove,
    moveUp,
    moveDown,
    reset,
  };
}
