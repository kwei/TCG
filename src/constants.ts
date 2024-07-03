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
