"use client";

import { useState } from "react";

const useLocalStorage = <T>(initialValue: T, key: string, version: string) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined" || !window.localStorage) {
      console.warn("localStorage is not available");

      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);

      if (item) {
        const parsedItem = JSON.parse(item);

        return parsedItem.version === version ? parsedItem : initialValue;
      }

      return initialValue;
    } catch (error) {
      console.error("Error accessing localStorage:", error);

      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  };

  return [storedValue, setValue] as const;
};

export { useLocalStorage };
