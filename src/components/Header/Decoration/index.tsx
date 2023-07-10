// header decoration
import React, { FC } from "react";

type Props = {
  isReverse?: boolean;
};

const HeaderDecoration: FC<Props> = ({ isReverse = false }) => {
  let offsetClassName = "ml-[-0.5rem]";
  let reverseClassName = "";
  if (isReverse) {
    reverseClassName = "rotate-y-180";
    offsetClassName = "mr-[-0.5rem]";
  }
  return (
    <i
      className={`${offsetClassName} ${reverseClassName} relative h-[0.5rem] w-[4rem] bg-black after:absolute after:right-[-1rem] after:top-0 after:block after:h-full after:w-[0.5rem] after:bg-black after:shadow-headerDecoration after:content-['']`}
    />
  );
};

export default HeaderDecoration;
