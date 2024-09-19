import type { Piece } from "../types/gamePiece";
import type { TetrisAction as A } from "@/enums";

type Actions =
  | { type: A.NEW_GAME }
  | { type: A.TOGGLE_PAUSE_RESUME }
  | { type: A.MOVE_PIECE; payload: { dx: number; dy: number } }
  | { type: A.HARD_DROP }
  | { type: A.ROTATE_PIECE }
  | { type: A.MOVE_PIECE_DOWN }
  | { type: A.HANDLE_PIECE_MOVEMENT; payload: { newPiece: Piece } }
  | { type: A.MERGE_PIECE_TO_GRID; payload: { piece: Piece } }
  | { type: A.SPAWN_NEXT_PIECE }
  | { type: A.SET_COLORS; payload: { colors: Record<string, string> } };

export type { Actions };
