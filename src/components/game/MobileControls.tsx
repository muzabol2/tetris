interface Props {
  movePiece: (x: number, y: number) => void;
  movePieceDown: () => void;
  rotatePiece: () => void;
}

const MobileControls = ({ movePiece, movePieceDown, rotatePiece }: Props) => (
  <div className="flex items-center justify-between p-1">
    <button onClick={() => movePiece(-1, 0)} className="rounded bg-blue-500">
      ⬅️
    </button>
    <button onClick={rotatePiece} className="rounded bg-blue-500">
      ⬆️
    </button>
    <button onClick={movePieceDown} className="rounded bg-blue-500">
      ⬇️
    </button>
    <button onClick={() => movePiece(1, 0)} className="rounded bg-blue-500">
      ➡️
    </button>
  </div>
);

export { MobileControls };
