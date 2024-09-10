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
    <div className="flex cursor-pointer items-center" onClick={toggleColorMode}>
      <div className="relative">
        <div
          className={`toggle__line h-6 w-14 rounded-full bg-gray-400 shadow-inner hover:bg-gray-500 ${
            isActive && "bg-blue-400 hover:bg-blue-500"
          }`}
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-1">
            <MoonIcon />
            <SunIcon />
          </div>
        </div>
        <div
          className={`toggle__dot absolute top-1/2 h-7 w-7 -translate-y-1/2 transform rounded-full bg-white shadow ${
            isActive ? "right-0" : "left-0"
          }`}
        />
      </div>
    </div>
  );
};

export { ThemeSwitcher };
