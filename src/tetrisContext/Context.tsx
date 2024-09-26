"use client";

import type { Actions } from "./actions";
import type { GameState } from "@/types";
import type { Dispatch } from "react";
import { createContext } from "react";

type TetrisContextType = {
  state: GameState;
  dispatch: Dispatch<Actions>;
};

/**
 * Context for managing Tetris game state.
 *
 * @type {TetrisContextType}
 * @property {GameState} state - The current state of the Tetris game.
 * @property {Dispatch<Actions>} dispatch - Function to dispatch actions to update the game state.
 */
const TetrisContext = createContext<TetrisContextType | undefined>(undefined);

export { TetrisContext };
