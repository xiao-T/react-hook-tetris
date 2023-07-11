// game live status
import React, { FC } from "react";
import Block from "../Block";

type Props = {};

const livePanel = {
  rows: 20,
  columns: 10,
};
const GameLive: FC<Props> = () => {
  return (
    <div className="border border-black pb-[0.1rem] pl-[0.2rem] pr-[0.1rem] pt-[0.2rem]">
      {Array.from({ length: livePanel.rows }).map((_, index) => {
        return (
          <div key={index} className="flex">
            {Array.from({ length: livePanel.columns }).map((_, subIndex) => {
              return <Block key={`${index}_${subIndex}`} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GameLive;
