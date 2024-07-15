"use client";

import { BattleCard } from "@/app/room/[roomID]/BattleCard";
import { BenchCard } from "@/app/room/[roomID]/BenchCard";
import { DeckCards } from "@/app/room/[roomID]/DeckCards";
import { ExileCard } from "@/app/room/[roomID]/ExileCard";
import { RewardCard } from "@/app/room/[roomID]/RewardCard";
import { StadiumCard } from "@/app/room/[roomID]/StadiumCard";
import { forwardRef, useCallback, useImperativeHandle } from "react";

interface Props {}

export type RemoteBoardRef = {
  handleAction: (data: Message) => void;
};

export const RemoteBoard = forwardRef<RemoteBoardRef, Props>((props, ref) => {
  const {} = props;

  const handleAction = useCallback((data: Message) => {}, []);

  useImperativeHandle(ref, () => ({
    handleAction,
  }));

  return (
    <div className="row-span-1 grid w-full grid-cols-7 gap-2">
      <div className="col-span-1 grid grid-rows-2 gap-2">
        <div className="row-span-1 flex items-center justify-center">
          {/* Fold Cards */}
          <DeckCards fold />
        </div>
        <div className="row-span-1 flex items-center justify-center">
          {/* Deck Cards */}
          <DeckCards />
        </div>
      </div>

      <div className="col-span-5 grid grid-rows-2 gap-2">
        {/* Bench Cards */}
        <div className="row-span-1 grid grid-cols-6 gap-2">
          <BenchCard />
          <BenchCard />
          <BenchCard />
          <BenchCard />
          <BenchCard />
          <BenchCard />
        </div>
        <div className="relative row-span-1 flex items-end justify-center">
          {/* Battle Card */}
          <BattleCard />
          {/* Stadium Card */}
          <StadiumCard />
        </div>
      </div>

      {/* Reward Cards */}
      <div className="col-span-1 flex flex-col items-center justify-end gap-2">
        <div className="flex w-full flex-row flex-wrap gap-1">
          <RewardCard />
          <RewardCard />
          <RewardCard />
          <RewardCard />
          <RewardCard />
          <RewardCard />
        </div>
        <ExileCard />
      </div>
    </div>
  );
});
RemoteBoard.displayName = "RemoteBoard";
