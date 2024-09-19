import { SHAPES } from "@/constants";
import { useTetrisContext } from "@/context";
import { TetrisAction as A } from "@/enums";
import { getDefaultColors } from "@/utils";
import { useEffect, useState } from "react";

type ShapeKey = "I" | "J" | "L" | "O" | "S" | "T" | "Z";

const useHelpers = () => {
  const { state, dispatch } = useTetrisContext();
  const [selectedShape, setSelectedShape] = useState<ShapeKey | null>(null);
  const [tempColors, setTempColors] = useState<Record<ShapeKey, string>>(getDefaultColors);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const showMessage = (message: string, duration: number = 2000) => {
    setFeedbackMessage(message);
    setTimeout(() => {
      setFeedbackMessage(null);
    }, duration);
  };

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

  return {
    selectedShape,
    tempColors,
    feedbackMessage,
    handleColorChange,
    handleBlockClick,
    applyColors,
    resetToDefault,
  };
};

export { useHelpers };
