export const POKEMON_INDEX_RANGE = {
  min: 1,
  max: 649,
};

export enum Types {
  Bug = "蟲",
  Dark = "惡",
  Dragon = "龍",
  Electric = "電",
  Fairy = "妖精",
  Fighting = "格鬥",
  Fire = "火",
  Flying = "飛行",
  Ghost = "幽靈",
  Grass = "草",
  Ground = "地面",
  Ice = "冰",
  Normal = "一般",
  Poison = "毒",
  Psychic = "超能力",
  Rock = "岩石",
  Steel = "鋼",
  Water = "水",
}

export enum Items {}

export enum NegativeStatus {
  Poisoned = "Poisoned",
  Burned = "Burned",
  Asleep = "Asleep",
  Paralysis = "Paralysis",
}

export const WeaknessTypeMap: Record<Types, Types[]> = {
  [Types.Bug]: [Types.Fire, Types.Flying, Types.Rock],
  [Types.Dark]: [Types.Fighting, Types.Bug, Types.Fairy],
  [Types.Dragon]: [Types.Ice, Types.Dragon, Types.Fairy],
  [Types.Electric]: [Types.Ground],
  [Types.Fairy]: [Types.Poison, Types.Steel],
  [Types.Fire]: [Types.Water, Types.Ground, Types.Rock],
  [Types.Fighting]: [Types.Flying, Types.Psychic, Types.Fairy],
  [Types.Flying]: [Types.Electric, Types.Ice, Types.Rock],
  [Types.Grass]: [Types.Fire, Types.Ice, Types.Poison, Types.Flying, Types.Bug],
  [Types.Ghost]: [Types.Ghost, Types.Dark],
  [Types.Ground]: [Types.Ice, Types.Grass, Types.Water],
  [Types.Ice]: [Types.Fire, Types.Fighting, Types.Rock, Types.Steel],
  [Types.Normal]: [Types.Fighting],
  [Types.Poison]: [Types.Ground, Types.Psychic],
  [Types.Psychic]: [Types.Bug, Types.Ghost, Types.Dark],
  [Types.Rock]: [
    Types.Water,
    Types.Grass,
    Types.Fighting,
    Types.Ground,
    Types.Steel,
  ],
  [Types.Steel]: [Types.Fire, Types.Flying, Types.Ground],
  [Types.Water]: [Types.Electric, Types.Grass],
};

export const RestraintsTypeMap: Record<Types, Types[]> = {
  [Types.Bug]: [Types.Grass, Types.Psychic, Types.Dark],
  [Types.Dark]: [Types.Psychic, Types.Ghost],
  [Types.Dragon]: [Types.Dragon],
  [Types.Electric]: [Types.Water, Types.Flying],
  [Types.Fairy]: [Types.Fighting, Types.Dragon, Types.Dark],
  [Types.Fire]: [Types.Grass, Types.Ice, Types.Bug, Types.Steel],
  [Types.Fighting]: [
    Types.Normal,
    Types.Ice,
    Types.Rock,
    Types.Dark,
    Types.Steel,
  ],
  [Types.Flying]: [Types.Grass, Types.Fighting, Types.Bug],
  [Types.Grass]: [Types.Water, Types.Ground, Types.Rock],
  [Types.Ghost]: [Types.Psychic, Types.Ghost],
  [Types.Ground]: [
    Types.Fire,
    Types.Electric,
    Types.Poison,
    Types.Rock,
    Types.Steel,
  ],
  [Types.Ice]: [Types.Grass, Types.Ground, Types.Flying, Types.Dragon],
  [Types.Normal]: [],
  [Types.Poison]: [Types.Grass, Types.Fairy],
  [Types.Psychic]: [Types.Fighting, Types.Poison],
  [Types.Rock]: [Types.Fire, Types.Ice, Types.Flying, Types.Bug],
  [Types.Steel]: [Types.Ice, Types.Rock, Types.Fairy],
  [Types.Water]: [Types.Fire, Types.Ground, Types.Rock],
};

/**
 * 遊戲流程：
 * 1. 各自選牌組（60 張），完成後傳送"已經選好牌組"訊號。
 * 2. 房主在已傳送"已經選好牌組"訊號且收到"確認選好牌組"訊號後，開始下一步。
 * 3. 由房主來主持遊戲，投擲硬幣決定先攻後攻。（主持方為正面; 另一方為反面）決定後傳送“先攻”訊號。
 * 4. 雙方抽牌（7 張），確認是否有基礎寶可夢？
 *   a. 如果手上有基礎寶可夢，放置一隻基礎寶可夢（背面）到戰鬥區，傳送“放置戰鬥區”訊號到對方。
 *     i. 抽取獎勵牌（6 張）並傳送“抽取獎勵牌”訊號。
 *   b. 如果手上沒有基礎寶可夢，重新抽牌（7 張），再次確認是否有基礎寶可夢（重複至手上有基礎寶可夢為止）。
 *     i. 抽取獎勵牌（6 張）並傳送“抽取獎勵牌”訊號，並根據重抽次數計算對方可抽取張數，傳送“額外抽取”訊號到對方。
 * 5. 接收到“額外抽取”訊號的玩家進行抽牌。
 * 6. 房主傳送"開始遊戲"訊號，房客收到後回傳"確認開始遊戲"訊號以開始遊戲。
 * 7. 先攻者抽一張牌。
 * --------------- 各種操作待確認 ---------------
 * 8. 結束回合。
 * */

export enum ActionType {
  // 一般遊戲流程
  SelectDeck = "已經選好牌組",
  SelectDeckAck = "確認選好牌組",
  FlipCoin = "擲硬幣",
  GoFirst = "先攻者: ",
  Draw7Cards = "抽7張",
  PlaceBattleCard = "放置戰鬥寶可夢",
  ReDraw7Cards = "重新抽7張",
  ExtraDraws = "重抽次數",
  StartGame = "開始遊戲",
  StartGameAck = "確認開始遊戲",
  TakeTurn = "換人",

  // 對牌庫的操作
  Draw1Card = "抽一張",
  Draw1CardInBack = "抽一張背面展示",
  Draw1CardInFront = "抽一張正面展示",
  Shuffle = "洗牌",
  PlaceToBottom = "放至牌庫底",
  PlaceRewardCards = "放置獎勵牌",

  // 對棄牌區的操作

  // 對寶可夢卡片的操作

  // 對物品卡片的操作

  // 對道具卡片的操作

  // 對場地卡片的操作

  // 對支援者卡片的操作

  // 對能量卡片的操作
}
