import { GameStatus } from "@/types";

type Props = {
  score: number;
  gameStatus: GameStatus;
  newGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
};

const GameMenu = ({ score, gameStatus, newGame, pauseGame, resumeGame }: Props) => (
  <div className="flex items-center justify-between p-1">
    <span className="rounded border border-border px-2 py-1 font-semibold text-foreground">Score: {score}</span>

    {gameStatus !== GameStatus.NOT_STARTED &&
      gameStatus !== GameStatus.GAME_OVER &&
      (gameStatus === GameStatus.RUNNING ? (
        <button onClick={pauseGame} className="rounded bg-yellow-500 px-2 py-1 text-buttonText">
          Pause
        </button>
      ) : (
        <button onClick={resumeGame} className="rounded bg-blue-500 px-2 py-1 text-buttonText">
          Resume
        </button>
      ))}

    <button onClick={newGame} className="rounded bg-buttonBg px-2 py-1 text-buttonText">
      New Game
    </button>
  </div>
);

export { GameMenu };
