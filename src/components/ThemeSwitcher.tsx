"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/icons";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const isActive = resolvedTheme === "dark";

  const toggleColorMode = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center cursor-pointer" onClick={toggleColorMode}>
      <div className="relative">
        <div
          className={`toggle__line w-14 h-6 bg-gray-400 rounded-full shadow-inner hover:bg-gray-500 ${
            isActive && "bg-blue-400 hover:bg-blue-500"
          }`}
        >
          <div className="absolute inset-0 flex justify-between items-center px-1 pointer-events-none">
            <MoonIcon />
            <SunIcon />
          </div>
        </div>
        <div
          className={`toggle__dot absolute top-1/2 w-7 h-7 bg-white rounded-full shadow transform -translate-y-1/2 ${
            isActive ? "right-0" : "left-0"
          }`}
        />
      </div>
    </div>
  );
};

export { ThemeSwitcher };
