"use client";
import { useState, useEffect, useCallback } from "react";
import { getRandomPiece, isCollision } from "./utils";
import { GameStatus, type Piece } from "./types";
import { COLS, ROWS } from "./constants";

const TetrisGameLogic = () => {
  const [grid, setGrid] = useState<number[][]>(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [score, setScore] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.NOT_STARTED);

  useEffect(() => {
    if (gameStatus === GameStatus.RUNNING && currentPiece) {
      const interval = setInterval(() => {
        movePieceDown();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentPiece, gameStatus]);

  const newGame = () => {
    setGrid(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
    setScore(0);
    generatePiece();
    setGameStatus(GameStatus.RUNNING);
  };

  const pauseGame = () => {
    setGameStatus(GameStatus.PAUSED);
  };

  const resumeGame = () => {
    if (gameStatus !== GameStatus.GAME_OVER) {
      setGameStatus(GameStatus.RUNNING);
    }
  };

  const generatePiece = () => {
    setCurrentPiece(getRandomPiece());
  };

  const movePieceDown = () => {
    if (!currentPiece || gameStatus !== GameStatus.RUNNING) return;

    const newPiece = { ...currentPiece, y: currentPiece.y + 1 };

    if (!isCollision(newPiece, grid)) {
      setCurrentPiece(newPiece);
    } else {
      mergePiece();
      generatePiece();
      if (isCollision(currentPiece, grid)) {
        setGameStatus(GameStatus.GAME_OVER);
      }
    }
  };

  const mergePiece = () => {
    if (!currentPiece) return;

    const newGrid = grid.map((row) => row.slice());

    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          newGrid[currentPiece.y + y][currentPiece.x + x] = 1;
        }
      }
    }
    setGrid(newGrid);
    checkForFullLines();
  };

  const checkForFullLines = () => {
    const newGrid = grid.filter((row) => row.some((cell) => cell === 0));
    const linesCleared = ROWS - newGrid.length;

    if (linesCleared > 0) {
      newGrid.unshift(...Array.from({ length: linesCleared }, () => Array(COLS).fill(0)));
      setGrid(newGrid);
      setScore((prev) => prev + linesCleared * 100);
    }
  };

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!currentPiece || gameStatus !== GameStatus.RUNNING) return;

      switch (e.key) {
        case "ArrowLeft":
          movePiece(-1, 0);
          break;
        case "ArrowRight":
          movePiece(1, 0);
          break;
        case "ArrowDown":
          movePieceDown();
          break;
        case "ArrowUp":
          rotatePiece();
          break;
      }
    },
    [currentPiece, gameStatus]
  );

  const movePiece = (dx: number, dy: number) => {
    if (!currentPiece) return;

    const newPiece = {
      ...currentPiece,
      x: currentPiece.x + dx,
      y: currentPiece.y + dy,
    };

    if (!isCollision(newPiece, grid)) {
      setCurrentPiece(newPiece);
    }
  };

  const rotatePiece = () => {
    if (!currentPiece) return;

    const rotatedShape = currentPiece.shape[0].map((_, i) => currentPiece.shape.map((row) => row[i])).reverse();
    const newPiece = { ...currentPiece, shape: rotatedShape };

    if (!isCollision(newPiece, grid)) {
      setCurrentPiece(newPiece);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return {
    consts: { grid, currentPiece, gameStatus, score },
    funcs: { newGame, pauseGame, resumeGame },
  };
};

export { TetrisGameLogic };
