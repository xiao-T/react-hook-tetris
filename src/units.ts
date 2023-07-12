// common functions
// block shape
export const blockShape = {
  I: [[1, 1, 1, 1]],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
};
export type ShapeType = keyof typeof blockShape;
// get next block shape
export const getNextBlockShape = (): ShapeType => {
  const keys = Object.keys(blockShape);
  return keys[Math.floor(Math.random() * keys.length)] as ShapeType;
};
// get start block map
export const MaxRows = 20;
export const MaxColumns = 10;
export const getStartBlockMap = (startLine: number = 0) => {
  const blockMap = [];
  const row = [];
  const startLines = [];
  for (let i = 0; i < MaxColumns; i++) {
    row.push(0);
  }
  for (let i = 0; i < MaxRows - startLine; i++) {
    blockMap.push(row);
  }
  // create random start line
  for (let i = 0; i < startLine; i++) {
    const startLineRow = [];
    for (let j = 0; j < MaxColumns; j++) {
      startLineRow.push(Math.random() > 0.5 ? 1 : 0);
    }
    startLines.push(startLineRow);
  }
  return [...blockMap, ...startLines];
};
// game level
export const levels = [900, 750, 600, 450, 300, 150];
export const MaxLevel = levels.length;
export const MinLevel = 1;
// start line
export const MaxStartLine = 10;
export const MinStartLine = 0;
