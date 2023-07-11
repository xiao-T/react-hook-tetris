// game status
import React, { FC } from "react";
import StatusItem from "./Item";
import Block from "../Block";
import Icon from "../Icon";
import NextBlock from "../NextBlock";

type Props = {};

const Status: FC<Props> = () => {
  return (
    <div className="mx-4 flex w-full flex-col">
      <div className="flex-1">
        <StatusItem label="得分" value="20" />
        <StatusItem label="消除行" value="1" />
        <StatusItem label="级别" value="0" />
        <StatusItem label="下一个" render={() => <NextBlock type="O" />} />
      </div>
      <div className="mb-2 flex">
        <Icon active={false} name="No Sound" />
        <Icon name="Pause" animate />
      </div>
    </div>
  );
};

export default Status;
