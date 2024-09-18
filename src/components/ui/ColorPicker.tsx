"use client";

import { PieceGrid } from "../common";
import { SHAPES } from "@/constants";
import { useTetrisContext } from "@/context";
import { TetrisAction as A } from "@/enums";
import { useFeedbackMsg } from "@/hooks";
import { getDefaultColors } from "@/utils";
import { useEffect, useState } from "react";

type ShapeKey = "I" | "J" | "L" | "O" | "S" | "T" | "Z";

export const ColorPicker = () => {
  const { state, dispatch } = useTetrisContext();
  const [selectedShape, setSelectedShape] = useState<ShapeKey | null>(null);
  const [tempColors, setTempColors] = useState<Record<ShapeKey, string>>(getDefaultColors);
  const [feedbackMessage, showMessage] = useFeedbackMsg();

  useEffect(() => {
    setTempColors(state.colors as Record<ShapeKey, string>);
  }, [state.colors]);

  const handleColorChange = (shape: ShapeKey, color: string) => {
    setTempColors((prevColors) => ({
      ...prevColors,
      [shape]: color,
    }));
  };

  const handleBlockClick = (shape: ShapeKey) => {
    setSelectedShape(shape);
  };

  const applyColors = () => {
    dispatch({ type: A.SET_COLORS, payload: { colors: tempColors } });
    showMessage("Colors applied");
  };

  const resetToDefault = () => {
    const defaultColors = Object.keys(SHAPES).reduce(
      (acc, key) => {
        acc[key as ShapeKey] = SHAPES[key as ShapeKey].color;

        return acc;
      },
      {} as Record<ShapeKey, string>
    );

    setTempColors(defaultColors);
    showMessage("Colors reset to default.");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(SHAPES).map((shapeKey) => (
          <div key={shapeKey} className="flex items-center cursor-pointer justify-center">
            <PieceGrid
              piece={{
                shape: SHAPES[shapeKey as ShapeKey].shape,
                color: tempColors[shapeKey as ShapeKey] || SHAPES[shapeKey as ShapeKey].color,
                x: 0,
                y: 0,
              }}
              blockSize={20}
              onClick={() => handleBlockClick(shapeKey as ShapeKey)}
            />
            {selectedShape === shapeKey && (
              <input
                type="color"
                value={tempColors[shapeKey as ShapeKey] || SHAPES[shapeKey as ShapeKey].color}
                onChange={(e) => handleColorChange(shapeKey as ShapeKey, e.target.value)}
                className="border border-border ml-2 cursor-pointer"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <button onClick={resetToDefault} className="rounded bg-red-500 text-white p-2">
          Reset
        </button>
        <button onClick={applyColors} className="rounded bg-buttonBg text-buttonText p-2">
          Apply
        </button>
      </div>
      {feedbackMessage && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 border border-green-200 rounded">{feedbackMessage}</div>
      )}
    </div>
  );
};
