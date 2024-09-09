"use client";

import { useState, useEffect, useCallback } from "react";
import type { Piece } from "@/types";
import { COLS, ROWS } from "@/constants";
import { getRandomPiece, isCollision } from "./utils";

const TetrisGameLogic = () => {
  const [grid, setGrid] = useState<number[][]>(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (currentPiece && !isGameOver) {
      const interval = setInterval(() => {
        movePieceDown();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentPiece, isGameOver]);

  const initializeGame = () => {
    setGrid(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
    setScore(0);
    spawnPiece();
  };

  const spawnPiece = () => {
    setCurrentPiece(getRandomPiece());
  };

  const movePieceDown = () => {
    if (!currentPiece) return;

    const newPiece = { ...currentPiece, y: currentPiece.y + 1 };

    if (!isCollision(newPiece, grid)) {
      setCurrentPiece(newPiece);
    } else {
      mergePiece();
      spawnPiece();
      if (isCollision(currentPiece, grid)) {
        setIsGameOver(true);
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
      if (!currentPiece || isGameOver) return;

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
    [currentPiece, isGameOver]
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

  return { grid, currentPiece, isGameOver, score };
};

export { TetrisGameLogic };
