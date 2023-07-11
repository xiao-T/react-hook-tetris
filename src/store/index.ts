// game store

import { createContext, Dispatch } from "react";
import { ShapeType } from "../components/NextBlock";
import { getNextBlockShape, MinLevel, MinStartLine } from "../units";
import level from "./level";
import startLine from "./startLine";

export type TState = {
  gameStatus?: "done" | "ing" | "unstarted";
  pause?: boolean;
  mute?: boolean;
  nextShape?: ShapeType;
  level?: number;
  startLine?: number;
};
export const initState: TState = {
  gameStatus: "unstarted",
  pause: false,
  mute: false,
  nextShape: "I",
  level: MinLevel,
  startLine: MinStartLine,
};

type TLevel = "AddLevel" | "ReduceLevel";
type TStartLine = "AddStartLine" | "ReduceStartLine";
type TAction = {
  type: "Pause" | "Mute" | "Next" | "Start" | TLevel | TStartLine;
  payload?: TState;
};

export const reducer = (state = initState, action: TAction) => {
  const { payload = initState, type } = action;
  const newState = Object.assign(
    {},
    {
      ...state,
      ...payload,
    }
  );
  switch (type) {
    case "Pause": {
      return newState;
    }
    case "Mute": {
      return newState;
    }
    case "Next": {
      const nextShape = getNextBlockShape();
      state.nextShape = nextShape;
      return {
        ...state,
        nextShape,
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
