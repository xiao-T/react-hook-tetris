// move current block

import gameController from "../gameController";
import { MaxColumns, TCurrentBlock, calcSafeArea, rotateBlock } from "../units";
import { TState } from "./index";

const move = {
  left: (state: TState): TState => {
    const {
      currentBlock = {} as TCurrentBlock,
      blockMap,
      safeArea,
      lockStatus,
    } = state;
    console.log(lockStatus);
    if (lockStatus === "ing") {
      return { ...state };
    }
    let { X } = currentBlock;
    if (X) {
      X = X - 1;
    }
    const newBlock = { ...currentBlock, X };
    const newSafeArea = calcSafeArea(newBlock, blockMap!, safeArea!);
    return {
      ...state,
      currentBlock: newBlock,
      safeArea: newSafeArea,
    };
  },
  right: (state: TState): TState => {
    const {
      currentBlock = {} as TCurrentBlock,
      blockMap,
      safeArea,
      lockStatus,
    } = state;
    if (lockStatus === "ing") {
      return { ...state };
    }
    let { X, shape } = currentBlock;
    if (!isNaN(X)) {
      // rightmost
      if (X + shape[0].length >= MaxColumns) {
        return { ...state };
      }
      X = X + 1;
    }
    const newBlock = { ...currentBlock, X };
    const newSafeArea = calcSafeArea(newBlock, blockMap!, safeArea!);
    return {
      ...state,
      currentBlock: newBlock,
      safeArea: newSafeArea,
    };
  },
  down: (state: TState, type?: "fall"): TState => {
    const { currentBlock = {} as TCurrentBlock, safeArea, blockMap } = state;
    let { Y } = currentBlock;
    if (!isNaN(Y)) {
      // bottommost
      if (Y >= safeArea?.b!) {
        // if the current block reaches bottom
        // clear game controller timer
        // and create new current block based on next block,
        // then generate new next block
        gameController.lock();
        return {
          ...state,
        };
      }
      if (type) {
        Y = safeArea?.b!;
        gameController.lock();
      } else {
        Y = Y + 1;
      }
    }
    const newBlock = { ...currentBlock, Y };
    const newSafeArea = calcSafeArea(newBlock, blockMap!, safeArea!);
    return {
      ...state,
      currentBlock: newBlock,
      safeArea: newSafeArea,
    };
  },
  rotate: (state: TState): TState => {
    const { currentBlock, blockMap, safeArea } = state;
    const newShape = rotateBlock(currentBlock?.shape!);
    // disable rotate, when`X + block length` is more than max columns
    if (currentBlock?.X! + newShape[0].length! > MaxColumns) {
      return { ...state };
    }
    const newBlock: TCurrentBlock = {
      ...currentBlock!,
      shape: newShape,
    };
    const newSafeArea = calcSafeArea(newBlock, blockMap!, safeArea!);
    return {
      ...state,
      currentBlock: newBlock,
      safeArea: newSafeArea,
    };
  },
  fall: (state: TState): TState => {
    const { currentBlock = {} as TCurrentBlock, safeArea, blockMap } = state;
    let { Y } = currentBlock;
    if (!isNaN(Y)) {
      Y = safeArea?.b!;
    }
    const newBlock = { ...currentBlock, Y };
    const newSafeArea = calcSafeArea(newBlock, blockMap!, safeArea!);
    gameController.lock();
    return {
      ...state,
      currentBlock: newBlock,
      safeArea: newSafeArea,
    };
    // TODO
    // return move.down(state, "fall");
  },
};

export default move;
