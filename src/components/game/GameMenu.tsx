"use client";
import { GameStatus, type Piece } from "@/types";
import { NextPiece } from "./NextPiece";

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

    <span className="flex w-24 flex-col items-center justify-center rounded border border-border p-1 text-foreground">
      <span>Score:</span>
      <span>{score}</span>
    </span>

    <NextPiece nextPiece={nextPiece} />

    <span className="flex w-24 flex-col items-center justify-center rounded border border-border p-1 text-foreground">
      <span>High Score:</span>
      <span>{highScore}</span>
    </span>
  </div>
);

export { GameMenu };
