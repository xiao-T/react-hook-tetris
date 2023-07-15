// game controller
import { Dispatch } from "react";
import { TAction, TState } from "../store";
import { getBottomEdge, getStartBlockMap, levels } from "../units";

type TClear = "Lock" | "Auto" | "Flash";
type TGameController = {
  flashTimer: ReturnType<typeof setTimeout> | null;
  unlockTimer: ReturnType<typeof setTimeout> | null;
  autoDownInterval: ReturnType<typeof setTimeout> | null;
  delay: number;
  flashCount: number;
  clear: (type?: TClear) => void;
  start: (dispatch: Dispatch<TAction>, state: TState) => void;
  auto: (dispatch: Dispatch<TAction>) => void;
  left: (dispatch: Dispatch<TAction>) => void;
  right: (dispatch: Dispatch<TAction>) => void;
  down: (dispatch: Dispatch<TAction>) => void;
  next: () => void;
  lock: () => void;
  flash: () => void;
  fall: (dispatch: Dispatch<TAction>) => void;
  dispatch: Dispatch<TAction>;
};
const gameController: TGameController = {
  flashTimer: null,
  autoDownInterval: null,
  unlockTimer: null,
  delay: 0,
  flashCount: 0,
  clear: (type?: TClear) => {
    if (type === "Auto" || !type) {
      gameController.autoDownInterval &&
        clearTimeout(gameController.autoDownInterval);
    }
    if (type === "Lock" || !type) {
      gameController.unlockTimer && clearTimeout(gameController.unlockTimer);
    }
    if (type === "Flash" || !type) {
      gameController.flashTimer && clearInterval(gameController.flashTimer);
    }
  },
  dispatch: () => {},
  start: (dispatch: Dispatch<TAction>, state: TState) => {
    const { currentBlock, startLine } = state;
    gameController.delay = levels[state?.level! - 1];
    const blockMap = getStartBlockMap(startLine);
    dispatch({
      type: "Start",
      payload: {
        gameStatus: "ing",
        blockMap,
        bottomEdge: getBottomEdge(blockMap, currentBlock!, {
          x: currentBlock?.X!,
          y: currentBlock?.Y!,
        }),
      },
    });
    gameController.dispatch = dispatch;
    gameController.auto(dispatch);
  },
  auto: (dispatch: Dispatch<TAction>) => {
    dispatch({
      type: "Pause",
      payload: {
        pause: false,
      },
    });
    gameController.autoDownInterval = setTimeout(() => {
      dispatch({
        type: "Down",
      });
      gameController.auto(dispatch);
    }, gameController.delay);
  },
  left: (dispatch: Dispatch<TAction>) => {
    dispatch({
      type: "Left",
    });
  },
  right: (dispatch: Dispatch<TAction>) => {
    dispatch({
      type: "Right",
    });
  },
  down: (dispatch: Dispatch<TAction>) => {
    gameController.clear("Auto");
    dispatch({
      type: "Down",
    });
    gameController.auto(dispatch);
  },
  fall: (dispatch: Dispatch<TAction>) => {
    gameController.clear("Auto");
    dispatch({
      type: "Fall",
    });
  },
  next: () => {
    gameController.clear("Auto");
    gameController.dispatch({
      type: "Next",
    });
    gameController.auto(gameController.dispatch);
  },
  lock: () => {
    gameController.clear();
    // lock current block
    gameController.dispatch({
      type: "Lock",
      payload: {
        lockStatus: "ing",
      },
    });
    // unlock block map, then get next block
    gameController.unlockTimer = setTimeout(() => {
      gameController.dispatch({
        type: "Lock",
        payload: {
          lockStatus: "unlock",
        },
      });
      gameController.next();
    }, 200);
  },
  flash: () => {
    gameController.clear();
    gameController.flashCount++;
    if (gameController.flashCount > 6) {
      gameController.clear("Flash");
      gameController.dispatch({
        type: "Flash",
        payload: {
          flash: false,
        },
      });
      gameController.dispatch({
        type: "Clear",
      });
      gameController.next();
      gameController.flashCount = 0;
      return;
    }
    gameController.flashTimer = setTimeout(() => {
      gameController.dispatch({
        type: "Flash",
        payload: {
          flash: gameController.flashCount % 2 === 0,
        },
      });
      gameController.flash();
    }, 100);
  },
};
export default gameController;
