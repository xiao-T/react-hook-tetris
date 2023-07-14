// game live status
import React, { FC, useContext } from "react";
import Block from "../Block";
import GameContext from "../../store";
import { isShouldBeLock, mergeCurrentBlockIntoBlockMap } from "../../units";

const GameLive: FC = () => {
  const { blockMap, currentBlock, safeArea, helper, lockStatus } =
    useContext(GameContext);
  const liveBlockMap = mergeCurrentBlockIntoBlockMap(currentBlock!, blockMap!);
  return (
    <div className="border border-black pb-[0.1rem] pl-[0.2rem] pr-[0.1rem] pt-[0.2rem]">
      {liveBlockMap?.map((row, index) => {
        return (
          <div key={index} className="flex">
            {row.map((item, subIndex) => {
              return (
                <Block
                  active={item === 1}
                  isHelp={
                    helper &&
                    subIndex + 1 > safeArea?.l! &&
                    subIndex + 1 < safeArea?.r!
                  }
                  isLock={
                    isShouldBeLock(currentBlock!, safeArea!, {
                      x: subIndex,
                      y: index,
                    }) &&
                    item === 1 &&
                    lockStatus === "ing"
                  }
                  key={`${index}_${subIndex}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GameLive;
