"use client";

import { GameStatus } from "@/enums";

type Props = {
  gameStatus: GameStatus;
  togglePauseResume: () => void;
};

const PauseResumeButton = ({ gameStatus, togglePauseResume }: Props) => (
  <>
    {gameStatus !== GameStatus.NOT_STARTED && gameStatus !== GameStatus.GAME_OVER && (
      <button
        onClick={togglePauseResume}
        className={`w-24 rounded px-2 py-1 text-buttonText ${
          gameStatus === GameStatus.RUNNING ? "bg-yellow-500" : "bg-blue-500"
        }`}
      >
        {gameStatus === GameStatus.RUNNING ? "Pause" : "Resume"}
      </button>
    )}
  </>
);

export { PauseResumeButton };
