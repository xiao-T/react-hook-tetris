// move current block

import { TCurrentBlock, TState } from "./index";

const move = {
  left: (state: TState): TState => {
    let { currentBlock } = state;
    const cachedCurrentBlock = Object.assign({}, { ...currentBlock });
    if (cachedCurrentBlock?.X) {
      const X = cachedCurrentBlock.X || 0;
      cachedCurrentBlock.X = X - 1;
    }
    return {
      ...state,
      currentBlock: { ...cachedCurrentBlock } as TCurrentBlock,
    };
  },
  right: (state: TState): TState => {
    const { currentBlock, safeArea } = state;
    const cachedCurrentBlock = Object.assign({}, { ...currentBlock });
    if (!isNaN(cachedCurrentBlock?.X!)) {
      const X = cachedCurrentBlock.X || 0;
      // rightmost
      if (safeArea?.r && X >= safeArea.r) {
        return { ...state };
      }
      cachedCurrentBlock.X = X + 1;
    }
    return {
      ...state,
      currentBlock: { ...cachedCurrentBlock } as TCurrentBlock,
    };
  },
  down: (state: TState): TState => {
    let { currentBlock, safeArea } = state;
    const cachedCurrentBlock = Object.assign({}, { ...currentBlock });
    if (!isNaN(cachedCurrentBlock?.Y!)) {
      const Y = cachedCurrentBlock.Y || 0;
      // bottommost
      if (safeArea?.b && Y >= safeArea.b) {
        return { ...state };
      }
      cachedCurrentBlock.Y = Y + 1;
    }
    return {
      ...state,
      currentBlock: { ...cachedCurrentBlock } as TCurrentBlock,
    };
  },
};

export default move;
