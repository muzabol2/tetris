"use client";

import { useEffect, useState } from "react";

const useLocalStorage = <T>(initialValue: T, key: string) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window !== "undefined") {
      try {
        const item = window.localStorage.getItem(key);

        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error("Error parsing localStorage item:", error);

        return initialValue;
      }
    }

    return initialValue;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error("Error setting localStorage:", error);
      }
    }
  }, [storedValue, key]);

  return [storedValue, setStoredValue] as const;
};

export { useLocalStorage };
