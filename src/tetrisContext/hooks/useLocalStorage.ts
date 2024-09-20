"use client";

import { useEffect, useState } from "react";

const useLocalStorage = <T>(initialValue: T, key: string, version: string) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);

      if (item) {
        try {
          const parsedItem = JSON.parse(item);

          if (parsedItem.version === version) {
            setStoredValue(parsedItem);
          }
        } catch (error) {
          console.error("Error parsing localStorage item:", error);
        }
      }
      setIsLoaded(true);
    }
  }, [key, version]);

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      try {
        window.localStorage.setItem(key, JSON.stringify({ ...storedValue, version }));
      } catch (error) {
        console.error("Error setting localStorage:", error);
      }
    }
  }, [storedValue, isLoaded, key, version]);

  const setValue = (value: T | ((val: T) => T)) => {
    setStoredValue((prevValue) => (value instanceof Function ? value(prevValue) : value));
  };

  return [storedValue, setValue] as const;
};

export { useLocalStorage };
