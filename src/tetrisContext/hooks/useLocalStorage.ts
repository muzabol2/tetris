"use client";

import { useEffect, useState } from "react";

const useLocalStorage = <T>(initialValue: T, key: string, version: string) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window !== "undefined") {
      try {
        const item = window.localStorage.getItem(key);

        if (item) {
          const parsedItem = JSON.parse(item);

          // Compare only the major version numbers
          if (parsedItem.version.split(".")[0] === version.split(".")[0]) {
            return parsedItem;
          }
        }
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
