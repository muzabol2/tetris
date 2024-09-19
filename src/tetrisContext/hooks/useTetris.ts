import { Context } from "../Context";
import { useContext } from "react";

export const useTetris = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useTetris must be used within a TetrisProvider");
  }

  return context;
};
