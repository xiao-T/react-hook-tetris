// game start line handler

import { TState } from "./index";
import { MaxStartLine, MinStartLine } from "../units";

const startLine = {
  add: (state: TState): TState => {
    let { startLine = MinStartLine } = state;
    if (startLine === MaxStartLine) {
      startLine = MinStartLine;
    } else {
      startLine++;
    }
    return {
      ...state,
      startLine,
    };
  },
  reduce: (state: TState): TState => {
    let { startLine = MinStartLine } = state;
    if (startLine === MinStartLine) {
      startLine = MaxStartLine;
    } else {
      startLine--;
    }
    return {
      ...state,
      startLine,
    };
  },
};

export default startLine;
