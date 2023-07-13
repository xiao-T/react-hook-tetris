// move current block

import gameController from "../gameController";
import { MaxColumns, TCurrentBlock, calcSafeArea, rotateBlock } from "../units";
import { TState } from "./index";

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
        // if the current block reaches bottom
        // clear game controller timer
        // and create new current block based on next block,
        // then generate new next block
        gameController.next(state);
        return {
          ...state,
          currentBlock: { ...currentBlock, isLock: true },
        };
      }
      Y = Y + 1;
    }
    return {
      ...state,
      currentBlock: { ...currentBlock, Y },
    };
  },
  rotate: (state: TState): TState => {
    const { currentBlock } = state;
    const newShape = rotateBlock(currentBlock?.shape!);
    // disable rotate, when`X + block length` is more than max columns
    if (currentBlock?.X! + newShape[0].length! > MaxColumns) {
      return { ...state };
    }
    const newSafeArea = calcSafeArea(newShape);
    return {
      ...state,
      currentBlock: {
        ...currentBlock,
        shape: newShape,
      } as TCurrentBlock,
      safeArea: {
        ...newSafeArea,
      },
    };
  },
};

export default move;
