// game controller
import { Dispatch } from "react";
import { TAction, TState } from "../store";
import { getStartBlockMap, levels } from "../units";

type TClear = "Lock" | "Auto";
type TGameController = {
  unlockTimer: ReturnType<typeof setTimeout> | null;
  autoDownInterval: ReturnType<typeof setTimeout> | null;
  delay: number;
  clear: (type?: TClear) => void;
  start: (dispatch: Dispatch<TAction>, state: TState) => void;
  auto: (dispatch: Dispatch<TAction>) => void;
  left: (dispatch: Dispatch<TAction>) => void;
  right: (dispatch: Dispatch<TAction>) => void;
  down: (dispatch: Dispatch<TAction>) => void;
  next: () => void;
  lock: () => void;
  fall: (dispatch: Dispatch<TAction>) => void;
  dispatch: Dispatch<TAction>;
};
const gameController: TGameController = {
  autoDownInterval: null,
  unlockTimer: null,
  delay: 0,
  clear: (type?: TClear) => {
    if (type === "Auto" || !type) {
      gameController.autoDownInterval &&
        clearTimeout(gameController.autoDownInterval);
    }
    if (type === "Lock" || !type) {
      gameController.unlockTimer && clearTimeout(gameController.unlockTimer);
    }
  },
  dispatch: () => {},
  start: (dispatch: Dispatch<TAction>, state: TState) => {
    gameController.delay = levels[state?.level! - 1];
    dispatch({
      type: "Start",
      payload: {
        gameStatus: "ing",
        blockMap: getStartBlockMap(state?.startLine),
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
    gameController.dispatch({
      type: "Lock",
      payload: {
        lockStatus: "ing",
      },
    });
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
};
export default gameController;
