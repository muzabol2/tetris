"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../common";
import { ColorPicker } from "./ColorPicker";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { GAME_VERSION, URLS } from "@/constants";
import { BrushIcon, BuyMeACoffeeIcon, GithubIcon, LogoIcon } from "@/icons";

const Navbar = () => (
  <header className="fixed left-0 right-0 top-0 z-50 flex w-full justify-center bg-header shadow-md transition-colors duration-200">
    <div className="flex w-full max-w-7xl items-center justify-between p-4">
      <h1
        className="flex items-center cursor-pointer gap-2 text-3xl font-bold text-foreground"
        onClick={() => (window.location.href = "/")}
      >
        <LogoIcon />
        tetris
        <span className="text-sm font-normal text-gray-500">v{GAME_VERSION}</span>
      </h1>
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger className="text-foreground bg-transparent p-0">
            <BrushIcon />
          </PopoverTrigger>
          <PopoverContent>{<ColorPicker />}</PopoverContent>
        </Popover>

        <ThemeSwitcher />

        <a
          href={URLS.buyMeACoffee}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg bg-yellow-400 p-1 font-semibold text-black shadow transition-colors duration-200 hover:bg-yellow-500"
        >
          <BuyMeACoffeeIcon />
        </a>

        <a href={URLS.gitHub} target="_blank" rel="noopener noreferrer">
          <GithubIcon />
        </a>
      </div>
    </div>
  </header>
);

export { Navbar };
