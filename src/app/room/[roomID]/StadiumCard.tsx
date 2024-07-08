"use client";

import { useMemo } from "react";

interface Props {
  self?: boolean;
}

export const StadiumCard = (props: Props) => {
  const { self = false } = props;

  const appliedCss = useMemo(
    () => (self ? "-top-1 -translate-y-1/2" : "-bottom-1 translate-y-1/2"),
    [self],
  );

  return (
    <div
      className={`${appliedCss} absolute left-0 h-[130px] w-[100px] rounded-sm border border-solid border-frame`}
    ></div>
  );
};
