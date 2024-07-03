import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const Block = ({ children, className = "", ...legacy }: Props) => {
  return (
    <div
      {...legacy}
      className={`${className} border-frame hover:border-light-frame rounded-xl border-2 border-solid p-10 transition-colors`}
    >
      {children}
    </div>
  );
};
