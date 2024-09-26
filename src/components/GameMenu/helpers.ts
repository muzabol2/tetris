"use client";

import { TetrisAction } from "@/enums";
import { useTetrisContext } from "@/hooks";

const useHelpers = () => {
  const { state, dispatch } = useTetrisContext();

  const newGame = () => {
    dispatch({ type: TetrisAction.NEW_GAME });
    (document.activeElement as HTMLElement)?.blur();
  };

  const togglePauseResume = () => {
    dispatch({ type: TetrisAction.TOGGLE_PAUSE_RESUME });
    (document.activeElement as HTMLElement)?.blur();
  };

  return { state, newGame, togglePauseResume };
};

export { useHelpers };
