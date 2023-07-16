// game controller panel
import React, { useContext } from "react";
import Button from "./Button";
import GameContext from "../../store";
import gameController from "../../gameController";
import audioPlayer from "../../audio";

const Panel = () => {
  const { dispatch, ...rest } = useContext(GameContext);
  const { pause, mute, gameStatus } = rest;
  return (
    <div className="mx-8 flex">
      <div className="flex-1">
        <div className="flex justify-around">
          <Button
            label="暂停"
            size="sm"
            bg="green"
            onClick={() => {
              if (!pause) {
                clearInterval(gameController.autoDownInterval!);
              } else {
                if (gameStatus === "ing") {
                  gameController.auto(dispatch);
                }
              }
              dispatch({
                type: "Pause",
                payload: {
                  pause: !pause,
                },
              });
            }}
          />
          <Button
            label="音效"
            size="sm"
            bg="green"
            onClick={() => {
              dispatch({
                type: "Mute",
                payload: {
                  mute: !mute,
                },
              });
            }}
          />
          <Button label="重玩" size="sm" bg="red" onClick={(e) => {}} />
        </div>
        <div className="mt-16">
          <Button
            label="掉落"
            size="lg"
            onClick={() => {
              if (gameStatus === "done") {
                return;
              }
              if (gameStatus === "ing") {
                if (!mute) {
                  audioPlayer.fall?.();
                }
                gameController.fall(dispatch);
              } else {
                if (!mute) {
                  audioPlayer.start?.();
                }
                gameController.start(dispatch, rest);
              }
            }}
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-center">
          <Button
            label="旋转"
            size="md"
            onClick={() => {
              if (!mute) {
                audioPlayer.rotate?.();
              }
              if (gameStatus === "unstarted") {
                dispatch({
                  type: "AddStartLine",
                });
              } else {
                dispatch({
                  type: "Rotate",
                });
              }
            }}
          />
        </div>
        <div className="flex justify-between">
          <Button
            label="左移"
            size="md"
            onClick={() => {
              if (!mute) {
                audioPlayer.move?.();
              }
              if (gameStatus === "unstarted") {
                dispatch({
                  type: "ReduceLevel",
                });
              } else {
                gameController.left(dispatch);
              }
            }}
          />
          <Button
            label="右移"
            size="md"
            onClick={() => {
              if (!mute) {
                audioPlayer.move?.();
              }
              if (gameStatus === "unstarted") {
                dispatch({
                  type: "AddLevel",
                });
              } else {
                gameController.right(dispatch);
              }
            }}
          />
        </div>
        <div className="flex justify-center">
          <Button
            label="下移"
            size="md"
            onClick={() => {
              if (!mute) {
                audioPlayer.move?.();
              }
              if (gameStatus === "unstarted") {
                dispatch({
                  type: "ReduceStartLine",
                });
              } else {
                gameController.down(dispatch);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Panel;
