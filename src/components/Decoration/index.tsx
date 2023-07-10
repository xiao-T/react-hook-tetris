// Decoration component
// the decoration of game main screen

import React, { FC } from "react";
import Block from "../Block";

type Props = {
  isReverse?: boolean;
};

const Decoration: FC<Props> = ({ isReverse = false }) => {
  let reverseClassName = "";
  if (isReverse) {
    reverseClassName = "rotate-y-180";
  }
  return (
    <div className={`${reverseClassName}`}>
      {/* the first block group */}
      <div className="flex">
        <Block isOpacity />
        <Block active />
      </div>
      <div className="flex">
        <Block active />
        <Block active />
      </div>
      <div className="flex flex-row-reverse">
        <Block isOpacity />
        <Block active />
      </div>
      {/* divide */}
      <div className="flex">
        <Block isOpacity />
      </div>
      {/* the second block group */}
      <div className="flex">
        <Block active />
        <Block isOpacity />
      </div>
      <div className="flex">
        <Block active />
        <Block active />
      </div>
      <div className="flex">
        <Block active />
        <Block isOpacity />
      </div>
      {/* divide */}
      <div className="flex">
        <Block isOpacity />
      </div>
      {/* the third block group */}
      <div className="flex">
        <Block active />
        <Block active />
      </div>
      <div className="flex">
        <Block active />
        <Block active />
      </div>
      {/* divide */}
      <div className="flex">
        <Block isOpacity />
      </div>
      {/* the fourth block group */}
      <div className="flex">
        <Block isOpacity />
        <Block active />
      </div>
      <div className="flex">
        <Block active />
        <Block active />
      </div>
      <div className="flex">
        <Block isOpacity />
        <Block active />
      </div>
      {/* divide */}
      <div className="flex">
        <Block isOpacity />
      </div>
      {/* the fifth block group */}
      <div className="flex">
        <Block active />
        <Block active />
      </div>
      <div className="flex">
        <Block isOpacity />
        <Block active />
      </div>
      <div className="flex">
        <Block isOpacity />
        <Block active />
      </div>
      {/* divide */}
      <div className="flex">
        <Block isOpacity />
      </div>
      {/* the fifth block group */}
      <div className="flex flex-col">
        <Block active />
        <Block active />
        <Block active />
        <Block active />
      </div>
    </div>
  );
};

export default Decoration;
