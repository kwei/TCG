"use client";

interface Props {
  fold?: boolean;
}

export const DeckCards = (props: Props) => {
  const { fold = false } = props;
  return (
    <div className="flex aspect-[0.85] w-[100px] items-center justify-center rounded-sm border border-solid border-frame">
      <span>{fold ? "棄牌區" : "牌組"}</span>
    </div>
  );
};
