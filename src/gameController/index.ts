// game controller
import { Dispatch } from "react";
import { TAction, TState } from "../store";
import { getStartBlockMap, levels } from "../units";

type TGameController = {
  autoDownInterval: ReturnType<typeof setTimeout> | null;
  delay: number;
  start: (dispatch: Dispatch<TAction>, state: TState) => void;
  auto: (dispatch: Dispatch<TAction>) => void;
  left: (dispatch: Dispatch<TAction>) => void;
  right: (dispatch: Dispatch<TAction>) => void;
  down: (dispatch: Dispatch<TAction>) => void;
  next: (state: TState) => void;
  dispatch: Dispatch<TAction>;
};
const gameController: TGameController = {
  autoDownInterval: null,
  delay: 0,
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
    gameController.autoDownInterval &&
      clearInterval(gameController.autoDownInterval);
    dispatch({
      type: "Left",
    });
    gameController.auto(dispatch);
  },
  right: (dispatch: Dispatch<TAction>) => {
    gameController.autoDownInterval &&
      clearInterval(gameController.autoDownInterval);
    dispatch({
      type: "Right",
    });
    gameController.auto(dispatch);
  },
  down: (dispatch: Dispatch<TAction>) => {
    gameController.autoDownInterval &&
      clearInterval(gameController.autoDownInterval);
    dispatch({
      type: "Down",
    });
    gameController.auto(dispatch);
  },
  next: (state: TState) => {
    gameController.autoDownInterval &&
      clearTimeout(gameController.autoDownInterval);
    gameController.dispatch({
      type: "Next",
    });
    gameController.auto(gameController.dispatch);
  },
};
export default gameController;
