"use client";
import { useState, useEffect, useCallback } from "react";
import { getRandomPiece, isCollision } from "@/utils";
import { GameStatus, type Piece } from "@/types";
import { COLS, ROWS, SCORE_INCREMENT } from "@/constants";
import { useHighScore } from "./useHighScore";

const useTetris = () => {
  const { highScore, saveHighScore } = useHighScore();
  const [grid, setGrid] = useState<number[][]>(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [score, setScore] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.NOT_STARTED);
  const [nextPiece, setNextPiece] = useState<Piece | null>(null);

  useEffect(() => {
    if (gameStatus === GameStatus.RUNNING && currentPiece) {
      const interval = setInterval(() => {
        movePieceDown();
      }, 1000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPiece, gameStatus]);

  const newGame = () => {
    setGrid(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
    setScore(0);
    setCurrentPiece(getRandomPiece());
    setNextPiece(getRandomPiece());
    setGameStatus(GameStatus.RUNNING);
    (document.activeElement as HTMLElement)?.blur();
  };

  const pauseGame = () => {
    setGameStatus(GameStatus.PAUSED);
    (document.activeElement as HTMLElement)?.blur();
  };

  const resumeGame = () => {
    if (gameStatus !== GameStatus.GAME_OVER) {
      setGameStatus(GameStatus.RUNNING);
    }
    (document.activeElement as HTMLElement)?.blur();
  };

  const generatePiece = () => {
    setCurrentPiece(nextPiece);
    setNextPiece(getRandomPiece());
  };

  const movePieceDown = () => {
    if (!currentPiece || gameStatus !== GameStatus.RUNNING) return;

    const newPiece = { ...currentPiece, y: currentPiece.y + 1 };

    handlePieceMovement(newPiece);
  };

  const hardDrop = () => {
    if (!currentPiece || gameStatus !== GameStatus.RUNNING) return;

    const newPiece = { ...currentPiece };

    while (!isCollision({ ...newPiece, y: newPiece.y + 1 }, grid)) {
      newPiece.y += 1;
    }

    handlePieceMovement(newPiece);
  };

  const handlePieceMovement = (newPiece: Piece) => {
    if (!isCollision(newPiece, grid)) {
      setCurrentPiece(newPiece);
    } else {
      mergePiece(currentPiece);
      generatePiece();

      if (isCollision(currentPiece, grid)) {
        setGameStatus(GameStatus.GAME_OVER);
        saveHighScore(score);
      }
    }
  };

  const mergePiece = (pieceToMerge: Piece | null) => {
    if (!pieceToMerge) return;

    const newGrid = grid.map((row) => row.slice());

    for (let y = 0; y < pieceToMerge.shape.length; y++) {
      for (let x = 0; x < pieceToMerge.shape[y].length; x++) {
        if (pieceToMerge.shape[y][x]) {
          newGrid[pieceToMerge.y + y][pieceToMerge.x + x] = 1;
        }
      }
    }
    setGrid(newGrid);
    checkForFullLines(newGrid);
  };

  const checkForFullLines = (currentGrid: number[][]) => {
    const newGrid = currentGrid.filter((row) => row.some((cell) => cell === 0));
    const linesCleared = ROWS - newGrid.length;

    if (linesCleared > 0) {
      newGrid.unshift(...Array.from({ length: linesCleared }, () => Array(COLS).fill(0)));
      setGrid(newGrid);
      setScore((prev) => prev + linesCleared * SCORE_INCREMENT);
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
        case " ": // Space
          hardDrop();
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    consts: { grid, currentPiece, nextPiece, gameStatus, score, highScore },
    funcs: { newGame, pauseGame, resumeGame, movePiece, movePieceDown, hardDrop, rotatePiece },
  };
};

export { useTetris };
