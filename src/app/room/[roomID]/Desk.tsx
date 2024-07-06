"use client";

interface Props {

}

/**
 * 遊戲流程：
 * 一，
 * 二，
 * */

export const Desk = (props: Props) => {
  return (
    <div className="grid h-full w-full grid-rows-2 gap-2 rounded-sm border border-solid border-frame p-2">
      {/* Remote Peer */}
      <div className="row-span-1 grid w-full grid-cols-7 gap-2">
        <div className="col-span-1 grid grid-rows-2 gap-2">
          <div className="row-span-1 flex items-center justify-center">
            {/* Fold Cards */}
            <div className="aspect-[0.85] w-[130px] rounded-sm border border-solid border-frame"></div>
          </div>
          <div className="row-span-1 flex items-center justify-center">
            {/* Deck Cards */}
            <div className="aspect-[0.85] w-[130px] rounded-sm border border-solid border-frame"></div>
          </div>
        </div>

        <div className="col-span-5 grid grid-rows-2 gap-2">
          {/* Bench Cards */}
          <div className="row-span-1 grid grid-cols-6 gap-2">
            <div className="col-span-1 rounded-b-md border-b-2 border-solid border-frame"></div>
            <div className="col-span-1 rounded-b-md border-b-2 border-solid border-frame"></div>
            <div className="col-span-1 rounded-b-md border-b-2 border-solid border-frame"></div>
            <div className="col-span-1 rounded-b-md border-b-2 border-solid border-frame"></div>
            <div className="col-span-1 rounded-b-md border-b-2 border-solid border-frame"></div>
            <div className="col-span-1 rounded-b-md border-b-2 border-solid border-frame"></div>
          </div>
          <div className="relative row-span-1 flex items-end justify-center">
            {/* Battle Card */}
            <div className="h-[150px] w-[130px] rounded-sm border border-solid border-frame"></div>
            {/* Stadium Card */}
            <div className="absolute -bottom-1 left-0 h-[130px] w-[100px] translate-y-1/2 rounded-sm border border-solid border-frame"></div>
          </div>
        </div>

        {/* Reward Cards */}
        <div className="col-span-1 flex items-end justify-center">
          <div className="flex w-[126px] flex-row flex-wrap gap-1">
            <div className="h-[69px] w-[60px] rounded-sm border border-solid border-frame"></div>
            <div className="h-[69px] w-[60px] rounded-sm border border-solid border-frame"></div>
            <div className="h-[69px] w-[60px] rounded-sm border border-solid border-frame"></div>
            <div className="h-[69px] w-[60px] rounded-sm border border-solid border-frame"></div>
            <div className="h-[69px] w-[60px] rounded-sm border border-solid border-frame"></div>
            <div className="h-[69px] w-[60px] rounded-sm border border-solid border-frame"></div>
          </div>
        </div>
      </div>

      {/* Local Peer */}
      <div className="row-span-1 grid w-full grid-cols-7 gap-2">
        {/* Reward Cards */}
        <div className="col-span-1 flex items-start justify-center">
          <div className="flex w-[126px] flex-row flex-wrap gap-1">
            <div className="h-[69px] w-[60px] rounded-sm border border-solid border-frame"></div>
            <div className="h-[69px] w-[60px] rounded-sm border border-solid border-frame"></div>
            <div className="h-[69px] w-[60px] rounded-sm border border-solid border-frame"></div>
            <div className="h-[69px] w-[60px] rounded-sm border border-solid border-frame"></div>
            <div className="h-[69px] w-[60px] rounded-sm border border-solid border-frame"></div>
            <div className="h-[69px] w-[60px] rounded-sm border border-solid border-frame"></div>
          </div>
        </div>

        <div className="col-span-5 grid grid-rows-2 gap-2">
          <div className="relative row-span-1 flex items-start justify-center">
            {/* Battle Card */}
            <div className="h-[150px] w-[130px] rounded-sm border border-solid border-frame"></div>
            {/* Stadium Card */}
            <div className="absolute -top-1 left-0 h-[130px] w-[100px] -translate-y-1/2 rounded-sm border border-solid border-frame"></div>
          </div>
          {/* Bench Cards */}
          <div className="row-span-1 grid grid-cols-6 gap-2">
            <div className="col-span-1 rounded-t-md border-t-2 border-solid border-frame"></div>
            <div className="col-span-1 rounded-t-md border-t-2 border-solid border-frame"></div>
            <div className="col-span-1 rounded-t-md border-t-2 border-solid border-frame"></div>
            <div className="col-span-1 rounded-t-md border-t-2 border-solid border-frame"></div>
            <div className="col-span-1 rounded-t-md border-t-2 border-solid border-frame"></div>
            <div className="col-span-1 rounded-t-md border-t-2 border-solid border-frame"></div>
          </div>
        </div>

        <div className="col-span-1 grid h-full grid-rows-2 gap-2">
          <div className="row-span-1 flex items-center justify-center">
            {/* Deck Cards */}
            <div className="aspect-[0.85] w-[130px] rounded-sm border border-solid border-frame"></div>
          </div>
          <div className="row-span-1 flex items-center justify-center">
            {/* Fold Cards */}
            <div className="aspect-[0.85] w-[130px] rounded-sm border border-solid border-frame"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
