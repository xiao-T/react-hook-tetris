// move current block

import { rotateBlock } from "../units";
import { TCurrentBlock, TState } from "./index";

const move = {
  left: (state: TState): TState => {
    const { currentBlock = {} as TCurrentBlock } = state;
    let { X } = currentBlock;
    if (X) {
      X = X - 1;
    }
    return {
      ...state,
      currentBlock: { ...currentBlock, X },
    };
  },
  right: (state: TState): TState => {
    const { currentBlock = {} as TCurrentBlock, safeArea } = state;
    let { X } = currentBlock;
    if (!isNaN(X)) {
      // rightmost
      if (safeArea?.r && X >= safeArea.r) {
        return { ...state };
      }
      X = X + 1;
    }
    return {
      ...state,
      currentBlock: { ...currentBlock, X },
    };
  },
  down: (state: TState): TState => {
    const { currentBlock = {} as TCurrentBlock, safeArea } = state;
    let { Y } = currentBlock;
    if (!isNaN(Y)) {
      // bottommost
      if (safeArea?.b && Y >= safeArea.b) {
        return { ...state };
      }
      Y = Y + 1;
    }
    return {
      ...state,
      currentBlock: { ...currentBlock, Y },
    };
  },
  rotate: (state: TState): TState => {
    let { currentBlock } = state;

    return {
      ...state,
      currentBlock: {
        ...currentBlock,
        shape: rotateBlock(currentBlock?.shape!),
      } as TCurrentBlock,
    };
  },
};

export default move;
