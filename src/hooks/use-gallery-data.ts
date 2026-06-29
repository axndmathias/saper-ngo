import { useCallback, useEffect, useState } from "react";
import type { GalleryItem } from "@/types/gallery";
import { GALLERY_DEFAULTS } from "@/data/gallery-defaults";

const STORAGE_KEY_ADMIN = "saper-gallery";
const STORAGE_KEY_CACHE = "saper-gallery-cache";
const MAX_ITEMS = 12;
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

function loadFromStorage(key: string): GalleryItem[] | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GalleryItem[];
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch { /* ignore */ }
  return null;
}

function saveToStorage(key: string, items: GalleryItem[]) {
  localStorage.setItem(key, JSON.stringify(items));
}

function loadGallery(): GalleryItem[] {
  return loadFromStorage(STORAGE_KEY_ADMIN) ?? loadFromStorage(STORAGE_KEY_CACHE) ?? [...GALLERY_DEFAULTS];
}

export async function fetchPublishedGallery(): Promise<GalleryItem[] | null> {
  try {
    const res = await fetch(`${BASE}/data/gallery.json`);
    if (!res.ok) return null;
    const data = (await res.json()) as GalleryItem[];
    if (Array.isArray(data) && data.length > 0) {
      saveToStorage(STORAGE_KEY_CACHE, data);
      return data;
    }
    return null;
  } catch {
    return null;
  }
}

export function useGalleryData() {
  const [items, setItems] = useState<GalleryItem[]>(loadGallery);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (isDirty) {
      saveToStorage(STORAGE_KEY_ADMIN, items);
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
