import { useTetrisContext } from "@/context";
import { TetrisAction as A } from "@/enums";

const useHelpers = () => {
  const { dispatch } = useTetrisContext();

  const movePieceDown = () => {
    dispatch({ type: A.MOVE_PIECE_DOWN });
  };

  const hardDrop = () => {
    dispatch({ type: A.HARD_DROP });
  };

  const rotatePiece = () => {
    dispatch({ type: A.ROTATE_PIECE });
  };

  const movePiece = (direction: number) => {
    dispatch({ type: A.MOVE_PIECE, payload: { dx: direction, dy: 0 } });
  };

  return { movePieceDown, hardDrop, rotatePiece, movePiece };
};

export { useHelpers };
