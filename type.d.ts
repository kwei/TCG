interface PGReq {
  action: "set" | "delete" | "get";
  RoomID: string;
  data: Room;
}

interface Room {
  RoomID: string;
  UserName: string;
  ICE: RTCIceCandidate;
  SDP: RTCSessionDescription;
  Timestamp: string;
}

type UserInfo = {
  userName: string;
  avatarIndex: number;
};

interface Message {
  type: "chat" | "ctrl";
  userInfo: UserInfo;
  message: string;
  timestamp: number;
}

enum Types {
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

enum Items {}

enum NegativeStatus {
  Poisoned = "Poisoned",
  Burned = "Burned",
  Asleep = "Asleep",
  Paralysis = "Paralysis",
}

interface PokemonType {
  type: Types[];
  weakness: Types[];
  restraints: Types[];
}

interface Attack {
  name: string;
  damage: number;
  energyCost: Types[];
  desc: string;
  effect?: (deskContext: DeskContext) => number;
}

interface Ability {
  name: string;
  effect: (deskContext: DeskContext) => void;
}

interface Card {
  id: number;
  name: string;
  ability: Ability;
}

interface PokemonCard extends Card {
  hp: number;
  type: PokemonType[];
  evolveFrom?: Card;
  evolveTo?: Card[];
  attack: Attack[];
  retreatCost: number;

  active: boolean;
  benched: boolean;
  attachedEnergy: Types[];
  attachedItems: Items[];

  poisoned: boolean;
  burned: boolean;
  asleep: boolean;
  paralysis: boolean;
}

interface ItemCard extends Card {

}

interface DeskContext {
  // 檯面上可獲取的資訊
  localCardStack: Array<Card>;
  localHandCards: Array<Card>;
  localBattleCard?: PokemonCard;
  localBenchCards: Array<PokemonCard>;
  localSelectedCards: Array<Card>;
  localSyncopeArea: Array<PokemonCard>;
  localFoldArea: Array<Card>;
  remoteBattleCard?: PokemonCard;
  remoteBenchCards: Array<Card>;
  remoteSelectedCards: Array<Card>;
  remoteSyncopeArea: Array<PokemonCard>;
  remoteFoldArea: Array<Card>;

  // 對牌庫的操作
  drawCards: (num: number) => void;
  drawCardsInBack: (num: number) => void;
  drawCardsInFront: (num: number) => void;
  shuffle: () => void;
  placeRewardCards: () => void;
  viewDeckAndSelectPokemonCards: (num: number) => void;
  viewDeckAndSelectEnergyCards: (num: number) => void;
  viewDeckAndSelectItemCards: (num: number) => void;
  viewDeckAndSelectPropCards: (num: number) => void;
  viewDeckAndSelectSupporterCards: (num: number) => void;

  // 對棄牌區的操作
  viewFoldAndSelectPokemonCards: (num: number) => void;
  viewFoldAndSelectEnergyCards: (num: number) => void;
  viewFoldAndSelectItemCards: (num: number) => void;
  viewFoldAndSelectPropCards: (num: number) => void;
  viewFoldAndSelectSupporterCards: (num: number) => void;

  // 卡片基本的操作
  // 對道具卡片的操作
  // 對支援者卡片的操作
  placeToDeckBottom: (card: Card) => void;
  placeToDeck: (card: Card) => void;
  placeToFold: (card: Card) => void;
  placeToHand: (card: Card) => void;
  flipToFront: (card: Card) => void;
  flipToBack: (card: Card) => void;

  // 對寶可夢卡片的操作
  placeToBattle: (card: PokemonCard) => void;
  placeToBench: (card: PokemonCard) => void;
  placeToDead: (card: PokemonCard) => void;

  // 對物品卡片的操作
  // 對能量卡片的操作
  attachToPokemonCard: (card: PokemonCard, item: ItemCard) => void;

  // 對場地卡片的操作
  placeToStadium: (card: Card) => void;
}
