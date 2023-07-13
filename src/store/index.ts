// game store

import { createContext, Dispatch } from "react";
import {
  blockShape,
  calcSafeArea,
  getCurrentBlock,
  getNextBlockShape,
  getStartBlockMap,
  MinLevel,
  MinStartLine,
  ShapeType,
  TCurrentBlock,
  TSafeArea,
} from "../units";
import level from "./level";
import startLine from "./startLine";
import move from "./move";

export type TState = {
  gameStatus?: "done" | "ing" | "unstarted";
  pause?: boolean;
  mute?: boolean;
  nextShape?: ShapeType;
  level?: number;
  startLine?: number;
  clearLines?: number;
  score?: number;
  blockMap?: number[][];
  currentBlock?: TCurrentBlock;
  safeArea?: TSafeArea;
};
const defaultCurrentBlock = getNextBlockShape();
export const initState: TState = {
  gameStatus: "unstarted",
  // gameStatus: "ing",
  pause: false,
  mute: false,
  nextShape: getNextBlockShape(),
  level: MinLevel,
  startLine: MinStartLine,
  clearLines: 0,
  score: 0,
  blockMap: getStartBlockMap(),
  currentBlock: getCurrentBlock(defaultCurrentBlock),
  // need to be updated based on the current block and start line
  safeArea: calcSafeArea(blockShape[defaultCurrentBlock]),
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
      return {
        ...newState,
        score: newState.score! + 10,
        nextShape: newNextShape,
        currentBlock: {
          ...newCurrentBlock,
        },
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
