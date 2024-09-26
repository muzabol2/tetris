"use client";

import { TetrisAction } from "@/enums";
import { useTetrisContext } from "@/hooks";
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
    dispatch({ type: TetrisAction.SET_COLORS, payload: { colors: tempColors } });
    showMessage("Colors applied");
  };

  const resetToDefault = () => {
    const defaultColors = getDefaultColors();

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
