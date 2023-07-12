import React, { FC } from "react";
import Block from "../Block";
import { ShapeType, blockShape } from "../../units";

// for next block
const xy = {
  I: [1, 0],
  L: [0, 0],
  J: [0, 0],
  Z: [0, 0],
  S: [0, 0],
  O: [0, 1],
  T: [0, 0],
};

const empty = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
type Props = {
  type?: ShapeType;
};
const NextBlock: FC<Props> = ({ type }): JSX.Element => {
  const mergedShape: number[][] = empty.map((item) => [...item]);
  if (type) {
    blockShape[type].forEach((item, index) => {
      item.forEach((subItem, subIndex) => {
        if (subItem) {
          mergedShape[index + xy[type][0]][subIndex + xy[type][1]] = 1;
        }
      });
    });
  }

  return (
    <div className="mt-1 flex flex-col items-end">
      {mergedShape.map((item, index) => {
        return (
          <div key={index} className="flex">
            {item.map((subItem, itemIndex) => (
              <Block active={subItem === 1} key={`${index}_${itemIndex}`} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default NextBlock;
