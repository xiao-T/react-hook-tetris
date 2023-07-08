import React from "react";
import Panel from "./components/Panel";

function App() {
  return (
    <div className="mx-auto my-0 h-screen w-screen max-w-[750px] rounded-lg bg-yellow-400 shadow-container">
      Tetris game
      <Panel />
    </div>
  );
}

export default App;
