"use client";
import { useState, useEffect, useCallback } from "react";
import { getRandomPiece, isCollision, createEmptyGrid, createEmptyRow, initialState, calculateSpeed } from "@/utils";
import type { GameState, Piece, Grid } from "@/types";
import { ROWS, SCORE_INCREMENT, LINES_PER_LEVEL } from "@/constants";
import { useHighScore } from "./useHighScore";
import { GameStatus } from "@/enums";

const useTetris = () => {
  const { highScore, saveHighScore } = useHighScore();
  const [state, setState] = useState<GameState>(initialState);

  useEffect(() => {
    if (state.gameStatus === GameStatus.RUNNING && state.currentPiece) {
      const speed = calculateSpeed(state.level);
      const interval = setInterval(movePieceDown, speed);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentPiece, state.gameStatus, state.level]);

  const newGame = () => {
    setState({
      ...initialState,
      grid: createEmptyGrid(),
      currentPiece: getRandomPiece(),
      nextPiece: getRandomPiece(),
      gameStatus: GameStatus.RUNNING,
      level: 1,
    });
    (document.activeElement as HTMLElement)?.blur();
  };

  const togglePauseResume = () => {
    setState((prevState) => {
      const newStatus = prevState.gameStatus === GameStatus.PAUSED ? GameStatus.RUNNING : GameStatus.PAUSED;

      return { ...prevState, gameStatus: newStatus };
    });

    (document.activeElement as HTMLElement)?.blur();
  };

  const handlePieceMovement = (newPiece: Piece) => {
    if (!isCollision(newPiece, state.grid)) {
      setState((prevState) => ({ ...prevState, currentPiece: newPiece }));
    } else {
      mergePieceToGrid(state.currentPiece!);
      spawnNextPiece();
      if (isCollision(state.currentPiece!, state.grid)) {
        setState((prevState) => ({ ...prevState, gameStatus: GameStatus.GAME_OVER }));
        saveHighScore(state.score);
      }
    }
  };

  const movePieceDown = () => {
    if (state.currentPiece && state.gameStatus === GameStatus.RUNNING) {
      handlePieceMovement({ ...state.currentPiece, y: state.currentPiece.y + 1 });
    }
  };

  const hardDrop = () => {
    if (!state.currentPiece || state.gameStatus !== GameStatus.RUNNING) {
      return;
    }

    const newPiece = { ...state.currentPiece };

    while (!isCollision({ ...newPiece, y: newPiece.y + 1 }, state.grid)) {
      newPiece.y += 1;
    }

    handlePieceMovement(newPiece);
  };

  const spawnNextPiece = () => {
    setState((prevState) => ({
      ...prevState,
      currentPiece: state.nextPiece,
      nextPiece: getRandomPiece(),
    }));
  };

  const mergePieceToGrid = (piece: Piece) => {
    const newGrid = state.grid.map((row) => row.slice());

    piece.shape.forEach((row, y) =>
      row.forEach((value, x) => {
        if (value) {
          newGrid[piece.y + y][piece.x + x] = {
            filled: true,
            color: piece.color,
          };
        }
      })
    );

    const { updatedGrid, newScore, newLevel } = handleLineClearing(newGrid);

    setState((prevState) => ({
      ...prevState,
      grid: updatedGrid,
      score: newScore,
      level: newLevel,
    }));
  };

  const handleLineClearing = (grid: Grid) => {
    const updatedGrid = grid.filter((row) => row.some((cell) => !cell.filled));
    const linesCleared = ROWS - updatedGrid.length;

    if (linesCleared === 0) {
      return {
        updatedGrid: grid,
        newScore: state.score,
        newLevel: state.level,
      };
    }

    const emptyRows = Array.from({ length: linesCleared }, createEmptyRow);
    const newScore = state.score + linesCleared * SCORE_INCREMENT;
    const newLevel = Math.floor(newScore / (LINES_PER_LEVEL * SCORE_INCREMENT)) + 1;

    return {
      updatedGrid: [...emptyRows, ...updatedGrid],
      newScore,
      newLevel,
    };
  };

  const rotatePiece = () => {
    if (!state.currentPiece) {
      return;
    }

    const rotatedShape = state.currentPiece.shape[0]
      .map((_, i) => state.currentPiece!.shape.map((row) => row[i]))
      .reverse();

    const newPiece = { ...state.currentPiece, shape: rotatedShape };

    if (!isCollision(newPiece, state.grid)) {
      setState((prevState) => ({ ...prevState, currentPiece: newPiece }));
    }
  };

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!state.currentPiece || state.gameStatus !== GameStatus.RUNNING) {
        return;
      }

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
    [state.currentPiece, state.gameStatus]
  );

  const movePiece = (dx: number, dy: number) => {
    if (!state.currentPiece) {
      return;
    }

    const newPiece = {
      ...state.currentPiece,
      x: state.currentPiece.x + dx,
      y: state.currentPiece.y + dy,
    };

    if (!isCollision(newPiece, state.grid)) {
      setState((prevState) => ({ ...prevState, currentPiece: newPiece }));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return {
    consts: { gameState: { ...state, highScore } },
    funcs: { newGame, togglePauseResume, movePiece, movePieceDown, hardDrop, rotatePiece },
  };
};

export { useTetris };
