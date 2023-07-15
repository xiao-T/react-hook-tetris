// game store

import { createContext, Dispatch } from "react";
import {
  getBottomEdge,
  getCurrentBlock,
  getNextBlockShape,
  getStartBlockMap,
  mergeCurrentBlockIntoBlockMap,
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
  clearLines?: number;
  score?: number;
  helper?: boolean;
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
  clearLines: 0,
  score: 0,
  helper: !false,
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
    case "Lock":
    case "Start": {
      return newState;
    }
    case "Pause": {
      return newState;
    }
    case "Mute": {
      return newState;
    }
    case "Next": {
      const newNextShape = getNextBlockShape();
      const newCurrentBlock = getCurrentBlock(newState.nextShape!);
      const newBlockMap = mergeCurrentBlockIntoBlockMap(
        newState.currentBlock!,
        newState.blockMap!
      );
      return {
        ...newState,
        score: newState.score! + 10,
        nextShape: newNextShape,
        currentBlock: {
          ...newCurrentBlock,
        },
        blockMap: newBlockMap,
        bottomEdge: getBottomEdge(newBlockMap, newCurrentBlock, {
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
