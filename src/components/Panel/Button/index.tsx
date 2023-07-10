import React, { FC, MouseEvent } from "react";

type Props = {
  label: string;
  size?: "sm" | "md" | "lg";
  bg?: "green" | "blue" | "red";
  onClick: (e: MouseEvent) => void;
};

const buttonSize = {
  sm: "3rem",
  md: "6rem",
  lg: "9rem",
};

const Button: FC<Props> = ({ label, size = "sm", bg = "blue", onClick }) => {
  let bgClassName = "bg-blue-500";
  if (bg === "green") {
    bgClassName = "bg-green-500";
  }
  if (bg === "red") {
    bgClassName = "bg-red-500";
  }
  return (
    <div onClick={onClick} className="flex flex-col items-center">
      <i
        style={{ width: buttonSize[size], height: buttonSize[size] }}
        className={`block rounded-full border border-black shadow-button active:shadow-buttonActive
          ${bgClassName}`}
      />
      <span className="mt-0.5 text-sm">{label}</span>
    </div>
  );
};

export default Button;
