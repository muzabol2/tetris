import type { GameState } from "@/types";
import { useEffect, useState } from "react";

const GAME_STATE_KEY = "game_state";

const useLocalStorage = (initialState: GameState) => {
  const [state, setState] = useState<GameState>(initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem(GAME_STATE_KEY);

      if (savedState) {
        setState(JSON.parse(savedState));
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.nextPiece, isLoaded]);

  return [state, setState] as const;
};

export { useLocalStorage };
