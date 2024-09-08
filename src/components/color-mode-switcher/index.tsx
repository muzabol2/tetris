"use client";
import { useHelpers } from "./helpers";
import { MoonIcon, SunIcon } from "@/icons";

const ColorModeSwitcher = () => {
  const { isActive, toggleColorMode, mounted } = useHelpers();

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center cursor-pointer" onClick={toggleColorMode}>
      <div className="relative">
        <div
          className={`toggle__line w-14 h-7 rounded-full shadow-inner transition-colors duration-300 ${
            isActive
              ? "bg-blue-400 hover:bg-blue-500"
              : "bg-gray-400 hover:bg-gray-500"
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

export { ColorModeSwitcher };
