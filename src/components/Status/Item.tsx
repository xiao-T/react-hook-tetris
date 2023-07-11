// game status
import React, { FC } from "react";

type Props = {
  label: string;
  value?: number;
  render?: () => JSX.Element;
};

const StatusItem: FC<Props> = ({ label, value, render }) => {
  if (isNaN(value as number) && typeof render !== "function") {
    throw Error("The parameters `value` and `render` must have one!");
  }
  if (!isNaN(value as number) && typeof render === "function") {
    throw Error("The parameters `value` and `render` can only have one!");
  }
  return (
    <div className="mb-2 flex flex-col text-xl">
      <span className="font mb-1">{label}</span>
      {!isNaN(value as number) && <span className="text-right">{value}</span>}
      {typeof render === "function" && render()}
    </div>
  );
};

export default StatusItem;
