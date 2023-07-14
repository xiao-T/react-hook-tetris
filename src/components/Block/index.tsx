// block component

import React, { FC } from "react";

type Props = {
  active?: boolean;
  isOpacity?: boolean;
  isLock?: boolean;
  isHelp?: boolean;
};

const Block: FC<Props> = ({
  active = false,
  isOpacity = false,
  isLock = false,
  isHelp = false,
}) => {
  let color = "text-[#879372]";
  let opacity = "opacity-100";
  if (active) {
    color = "text-[#000]";
  }
  if (isLock) {
    color = "text-[#560000]";
  }
  if (isOpacity) {
    opacity = "opacity-0";
  }
  if (isHelp && !active) {
    opacity = "opacity-50";
  }
  return (
    <i
      className={`mb-[0.1rem] mr-[0.1rem] block h-[1.2rem] w-[1.2rem] border-[0.1rem] border-current after:ml-[0.1rem] after:mt-[0.1rem] after:block after:h-[0.8rem] after:w-[0.8rem] after:bg-current after:content-[''] ${color} ${opacity}`}
    />
  );
};

export default Block;
