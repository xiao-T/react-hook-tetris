// game controller panel
import React, { useContext } from "react";
import Button from "./Button";
import GameContext from "../../store";

const Panel = () => {
  const { dispatch, pause, mute, gameStatus } = useContext(GameContext);
  return (
    <div className="mx-8 flex">
      <div className="flex-1">
        <div className="flex justify-around">
          <Button
            label="暂停"
            size="sm"
            bg="green"
            onClick={() => {
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
              dispatch({
                type: "Fall",
              });
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
              if (gameStatus === "unstarted") {
                dispatch({
                  type: "AddStartLine",
                });
              } else {
                console.log("rotate block");
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
              if (gameStatus === "unstarted") {
                dispatch({
                  type: "ReduceLevel",
                });
              } else {
                console.log("move left block");
                dispatch({
                  type: "Left",
                });
              }
            }}
          />
          <Button
            label="右移"
            size="md"
            onClick={() => {
              if (gameStatus === "unstarted") {
                dispatch({
                  type: "AddLevel",
                });
              } else {
                console.log("move right block");
                dispatch({
                  type: "Right",
                });
              }
            }}
          />
        </div>
        <div className="flex justify-center">
          <Button
            label="下移"
            size="md"
            onClick={() => {
              if (gameStatus === "unstarted") {
                dispatch({
                  type: "ReduceStartLine",
                });
              } else {
                console.log("move down block");
                dispatch({
                  type: "Down",
                });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Panel;
