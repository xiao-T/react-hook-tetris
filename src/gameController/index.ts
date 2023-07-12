// game controller
import { Dispatch } from "react";
import { TAction } from "../store";

type TGameController = {
  autoDownInterval: ReturnType<typeof setInterval> | null;
  start: (dispatch: Dispatch<TAction>) => void;
  auto: (dispatch: Dispatch<TAction>) => void;
  left: (dispatch: Dispatch<TAction>) => void;
  right: (dispatch: Dispatch<TAction>) => void;
  down: (dispatch: Dispatch<TAction>) => void;
};
const gameController: TGameController = {
  autoDownInterval: null,
  start: (dispatch: Dispatch<TAction>) => {
    dispatch({
      type: "Start",
      payload: {
        gameStatus: "ing",
      },
    });
    gameController.auto(dispatch);
  },
  auto: (dispatch: Dispatch<TAction>) => {
    gameController.autoDownInterval = setInterval(() => {
      dispatch({
        type: "Down",
      });
    }, 500);
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
};
export default gameController;
