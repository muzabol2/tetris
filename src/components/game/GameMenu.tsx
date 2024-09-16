"use client";
import { PieceGrid, Section, PauseResumeButton } from "../common";
import type { GameState } from "@/types";

type Props = {
  gameState: GameState;
  newGame: () => void;
  togglePauseResume: () => void;
};

const GameMenu = ({ gameState, newGame, togglePauseResume }: Props) => (
  <div className="flex flex-col items-center gap-2">
    <button onClick={newGame} className="w-24 rounded bg-buttonBg p-1 text-buttonText">
      New Game
    </button>

    <PauseResumeButton gameStatus={gameState.gameStatus} togglePauseResume={togglePauseResume} />

    <Section title="Score:">
      <span>{gameState.score}</span>
    </Section>

    <Section title="Level:">
      <span>{gameState.level}</span>
    </Section>

    <Section title="High Score:">
      <span>{gameState.highScore}</span>
    </Section>

    {gameState.nextPiece && (
      <Section title="Next:">
        <PieceGrid piece={gameState.nextPiece} blockSize={20} />
      </Section>
    )}
  </div>
);

export { GameMenu };
