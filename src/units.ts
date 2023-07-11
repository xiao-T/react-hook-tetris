// common functions

import { ShapeType, blockShape } from "./components/NextBlock";

export const getNextBlockShape = (): ShapeType => {
  const keys = Object.keys(blockShape);
  return keys[Math.floor(Math.random() * keys.length)] as ShapeType;
};
// game level
export const MaxLevel = 6;
export const MinLevel = 1;
// start line
export const MaxStartLine = 10;
export const MinStartLine = 0;
