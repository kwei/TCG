"use client";

interface Props {

}

/**
 * 遊戲流程：
 * 1. 選牌組（60 張）
 * 2. 確認遊戲是否能開始：
 *   a. 己方選完牌傳送訊號給對方，對方收到訊號且也完成選牌後傳送“開始遊戲”訊號給己方。己方傳送“收到”訊號並開始遊戲。
 *   b. 對方選完牌傳送訊號給己方，己方收到訊號且也完成選牌後傳送“開始遊戲”訊號給對方。對方傳送“收到”訊號並開始遊戲。
 * 3. 由房主來主持遊戲，投擲硬幣決定先攻後攻。（主持方為正面; 另一方為反面）決定後傳送“先攻”訊號。
 * 4. 雙方抽牌（7 張），確認是否有基礎寶可夢？
 *   a. 如果手上有基礎寶可夢，放置一隻基礎寶可夢（背面）到戰鬥區，傳送“放置戰鬥區”訊號到對方。
 *   b. 如果手上沒有基礎寶可夢，重新抽牌（7 張）並傳送“多抽取 1 張”訊號到對方，再次確認是否有基礎寶可夢（重複至手上有基礎寶可夢為止）。
 * 5. 收到”放置戰鬥區“訊號且己方已有放置戰鬥區寶可夢，抽取獎勵牌（6 張）並傳送“抽取獎勵牌”訊號。
 * 6. 開始遊戲，先攻方開始...。
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
