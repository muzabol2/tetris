"use client";

import { PauseResumeButton } from "./PauseResumeButton";
import { Section } from "./Section";
import { useHelpers } from "./helpers";
import { PieceGrid } from "@/components/common";

const GameMenu = () => {
  const { state, newGame, togglePauseResume } = useHelpers();

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
