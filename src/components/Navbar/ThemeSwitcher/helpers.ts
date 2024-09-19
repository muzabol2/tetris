import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const useHelpers = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const isActive = resolvedTheme === "dark";

  const toggleColorMode = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  useEffect(() => setMounted(true), []);

  return { isActive, mounted, toggleColorMode };
};

export { useHelpers };
