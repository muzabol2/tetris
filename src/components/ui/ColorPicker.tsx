import { PieceGrid } from "../common";
import { SHAPES } from "@/constants";
import { useEffect, useState } from "react";

type ShapeKey = "I" | "J" | "L" | "O" | "S" | "T" | "Z";

export const ColorPicker = () => {
  const [colors, setColors] = useState<Record<ShapeKey, string>>({
    I: "#00BFFF",
    J: "#00008B",
    L: "#FF8C00",
    O: "#FFD700",
    S: "#32CD32",
    T: "#800080",
    Z: "#B22222",
  });
  const [selectedShape, setSelectedShape] = useState<string | null>(null);

  // Load saved colors from localStorage
  useEffect(() => {
    const savedColors = localStorage.getItem("tetris-colors");

    if (savedColors) {
      setColors(JSON.parse(savedColors));
    }
  }, []);

  // Save colors to localStorage
  useEffect(() => {
    localStorage.setItem("tetris-colors", JSON.stringify(colors));
  }, [colors]);

  const handleColorChange = (shape: string, color: string) => {
    setColors({ ...colors, [shape]: color });
  };

  const handleBlockClick = (shape: string) => {
    setSelectedShape(shape);
  };

  const applyColors = () => {
    console.log("Applying colors", colors);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(colors).map((shapeKey) => (
          <div key={shapeKey} className="flex items-center cursor-pointer justify-center">
            <PieceGrid
              piece={{
                shape: SHAPES[shapeKey].shape,
                color: colors[shapeKey as ShapeKey],
                x: 0,
                y: 0,
              }}
              blockSize={20}
              onClick={() => handleBlockClick(shapeKey)}
            />
            {selectedShape === shapeKey && (
              <input
                type="color"
                value={colors[shapeKey as ShapeKey]}
                onChange={(e) => handleColorChange(shapeKey, e.target.value)}
                className="border border-border ml-2 cursor-pointer"
              />
            )}
          </div>
        ))}
      </div>

      <button onClick={applyColors} className="absolute bottom-4 right-4 rounded bg-buttonBg text-buttonText p-2">
        Apply
      </button>
    </div>
  );
};
