"use client";

import { TetrisAction as A } from "@/enums";
import { useTetrisContext } from "@/hooks";

const useHelpers = () => {
  const { state, dispatch } = useTetrisContext();

  const newGame = () => {
    dispatch({ type: A.NEW_GAME });
    (document.activeElement as HTMLElement)?.blur();
  };

  const togglePauseResume = () => {
    dispatch({ type: A.TOGGLE_PAUSE_RESUME });
    (document.activeElement as HTMLElement)?.blur();
  };

  return { state, newGame, togglePauseResume };
};

export { useHelpers };
