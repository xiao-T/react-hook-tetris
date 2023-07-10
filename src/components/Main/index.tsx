// game main component

import React, { FC } from "react";
import Decoration from "../Decoration";
import GameScreen from "../GameScreen";

type Props = {};

const Main: FC<Props> = (props) => {
  return (
    <main className="mx-4 flex">
      <Decoration />
      <GameScreen />
      <Decoration isReverse />
    </main>
  );
};

export default Main;
