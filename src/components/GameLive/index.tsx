// game live status
import React, { FC, useContext } from "react";
import Block from "../Block";
import GameContext from "../../store";
import { blockShape } from "../../units";

const GameLive: FC = () => {
  const { blockMap, currentBlock } = useContext(GameContext);
  const { X = 0, Y = 0 } = currentBlock || {};
  const currentShape = currentBlock && blockShape[currentBlock?.shapeType];
  // merge `block map` and `current shape`
  const cachedBlockMap = blockMap?.map((item) => [...item]);
  currentShape?.forEach((item, index) => {
    item.forEach((subItem, subIndex) => {
      if (subItem && cachedBlockMap) {
        cachedBlockMap[index + Y][subIndex + X] = 1;
      }
    });
  });
  return (
    <div className="border border-black pb-[0.1rem] pl-[0.2rem] pr-[0.1rem] pt-[0.2rem]">
      {cachedBlockMap?.map((row, index) => {
        return (
          <div key={index} className="flex">
            {row.map((item, subIndex) => {
              return <Block active={item === 1} key={`${index}_${subIndex}`} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GameLive;
