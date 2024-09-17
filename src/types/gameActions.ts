import type { Piece } from "./gamePiece";
import type { TetrisAction as A } from "@/enums";

type GameActions =
  | { type: A.NEW_GAME; payload: { colors: Record<string, string> } }
  | { type: A.TOGGLE_PAUSE_RESUME }
  | { type: A.MOVE_PIECE; payload: { dx: number; dy: number } }
  | { type: A.HARD_DROP }
  | { type: A.ROTATE_PIECE }
  | { type: A.MOVE_PIECE_DOWN }
  | { type: A.HANDLE_PIECE_MOVEMENT; payload: { newPiece: Piece; colors: Record<string, string> } }
  | { type: A.MERGE_PIECE_TO_GRID; payload: { piece: Piece } }
  | { type: A.SPAWN_NEXT_PIECE; payload: { colors: Record<string, string> } };

export type { GameActions };
