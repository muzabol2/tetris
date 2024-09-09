"use client";

import { BuyMeACoffeeIcon, GithubIcon, LogoIcon } from "@/icons";
import { ThemeSwitcher } from "./ThemeSwitcher";

const url = {
  gitHub: "https://github.com/muzabol2/tetris",
  buyMeACoffee: "https://www.buymeacoffee.com/muzabol2",
};

const Navbar = () => (
  <header className="w-full flex justify-center fixed top-0 left-0 right-0 shadow-md z-50 bg-header dark:bg-header transition-colors duration-200">
    <div className="w-full max-w-7xl flex items-center justify-between p-4">
      <h1 className="flex items-center gap-2 text-3xl font-bold text-foreground">
        <LogoIcon />
        tetris
      </h1>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <a
          href={url.buyMeACoffee}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center p-1 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition-colors duration-200"
        >
          <BuyMeACoffeeIcon />
        </a>
        <a href={url.gitHub} target="_blank" rel="noopener noreferrer">
          <GithubIcon />
        </a>
      </div>
    </div>
  </header>
);

export { Navbar };
