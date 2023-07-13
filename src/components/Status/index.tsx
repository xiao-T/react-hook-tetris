// game status
import React, { FC, useContext } from "react";
import StatusItem from "./Item";
import Icon from "../Icon";
import NextBlock from "../NextBlock";
import GameContext from "../../store";

type Props = {};

const Status: FC<Props> = () => {
  const { pause, mute, nextShape, level, startLine, gameStatus, clearLines } =
    useContext(GameContext);
  return (
    <div className="mx-4 flex w-full flex-col">
      <div className="mt-2 flex-1">
        <StatusItem label="得分" value={20} />
        {gameStatus === "ing" && (
          <StatusItem label="消除行" value={clearLines} />
        )}
        {gameStatus === "unstarted" && (
          <StatusItem label="起始行" value={startLine} />
        )}
        <StatusItem label="级别" value={level} />
        <StatusItem
          label="下一个"
          render={() => <NextBlock type={nextShape} />}
        />
      </div>
      <div className="mb-2 flex">
        <Icon name="No Sound" active={mute} />
        <Icon name="Pause" active={false} animate={pause} />
      </div>
    </div>
  );
};

export default Status;
