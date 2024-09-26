"use client";

import type { Actions } from "./actions";
import type { GameState } from "@/types";
import type { Dispatch } from "react";
import { createContext } from "react";

type TetrisContextType = {
  state: GameState;
  dispatch: Dispatch<Actions>;
};

const TetrisContext = createContext<TetrisContextType | undefined>(undefined);

export { TetrisContext };
