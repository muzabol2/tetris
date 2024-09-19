"use client";

import type { Actions } from "./actions";
import type { GameState } from "@/types";
import type React from "react";
import { createContext } from "react";

type ContextType = {
  state: GameState;
  dispatch: React.Dispatch<Actions>;
};

const Context = createContext<ContextType | undefined>(undefined);

export { Context };
