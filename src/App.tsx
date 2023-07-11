import React, { useReducer } from "react";
import Panel from "./components/Panel";
import Main from "./components/Main";
import GameContext, { reducer, initState } from "./store";

function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <GameContext.Provider value={{ ...state, dispatch }}>
      <div className="mx-auto my-0 flex h-screen w-screen max-w-[750px] flex-col justify-around rounded-xl bg-yellow-400 py-8 shadow-container">
        <Main />
        <Panel />
      </div>
    </GameContext.Provider>
  );
}

export default App;
