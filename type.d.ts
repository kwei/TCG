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

interface Message {
  type: "chat" | "ctrl";
  userInfo: {
    userName: string;
    avatarIndex: number;
  };
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
  hp: number;
  type: PokemonType[];
  evolveFrom?: Card;
  evolveTo?: Card[];
  attack: Attack[];
  ability: Ability;
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

interface DeskContext {
  localCardStack: Card[];
  localHandCards: Card[];
  localActiveCard: Card;
  localBenchCards: Card[];
  localSelectedCards: Card[];
  localSyncopeArea: Card[];
  localFoldArea: Card[];
  remoteActiveCard: Card;
  remoteBenchCards: Card[];
  remoteSelectedCards: Card[];
  remoteSyncopeArea: Card[];
  remoteFoldArea: Card[];

  takeTurn: () => Promise<boolean>;
  shuffleCards: () => void;
  stackCardToBottom: () => void;
  drawCardToHand: () => void;
  drawAwardCards: () => void;
  drawCardToShow: () => void;
  drawCardNotShow: () => void;
  drawCardToBench: () => void;
  selectCardToShow: () => void;
  selectFoldCard: () => void;
}
