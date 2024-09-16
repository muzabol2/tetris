"use client";
import { GameStatus } from "@/enums";
import { PieceGrid, Section } from "../common";
import type { Piece } from "@/types";

type Props = {
  score: number;
  highScore: number;
  gameStatus: GameStatus;
  nextPiece: Piece | null;
  newGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
};

const GameMenu = ({ score, highScore, gameStatus, nextPiece, newGame, pauseGame, resumeGame }: Props) => (
  <div className="flex flex-col items-center gap-2">
    <button onClick={newGame} className="w-24 rounded bg-buttonBg p-1 text-buttonText">
      New Game
    </button>

    {gameStatus !== GameStatus.NOT_STARTED &&
      gameStatus !== GameStatus.GAME_OVER &&
      (gameStatus === GameStatus.RUNNING ? (
        <button onClick={pauseGame} className="w-24 rounded bg-yellow-500 px-2 py-1 text-buttonText">
          Pause
        </button>
      ) : (
        <button onClick={resumeGame} className="w-24 rounded bg-blue-500 px-2 py-1 text-buttonText">
          Resume
        </button>
      ))}

    <Section title="Score:">
      <span>{score}</span>
    </Section>

    {nextPiece && (
      <Section title="Next:">
        <PieceGrid piece={nextPiece} blockSize={20} />
      </Section>
    )}

    <Section title="High Score:">
      <span>{highScore}</span>
    </Section>
  </div>
);

export { GameMenu };
