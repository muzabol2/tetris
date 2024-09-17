"use client";

import { PauseResumeButton, PieceGrid, Section } from "../common";
import { useColorContext, useTetrisContext } from "@/context";
import { TetrisAction } from "@/enums";

const GameMenu = () => {
  const { colors } = useColorContext();
  const { state, dispatch } = useTetrisContext();

  const newGame = () => {
    dispatch({ type: TetrisAction.NEW_GAME, payload: { colors } });
    (document.activeElement as HTMLElement)?.blur();
  };

  const togglePauseResume = () => {
    dispatch({ type: TetrisAction.TOGGLE_PAUSE_RESUME });
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
