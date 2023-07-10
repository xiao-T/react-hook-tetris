import React, { FC } from "react";
import { ReactComponent as NoSoundIcon } from "./icons/no_sound.svg";
import { ReactComponent as PauseIcon } from "./icons/pause.svg";

type Unit = "rem" | "em" | "px" | "vh" | "vw";
type Props = {
  name: "No Sound" | "Pause";
  size?: `${number}${Unit}`;
  active?: boolean;
};

const Icon: FC<Props> = ({ name, size = "1.8rem", active = true }) => {
  let opacityClassName = "opacity-1";
  if (!active) {
    opacityClassName = "opacity-0.2";
  }
  return (
    <i className={`block ${opacityClassName}`}>
      {name === "No Sound" && <NoSoundIcon width={size} height={size} />}
      {name === "Pause" && <PauseIcon width={size} height={size} />}
    </i>
  );
};

export default Icon;
