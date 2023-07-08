// block component

import React, { FC } from "react";

type Props = {
  active?: boolean;
};

const Block: FC<Props> = ({ active = false }) => {
  let blockColor = "border-[#879372] after:bg-[#879372]";
  if (active) {
    blockColor = "border-[#000] after:bg-[#000]";
  }
  return (
    <i
      className={`after:content mb-[0.2rem] ml-[0.2rem] block h-8 w-8 border-[0.2rem] after:ml-[0.2rem] after:mt-[0.2rem] after:block after:h-[1.2rem] after:w-[1.2rem]  after:content-[''] ${blockColor}`}
    />
  );
};

export default Block;
