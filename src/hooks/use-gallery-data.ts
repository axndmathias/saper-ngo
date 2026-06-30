import { useCallback, useEffect, useState } from "react";
import type { GalleryItem } from "@/types/gallery";
import { GALLERY_DEFAULTS } from "@/data/gallery-defaults";

const STORAGE_KEY_ADMIN = "saper-gallery";
const STORAGE_KEY_CACHE = "saper-gallery-cache";
const STORAGE_KEY_PUBLISHED_HASH = "saper-gallery-published-hash";
const STORAGE_KEY_PUBLISHED_VERSION = "saper-gallery-published-version";
const MAX_ITEMS = 12;
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export type GalleryData = { items: GalleryItem[]; version: number };

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
  const admin = loadFromStorage(STORAGE_KEY_ADMIN);
  if (admin) return admin;
  const cache = loadFromStorage(STORAGE_KEY_CACHE);
  if (cache) return cache;
  return [...GALLERY_DEFAULTS];
}

export function jsonHash(items: GalleryItem[]): string {
  const normalised = items.map(({ id, src, altDe, altPt, order }) => ({ id, src, altDe, altPt, order }));
  return JSON.stringify(normalised);
}

export function getAdminGallery(): GalleryItem[] | null {
  return loadFromStorage(STORAGE_KEY_ADMIN);
}

export function getPublishedHash(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY_PUBLISHED_HASH);
  } catch {
    return null;
  }
}

export function setPublishedHash(items: GalleryItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY_PUBLISHED_HASH, jsonHash(items));
  } catch { /* ignore */ }
}

export function isDirty(items: GalleryItem[]): boolean {
  const hash = getPublishedHash();
  if (!hash) return true;
  return hash !== jsonHash(items);
}

function getPublishedVersion(): number {
  try {
    return parseInt(localStorage.getItem(STORAGE_KEY_PUBLISHED_VERSION) ?? "0", 10);
  } catch {
    return 0;
  }
}

function savePublishedVersion(version: number) {
  try {
    localStorage.setItem(STORAGE_KEY_PUBLISHED_VERSION, String(version));
  } catch { /* ignore */ }
}

export async function fetchPublishedGallery(): Promise<GalleryItem[] | null> {
  try {
    const ts = Date.now();
    const res = await fetch(`${BASE}/data/gallery.json?t=${ts}`);
    if (!res.ok) return null;
    const raw: unknown = await res.json();
    let data: GalleryItem[];
    let version = getPublishedVersion();

    if (Array.isArray(raw)) {
      data = raw as GalleryItem[];
    } else if (raw && typeof raw === "object" && "items" in raw) {
      const wrapped = raw as GalleryData;
      data = wrapped.items;
      version = wrapped.version;
    } else {
      return null;
    }

    if (Array.isArray(data) && data.length > 0) {
      const cachedVersion = getPublishedVersion();
      if (version > cachedVersion) {
        saveToStorage(STORAGE_KEY_CACHE, data);
        savePublishedVersion(version);
      }
      return data;
    }
    return null;
  } catch {
    return null;
  }
}

export async function loadPublishedIntoAdmin(): Promise<{ items: GalleryItem[] } | null> {
  const data = await fetchPublishedGallery();
  if (!data) return null;
  saveToStorage(STORAGE_KEY_ADMIN, data);
  setPublishedHash(data);
  return { items: data };
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

  const replaceAll = useCallback((newItems: GalleryItem[]) => {
    setItems(newItems);
    saveToStorage(STORAGE_KEY_ADMIN, newItems);
    setIsDirty(false);
  }, []);

  const markPublished = useCallback(() => {
    setPublishedHash(items);
  }, [items]);

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
    replaceAll,
    markPublished,
  };
}
