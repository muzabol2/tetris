const SHAPES: Record<string, { shape: number[][]; color: string }> = {
  I: { shape: [[1, 1, 1, 1]], color: "#7FDBFF" }, // Soft Cyan
  J: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "#0074D9", // Soft Blue
  },
  L: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "#FF851B", // Soft Orange
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "#FFDC00", // Soft Yellow
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "#2ECC40", // Soft Green
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "#B10DC9", // Soft Purple
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "#FF4136", // Soft Red
  },
};

export { SHAPES };
