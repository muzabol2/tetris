"use client";

import { useHighScore } from "./useHighScore";
import { useLocalStorage } from "./useLocalStore";
import { useColorContext } from "@/context";
import { GameStatus as S } from "@/enums";
import type { Piece } from "@/types";
import {
  calculateSpeed,
  createNewGameState,
  getRandomPiece,
  handleLineClearing,
  initialState,
  isCollision,
} from "@/utils";
import { useCallback, useEffect } from "react";

const useTetris = () => {
  const { highScore, saveHighScore } = useHighScore();
  const [state, setState] = useLocalStorage(initialState);
  const { colors } = useColorContext();

  useEffect(() => {
    if (state.gameStatus === S.RUNNING && state.currentPiece) {
      const speed = calculateSpeed(state.level);
      const interval = setInterval(movePieceDown, speed);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentPiece, state.gameStatus, state.level]);

  const newGame = () => {
    setState(createNewGameState(colors));
    (document.activeElement as HTMLElement)?.blur();
  };

  const togglePauseResume = () => {
    setState((prevState) => ({
      ...prevState,
      gameStatus: prevState.gameStatus === S.PAUSED ? S.RUNNING : S.PAUSED,
    }));

    (document.activeElement as HTMLElement)?.blur();
  };

  const handlePieceMovement = (newPiece: Piece) => {
    if (!isCollision(newPiece, state.grid)) {
      setState((prevState) => ({ ...prevState, currentPiece: newPiece }));
    } else {
      mergePieceToGrid(state.currentPiece!);
      spawnNextPiece();
      if (isCollision(state.currentPiece!, state.grid)) {
        setState((prevState) => ({ ...prevState, gameStatus: S.GAME_OVER }));
        saveHighScore(state.score);
      }
    }
  };

  const movePieceDown = () => {
    if (state.currentPiece && state.gameStatus === S.RUNNING) {
      handlePieceMovement({
        ...state.currentPiece,
        y: state.currentPiece.y + 1,
      });
    }
  };

  const hardDrop = () => {
    if (!state.currentPiece || state.gameStatus !== S.RUNNING) {
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
      nextPiece: getRandomPiece(colors),
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

    const { updatedGrid, newScore, newLevel } = handleLineClearing(newGrid, state.score, state.level);

    setState((prevState) => ({
      ...prevState,
      grid: updatedGrid,
      score: newScore,
      level: newLevel,
    }));
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
      if (!state.currentPiece || state.gameStatus !== S.RUNNING) {
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
