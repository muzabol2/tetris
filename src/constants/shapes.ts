const SHAPES: Record<string, { shape: number[][]; color: string }> = {
  I: { shape: [[1, 1, 1, 1]], color: "#00FFFF" }, // Cyan
  J: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "#0000FF", // Blue
  },
  L: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "#FFA500", // Orange
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "#FFFF00", // Yellow
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "#00FF00", // Green
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "#800080", // Purple
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "#FF0000", // Red
  },
};

export { SHAPES };
