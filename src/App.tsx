import React from "react";
import Panel from "./components/Panel";
import Main from "./components/Main";

function App() {
  return (
    <div className="mx-auto my-0 flex h-screen w-screen max-w-[750px] flex-col justify-around rounded-lg bg-yellow-400 py-8 shadow-container">
      <Main />
      <Panel />
    </div>
  );
}

export default App;
