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
// rotate block
type TShape = number[][];
export const rotateBlock = (shape: TShape): TShape => {
  const rows = shape.length;
  const columns = shape[0].length;
  const newShape = [];

  for (let i = 0; i < columns; i++) {
    let newRow = [];
    for (let j = 0; j < rows; j++) {
      newRow.push(shape[j][i]);
    }
    newShape.push(newRow.reverse());
  }
  return newShape;
};
// calculate safe area for current block
export type TSafeArea = {
  t: number;
  r: number;
  b: number;
  l: number;
};
export const calcSafeArea = (
  currentBlock: TCurrentBlock,
  blockMap: TShape,
  safeArea: TSafeArea
): TSafeArea => {
  const newSafeArea = {
    t: 0,
    r: 0,
    b: 0,
    l: 0,
  };
  const { shape } = currentBlock;
  newSafeArea.r = currentBlock.X + shape[0].length + 1;
  // newSafeArea.b = MaxRows - shape.length;
  newSafeArea.b = getBottomEdge(currentBlock, blockMap, safeArea);
  newSafeArea.l = currentBlock.X;
  return newSafeArea;
};
// find the bottom edge based on the current block map and current block
// it determines where the current block can be placed
const getBottomEdge = (
  currentBlock: TCurrentBlock,
  blockMap: TShape,
  safeArea: TSafeArea
): number => {
  let bottom = safeArea.b;
  const { Y, X, shape } = currentBlock;
  const shapeDepth = shape.length;
  const shapeWidth = shape[0].length;
  const start = Y + shapeDepth;
  const flattedShape = shape.flat(Infinity);
  // if (start > bottom) {
  //   return bottom;
  // }
  for (let i = start; i < blockMap.length - shapeDepth + 1; i++) {
    const shapeShadow = [];
    let j = 0;
    while (j < shapeDepth) {
      shapeShadow.push(blockMap[i + j].slice(X, X + shapeWidth));
      j++;
    }
    // console.log(shapeShadow, shape, "shape-shapeShadow");
    const flattedShadow = shapeShadow.flat(Infinity);
    // if two array are merged, there is no value more than 1
    // then the shadow shape can place current shape
    const canBeMerge = flattedShape
      .map((item, index) => {
        return Number(item) + Number(flattedShadow[index]);
      })
      .every((item) => item <= 1);
    // console.log(flattedShadow, canBeMerge, "----", flattedShape);
    if (canBeMerge) {
      bottom = i;
    } else {
      break;
    }
  }
  return bottom;
};
// generate current block based on next block
export type TCurrentBlock = {
  X: number;
  Y: number;
  shapeType: ShapeType;
  shape: number[][];
  isLock: boolean;
};
export const getCurrentBlock = (type: ShapeType): TCurrentBlock => {
  return {
    shapeType: type,
    X: Math.ceil((MaxColumns - blockShape[type][0].length) / 2),
    Y: 0,
    shape: blockShape[type],
    isLock: false,
  };
};
// merge the current block and block map
export const mergeCurrentBlockIntoBlockMap = (
  currentBlock: TCurrentBlock,
  blockMap: TShape
): TShape => {
  const { X = 0, Y = 0 } = currentBlock || {};
  const currentShape = currentBlock?.shape!;
  // merge `block map` and `current shape`
  const cachedBlockMap = blockMap?.map((item) => [...item]);
  currentShape?.forEach((item, index) => {
    item.forEach((subItem, subIndex) => {
      if (subItem && cachedBlockMap) {
        cachedBlockMap[index + Y][subIndex + X] = 1;
      }
    });
  });
  return cachedBlockMap;
};
