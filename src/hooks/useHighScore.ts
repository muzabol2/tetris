"use client";
import { useState, useEffect } from "react";

const HIGH_SCORE_KEY = "high_score";

const useHighScore = () => {
  const [highScore, setHighScore] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedHighScore = localStorage.getItem(HIGH_SCORE_KEY);

      setHighScore(storedHighScore ? parseInt(storedHighScore, 10) : 0);
    }
  }, []);

  const saveHighScore = (score: number) => {
    if (typeof window !== "undefined") {
      const currentHighScore = localStorage.getItem(HIGH_SCORE_KEY);
      const highScoreNumber = currentHighScore ? parseInt(currentHighScore, 10) : 0;

      if (score > highScoreNumber) {
        localStorage.setItem(HIGH_SCORE_KEY, score.toString());
        setHighScore(score);
      }
    }
  };

  return { highScore, saveHighScore };
};

export { useHighScore };
