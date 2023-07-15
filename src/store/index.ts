// game store

import { createContext, Dispatch } from "react";
import {
  clearPoints,
  getBlockPatch,
  getBottomEdge,
  getCurrentBlock,
  getNextBlockShape,
  getStartBlockMap,
  MinLevel,
  MinStartLine,
  ShapeType,
  TCurrentBlock,
} from "../units";
import level from "./level";
import startLine from "./startLine";
import move from "./move";

export type TState = {
  lockStatus?: "ing" | "unlock";
  gameStatus?: "done" | "ing" | "unstarted";
  pause?: boolean;
  mute?: boolean;
  nextShape?: ShapeType;
  level?: number;
  startLine?: number;
  clearLines?: number[];
  cleared?: number;
  score?: number;
  helper?: boolean;
  flash?: boolean;
  blockMap?: number[][];
  currentBlock?: TCurrentBlock;
  bottomEdge?: number;
};
const defaultCurrentBlockType = getNextBlockShape();
const defaultCurrentBlock = getCurrentBlock(defaultCurrentBlockType);
const defaultBlockMap = getStartBlockMap();
export const initState: TState = {
  lockStatus: "unlock",
  gameStatus: "unstarted",
  // gameStatus: "ing",
  pause: false,
  mute: false,
  nextShape: getNextBlockShape(),
  level: MinLevel,
  startLine: MinStartLine,
  clearLines: [],
  score: 0,
  cleared: 0,
  helper: !false,
  flash: false,
  blockMap: defaultBlockMap,
  currentBlock: defaultCurrentBlock,
  // need to be updated based on the current block and block map
  bottomEdge: getBottomEdge(defaultBlockMap, defaultCurrentBlock, {
    x: defaultCurrentBlock.X,
    y: defaultCurrentBlock.Y,
  }),
};

type TLevel = "AddLevel" | "ReduceLevel";
type TStartLine = "AddStartLine" | "ReduceStartLine";
type TBlockAction = "Left" | "Right" | "Rotate" | "Down" | "Fall";
export type TAction = {
  type:
    | "Pause"
    | "Mute"
    | "Next"
    | "Start"
    | "Lock"
    | "Flash"
    | "Clear"
    | TBlockAction
    | TLevel
    | TStartLine;
  payload?: TState;
};

export const reducer = (state = initState, action: TAction) => {
  const { payload, type } = action;
  const newState = Object.assign(
    {},
    {
      ...state,
      ...payload,
    }
  );

  switch (type) {
    case "Start":
    case "Pause":
    case "Mute":
    case "Flash":
    case "Lock": {
      return newState;
    }
    case "Clear": {
      // clear up all full fill row
      // and update cleared count
      // and update score
      const { blockMap, clearLines, cleared, score } = newState;
      const newBlockMap = blockMap?.filter(
        (_, index) => !clearLines?.includes(index)
      );
      const len = clearLines?.length;
      const blockMapPatch = getBlockPatch(len!);
      const emptyBlock: TCurrentBlock = {
        X: 0,
        Y: 0,
        shape: [[]],
        shapeType: "T",
      };
      return {
        ...newState,
        blockMap: blockMapPatch.concat(newBlockMap!),
        currentBlock: emptyBlock,
        clearLines: [],
        cleared: cleared! + len!,
        score: clearPoints[len! - 1] + score!,
      };
    }
    case "Next": {
      const newNextShape = getNextBlockShape();
      const newCurrentBlock = getCurrentBlock(newState.nextShape!);
      return {
        ...newState,
        score: newState.score! + 10,
        nextShape: newNextShape,
        currentBlock: {
          ...newCurrentBlock,
        },
        bottomEdge: getBottomEdge(newState.blockMap!, newCurrentBlock, {
          x: newCurrentBlock.X,
          y: newCurrentBlock.Y,
        }),
      };
    }
    case "AddLevel": {
      return level.add(state);
    }
    case "ReduceLevel": {
      return level.reduce(state);
    }
    case "AddStartLine": {
      return startLine.add(state);
    }
    case "ReduceStartLine": {
      return startLine.reduce(state);
    }
    case "Left": {
      return move.left(state);
    }
    case "Right": {
      return move.right(state);
    }
    case "Down": {
      return move.down(state);
    }
    case "Rotate": {
      return move.rotate(state);
    }
    case "Fall": {
      return move.fall(state);
    }
    default:
      return state;
  }
};

const GameContext = createContext<
  TState & {
    dispatch: Dispatch<TAction>;
  }
>({
  ...initState,
  dispatch: () => {},
});
export default GameContext;
