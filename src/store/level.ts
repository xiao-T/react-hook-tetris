// game level handler

import { TState } from "./index";
import { MaxLevel, MinLevel } from "../units";

const level = {
  add: (state: TState): TState => {
    let { level = MinLevel } = state;
    if (level === MaxLevel) {
      level = MinLevel;
    } else {
      level++;
    }
    return {
      ...state,
      level,
    };
  },
  reduce: (state: TState): TState => {
    let { level = MinLevel } = state;
    if (level === MinLevel) {
      level = MaxLevel;
    } else {
      level--;
    }
    return {
      ...state,
      level,
    };
  },
};

export default level;
