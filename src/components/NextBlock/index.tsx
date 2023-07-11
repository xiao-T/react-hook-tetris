import React, { FC } from "react";
import Block from "../Block";

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

export const blockShape = {
  I: [[1, 1, 1, 1]],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
};
const empty = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
export type ShapeType = keyof typeof blockShape;
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
    <div className="flex flex-col items-end">
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
