"use client";

import type { TetrisAction } from "@/enums";
import type { Piece } from "@/types";

type Actions =
  | { type: TetrisAction.NEW_GAME }
  | { type: TetrisAction.TOGGLE_PAUSE_RESUME }
  | { type: TetrisAction.MOVE_PIECE; payload: { dx: number; dy: number } }
  | { type: TetrisAction.HARD_DROP }
  | { type: TetrisAction.ROTATE_PIECE }
  | { type: TetrisAction.MOVE_PIECE_DOWN }
  | { type: TetrisAction.HANDLE_PIECE_MOVEMENT; payload: { newPiece: Piece } }
  | { type: TetrisAction.MERGE_PIECE_TO_GRID; payload: { piece: Piece } }
  | { type: TetrisAction.SPAWN_NEXT_PIECE }
  | { type: TetrisAction.SET_COLORS; payload: { colors: Record<string, string> } };

export type { Actions };
