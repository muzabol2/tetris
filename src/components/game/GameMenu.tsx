"use client";

import { PauseResumeButton, PieceGrid, Section } from "../common";
import { useTetrisContext } from "@/context";
import { TetrisAction as A } from "@/enums";

const GameMenu = () => {
  const { state, dispatch } = useTetrisContext();

  const newGame = () => {
    dispatch({ type: A.NEW_GAME });
    (document.activeElement as HTMLElement)?.blur();
  };

  const togglePauseResume = () => {
    dispatch({ type: A.TOGGLE_PAUSE_RESUME });
    (document.activeElement as HTMLElement)?.blur();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button onClick={newGame} className="w-24 rounded bg-buttonBg p-1 text-buttonText">
        New Game
      </button>

      <PauseResumeButton gameStatus={state.gameStatus} togglePauseResume={togglePauseResume} />

      <Section title="Score:">
        <span>{state.score}</span>
      </Section>

      <Section title="Level:">
        <span>{state.level}</span>
      </Section>

      <Section title="High Score:">
        <span>{state.highScore}</span>
      </Section>

      {state.nextPiece && (
        <Section title="Next:">
          <PieceGrid piece={state.nextPiece} blockSize={20} />
        </Section>
      )}
    </div>
  );
};

export { GameMenu };
