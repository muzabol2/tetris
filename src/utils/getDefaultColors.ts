"use client";

import { SHAPES } from "@/constants";

const getDefaultColors = () =>
  Object.keys(SHAPES).reduce(
    (acc, key) => {
      acc[key] = SHAPES[key].color;

      return acc;
    },
    {} as Record<string, string>
  );

export { getDefaultColors };
