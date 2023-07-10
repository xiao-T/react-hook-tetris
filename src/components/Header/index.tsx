// header component

import React, { FC } from "react";
import HeaderDecoration from "./Decoration";

const Header: FC = () => {
  return (
    <header className="absolute left-0 top-[-0.25rem] flex w-full translate-y-[-50%] items-center justify-between text-center text-2xl">
      <HeaderDecoration />
      <span>俄罗斯方块</span>
      <HeaderDecoration isReverse />
    </header>
  );
};

export default Header;
