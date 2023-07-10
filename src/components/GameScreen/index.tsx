// game screen

import React from "react";
import GameLive from "../GameLive";
import Status from "../Status";
import Header from "../Header";

type Props = {};

const GameScreen = (props: Props) => {
  return (
    <div className="relative mx-4 flex-1 border-[0.5rem] border-black border-t-[transparent] py-8">
      <Header />
      <div className="border-r-[#987f0f #fae36c #fae36c #987f0f] mx-8 border-[0.25rem] border-b-[#fae36c] border-l-[#987f0f] border-r-[#fae36c] border-t-[#987f0f]">
        <div className="flex border border-black bg-[#9ead86] p-1">
          <GameLive />
          <Status />
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
