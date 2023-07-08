import React from "react";
import Panel from "./components/Panel";
import Block from "./components/Block";

function App() {
  return (
    <div className="mx-auto my-0 h-screen w-screen max-w-[750px] rounded-lg bg-yellow-400 shadow-container">
      Tetris game
      <div className="flex">
        <Block active />
        <Block active={false} />
        <Block />
      </div>
      <div className="flex">
        <Block active />
        <Block active={false} />
        <Block />
      </div>
      <Panel />
    </div>
  );
}

export default App;
