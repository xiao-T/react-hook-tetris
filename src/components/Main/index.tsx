// game main component

import React, { FC } from "react";
import Block from "../Block";
import Decoration from "../Decoration";

type Props = {};

const Main: FC<Props> = (props) => {
  return (
    <main className="mx-4 flex">
      <Decoration />
      <div className="mx-4 flex-1 border-[0.5rem] border-black border-t-[transparent]">
        <header>Tetris game</header>
        <div className="flex">
          <Block active />
          <Block />
          <Block />
        </div>
        <div className="flex">
          <Block active />
          <Block />
          <Block />
        </div>
      </div>
      <Decoration isReverse />
    </main>
  );
};

export default Main;
