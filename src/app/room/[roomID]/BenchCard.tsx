"use client";

import { useMemo } from "react";

interface Props {
  self?: boolean;
}

export const BenchCard = (props: Props) => {
  const { self = false } = props;

  const appliedCss = useMemo(
    () => (self ? "rounded-t-md border-t-2" : "rounded-b-md border-b-2"),
    [self],
  );

  return (
    <div className={`${appliedCss} col-span-1 border-solid border-frame`}></div>
  );
};
