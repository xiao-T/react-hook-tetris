// scores
export const clearPoints = [100, 300, 700, 1500];
// letter block shape
//used when the game has not start yet
export const letterBlockShape = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
];
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
// create block row
type TBlockRow = number[];
type TBlockType = "Blank" | "Fill";
export const getBlockRow = (type: TBlockType): TBlockRow => {
  const blankRow = [];
  for (let i = 0; i < MaxColumns; i++) {
    if (type === "Blank") {
      blankRow.push(0);
    }
    if (type === "Fill") {
      blankRow.push(1);
    }
  }
  return blankRow;
};
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
  const row = getBlockRow("Blank");
  const startLines = [];
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
export type TShape = number[][];
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

// generate current block based on next block
export const emptyBlock: TCurrentBlock = {
  X: 0,
  Y: 0,
  shape: [[]],
  shapeType: "T",
};
export type TCurrentBlock = {
  X: number;
  Y: number;
  shapeType: ShapeType;
  shape: TShape;
};
export const getCurrentBlock = (type: ShapeType): TCurrentBlock => {
  return {
    shapeType: type,
    X: Math.ceil((MaxColumns - blockShape[type][0].length) / 2),
    Y: 0,
    shape: blockShape[type],
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

// determine if the current block has been reached bottom
// and block atom and the current block are overlapping
type TPosition = {
  x: number;
  y: number;
};
export const isShouldBeLock = (
  currentBlock: TCurrentBlock,
  bottomEdge: number,
  position: TPosition
): boolean => {
  const rect = {
    t: currentBlock?.Y!,
    l: currentBlock?.X!,
    b: currentBlock?.Y! + currentBlock?.shape.length!,
    r: currentBlock?.X! + currentBlock?.shape[0].length!,
  };
  return (
    rect.l <= position.x &&
    rect.r > position.x &&
    rect.t <= position.y &&
    rect.b > position.y &&
    bottomEdge === currentBlock?.Y
  );
};

// determine if the current block can be placed into next/sibling shadow shape
export const canBePlaced = (
  blockMap: TShape,
  block: TCurrentBlock,
  position: TPosition
): boolean => {
  const { x, y } = position;
  const { shape } = block;
  const shapeDepth = shape.length;
  const shapeWidth = shape[0].length;
  const flattedShape = shape.flat(Infinity);
  const shapeShadow = [];
  for (let i = y; i < y + shapeDepth; i++) {
    shapeShadow.push(blockMap[i].slice(x, x + shapeWidth));
  }
  const flattedShadow = shapeShadow.flat(Infinity);
  // if two array are merged, there is no value more than 1
  // then the shadow shape can place current shape
  const canBeMerge = flattedShape
    .map((item, index) => {
      return Number(item) + Number(flattedShadow[index]);
    })
    .every((item) => item <= 1);
  return canBeMerge;
};
// find bottom edge
// find the bottom edge based on the current block map and current block
// it determines where the current block can be placed
export const getBottomEdge = (
  blockMap: TShape,
  block: TCurrentBlock,
  position: TPosition
): number => {
  let bottomEdge = 0;
  const { x, y } = position;
  for (let i = y; i <= MaxRows - block.shape.length; i++) {
    const result = canBePlaced(blockMap, block, {
      x,
      y: i,
    });
    if (result) {
      bottomEdge = i;
    }
    if (!result) {
      break;
    }
  }
  return bottomEdge;
};

// find clear lines
export const getClearLines = (blockMap: TShape): TBlockRow => {
  const fillFullRows: TBlockRow = [];
  blockMap.forEach((item, index) => {
    const count = item.reduce((p, n) => p + n);
    if (count === MaxColumns) {
      fillFullRows.push(index);
    }
  });
  return fillFullRows;
};
// create new block patch
export const getBlockPatch = (
  length: number,
  blockType: TBlockType = "Blank"
): TShape => {
  const patch = [];
  const blankRow = getBlockRow(blockType);
  while (length) {
    patch.push(blankRow);
    length--;
  }
  return patch;
};
// check if the game is over
export const isGameOver = (
  blockMap: TShape,
  currentBlock: TCurrentBlock
): boolean => {
  const { X, shape } = currentBlock;
  const shapeWidth = shape[0].length;
  const topShadowShape = blockMap[0].slice(X, X + shapeWidth);
  return topShadowShape.reduce((p, n) => p + n) > 0;
};
