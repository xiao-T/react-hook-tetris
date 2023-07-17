// move current block

import audioPlayer from "../audio";
import gameController from "../gameController";
import {
  MaxColumns,
  TCurrentBlock,
  canBePlaced,
  getBottomEdge,
  getClearLines,
  isGameOver,
  mergeCurrentBlockIntoBlockMap,
  rotateBlock,
} from "../units";
import { TState } from "./index";

const move = {
  left: (state: TState): TState => {
    const { currentBlock = {} as TCurrentBlock, blockMap, lockStatus } = state;
    if (lockStatus === "ing") {
      return { ...state };
    }
    let { X } = currentBlock;
    if (X) {
      const shouldUpdate = canBePlaced(blockMap!, currentBlock, {
        x: X - 1,
        y: currentBlock.Y,
      });
      if (shouldUpdate) {
        X = X - 1;
      }
    }

    const newBlock = { ...currentBlock, X };
    return {
      ...state,
      currentBlock: newBlock,
      bottomEdge: getBottomEdge(blockMap!, currentBlock, {
        x: X,
        y: currentBlock.Y,
      }),
    };
  },
  right: (state: TState): TState => {
    const { currentBlock = {} as TCurrentBlock, blockMap, lockStatus } = state;
    if (lockStatus === "ing") {
      return { ...state };
    }
    let { X, shape } = currentBlock;
    if (!isNaN(X)) {
      // rightmost
      if (X + shape[0].length >= MaxColumns) {
        return { ...state };
      }
      const shouldUpdate = canBePlaced(blockMap!, currentBlock, {
        x: X + 1,
        y: currentBlock.Y,
      });
      if (shouldUpdate) {
        X = X + 1;
      }
    }
    const newBlock = { ...currentBlock, X };
    return {
      ...state,
      currentBlock: newBlock,
      bottomEdge: getBottomEdge(blockMap!, currentBlock, {
        x: X,
        y: currentBlock.Y,
      }),
    };
  },
  down: (state: TState, type?: "fall"): TState => {
    const { currentBlock = {} as TCurrentBlock, blockMap, bottomEdge } = state;
    let { Y, X } = currentBlock;
    if (type === "fall") {
      Y = bottomEdge!;
    }
    if (!isNaN(Y) && bottomEdge! > Y) {
      const shouldUpdate = canBePlaced(blockMap!, currentBlock, {
        x: X,
        y: Y + 1,
      });
      if (shouldUpdate) {
        Y = Y + 1;
      }
    } else {
      const newBlock = { ...currentBlock, Y };
      const newBlockMap = mergeCurrentBlockIntoBlockMap(newBlock, blockMap!);
      const clearLines = getClearLines(newBlockMap);
      if (clearLines.length) {
        // if there are full fill lines
        // need to clear they
        audioPlayer.clear?.();
        gameController.flash();
      } else {
        // if the current block reaches bottom
        // clear game controller timer
        // and create new current block based on next block,
        // then generate new next block
        gameController.lock(isGameOver(newBlockMap, newBlock), newBlockMap);
      }
      return {
        ...state,
        clearLines,
        currentBlock: newBlock,
        blockMap: newBlockMap,
      };
    }
    const newBlock = { ...currentBlock, Y };
    return {
      ...state,
      currentBlock: newBlock,
    };
  },
  rotate: (state: TState): TState => {
    const { currentBlock, blockMap } = state;
    const newShape = rotateBlock(currentBlock?.shape!);
    // disable rotate, when`X + block length` is more than max columns
    if (currentBlock?.X! + newShape[0].length! > MaxColumns) {
      return { ...state };
    }
    const newBlock: TCurrentBlock = {
      ...currentBlock!,
      shape: newShape,
    };
    return {
      ...state,
      currentBlock: newBlock,
      bottomEdge: getBottomEdge(blockMap!, newBlock, {
        x: newBlock.X,
        y: newBlock.Y,
      }),
    };
  },
  // TODO
  fall: (state: TState): TState => {
    return move.down(state, "fall");
  },
};

export default move;
