// block component

import React, { FC } from "react";

type Props = {
  active?: boolean;
  isOpacity?: boolean;
};

const Block: FC<Props> = ({ active = false, isOpacity = false }) => {
  let blockColor = "border-[#879372] after:bg-[#879372]";
  let opacity = "opacity-100";
  if (active) {
    blockColor = "border-[#000] after:bg-[#000]";
  }
  if (isOpacity) {
    opacity = "opacity-0";
  }
  return (
    <i
      className={`after:content mb-[0.1rem] mr-[0.1rem] block h-[1rem] w-[1rem] border-[0.1rem] after:ml-[0.1rem] after:mt-[0.1rem] after:block after:h-[0.6rem] after:w-[0.6rem]  after:content-[''] ${blockColor} ${opacity}`}
    />
  );
};

export default Block;
