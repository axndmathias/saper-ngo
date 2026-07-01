import { useState, useEffect, useRef } from "react";

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

interface UseLocalStorageOptions<T> {
  debounceMs?: number;
  migrate?: (raw: unknown) => T;
}

export function useLocalStorage<T>(
  key: string,
  defaultValue: T | (() => T),
  options?: UseLocalStorageOptions<T>,
): [T, SetValue<T>] {
  const { debounceMs = 300, migrate } = options ?? {};

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) {
        return typeof defaultValue === "function"
          ? (defaultValue as () => T)()
          : defaultValue;
      }
      const parsed = JSON.parse(raw);
      if (migrate) return migrate(parsed);
      return parsed as T;
    } catch {
      return typeof defaultValue === "function"
        ? (defaultValue as () => T)()
        : defaultValue;
    }
  });

  const valueRef = useRef(storedValue);
  valueRef.current = storedValue;
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const keyRef = useRef(key);
  keyRef.current = key;

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (debounceMs === 0) {
      try {
        localStorage.setItem(key, JSON.stringify(storedValue));
      } catch { /* ignore */ }
    } else {
      timeoutRef.current = setTimeout(() => {
        try {
          localStorage.setItem(keyRef.current, JSON.stringify(valueRef.current));
        } catch { /* ignore */ }
      }, debounceMs);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [key, storedValue, debounceMs]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      try {
        localStorage.setItem(key, JSON.stringify(valueRef.current));
      } catch { /* ignore */ }
    };
  }, [key]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== key || e.newValue === null) return;
      try {
        const parsed = JSON.parse(e.newValue);
        setStoredValue(migrate ? migrate(parsed) : (parsed as T));
      } catch { /* ignore */ }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key, migrate]);

  return [storedValue, setStoredValue];
}
