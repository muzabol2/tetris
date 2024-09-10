"use client";

import { BuyMeACoffeeIcon, GithubIcon, LogoIcon } from "@/icons";
import { ThemeSwitcher } from "./ThemeSwitcher";

const url = {
  gitHub: "https://github.com/muzabol2/tetris",
  buyMeACoffee: "https://www.buymeacoffee.com/muzabol2",
};

const Navbar = () => (
  <header className="bg-header dark:bg-header fixed left-0 right-0 top-0 z-50 flex w-full justify-center shadow-md transition-colors duration-200">
    <div className="flex w-full max-w-7xl items-center justify-between p-4">
      <h1 className="text-foreground flex items-center gap-2 text-3xl font-bold">
        <LogoIcon />
        tetris
      </h1>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <a
          href={url.buyMeACoffee}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg bg-yellow-400 p-1 font-semibold text-black shadow transition-colors duration-200 hover:bg-yellow-500"
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
