"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

type State = {
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
};

const initState: State = {
  localBattleCard: undefined,
  localBenchCards: [],
  localCardStack: [],
  localFoldArea: [],
  localHandCards: [],
  localSelectedCards: [],
  localSyncopeArea: [],
  remoteBattleCard: undefined,
  remoteBenchCards: [],
  remoteFoldArea: [],
  remoteSelectedCards: [],
  remoteSyncopeArea: [],
};

enum Type {
  UpdateLocalBattleCard,
  UpdateLocalBenchCards,
  UpdateLocalCardStack,
  UpdateLocalFoldArea,
  UpdateLocalHandCards,
  UpdateLocalSelectedCards,
  UpdateLocalSyncopeArea,
  UpdateRemoteBattleCard,
  UpdateRemoteBenchCards,
  UpdateRemoteFoldArea,
  UpdateRemoteSelectedCards,
  UpdateRemoteSyncopeArea,
}

type Action =
  | {
      type: Type.UpdateLocalBattleCard;
      payload: PokemonCard;
    }
  | {
      type: Type.UpdateLocalBenchCards;
      payload: PokemonCard[];
    }
  | {
      type: Type.UpdateLocalCardStack;
      payload: Card[];
    }
  | {
      type: Type.UpdateLocalFoldArea;
      payload: Card[];
    }
  | {
      type: Type.UpdateLocalHandCards;
      payload: Card[];
    }
  | {
      type: Type.UpdateLocalSelectedCards;
      payload: Card[];
    }
  | {
      type: Type.UpdateLocalSyncopeArea;
      payload: PokemonCard[];
    }
  | {
      type: Type.UpdateRemoteBattleCard;
      payload: PokemonCard;
    }
  | {
      type: Type.UpdateRemoteBenchCards;
      payload: PokemonCard[];
    }
  | {
      type: Type.UpdateRemoteFoldArea;
      payload: Card[];
    }
  | {
      type: Type.UpdateRemoteSelectedCards;
      payload: Card[];
    }
  | {
      type: Type.UpdateRemoteSyncopeArea;
      payload: PokemonCard[];
    };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case Type.UpdateLocalBattleCard:
      return { ...state, localBattleCards: action.payload };
    case Type.UpdateLocalBenchCards:
      return { ...state, localBenchCards: action.payload };
    case Type.UpdateLocalCardStack:
      return { ...state, localCardStack: action.payload };
    case Type.UpdateLocalFoldArea:
      return { ...state, localFoldArea: action.payload };
    case Type.UpdateLocalHandCards:
      return { ...state, localHandCards: action.payload };
    case Type.UpdateLocalSelectedCards:
      return { ...state, localSelectedCards: action.payload };
    case Type.UpdateLocalSyncopeArea:
      return { ...state, localSyncopeArea: action.payload };
    case Type.UpdateRemoteBattleCard:
      return { ...state, remoteBattleCard: action.payload };
    case Type.UpdateRemoteBenchCards:
      return { ...state, remoteBenchCards: action.payload };
    case Type.UpdateRemoteFoldArea:
      return { ...state, remoteFoldArea: action.payload };
    case Type.UpdateRemoteSelectedCards:
      return { ...state, remoteSelectedCards: action.payload };
    case Type.UpdateRemoteSyncopeArea:
      return { ...state, remoteSyncopeArea: action.payload };
    default:
      return state;
  }
};

export const GameBoardCtx = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const attachToPokemonCard = useCallback(
    (card: PokemonCard, item: ItemCard) => {},
    [],
  );
  const drawCards = useCallback((num: number) => {}, []);
  const drawCardsInBack = useCallback((num: number) => {}, []);
  const drawCardsInFront = useCallback((num: number) => {}, []);
  const flipToBack = useCallback((card: Card) => {}, []);
  const flipToFront = useCallback((card: Card) => {}, []);
  const placeRewardCards = useCallback(() => {}, []);
  const placeToBattle = useCallback((card: PokemonCard) => {}, []);
  const placeToBench = useCallback((card: PokemonCard) => {}, []);
  const placeToDead = useCallback((card: PokemonCard) => {}, []);
  const placeToDeck = useCallback((card: Card) => {}, []);
  const placeToDeckBottom = useCallback((card: Card) => {}, []);
  const placeToFold = useCallback((card: Card) => {}, []);
  const placeToHand = useCallback((card: Card) => {}, []);
  const placeToStadium = useCallback((card: Card) => {}, []);
  const shuffle = useCallback(() => {}, []);
  const viewDeckAndSelectEnergyCards = useCallback((num: number) => {}, []);
  const viewDeckAndSelectItemCards = useCallback((num: number) => {}, []);
  const viewDeckAndSelectPokemonCards = useCallback((num: number) => {}, []);
  const viewDeckAndSelectPropCards = useCallback((num: number) => {}, []);
  const viewDeckAndSelectSupporterCards = useCallback((num: number) => {}, []);
  const viewFoldAndSelectEnergyCards = useCallback((num: number) => {}, []);
  const viewFoldAndSelectItemCards = useCallback((num: number) => {}, []);
  const viewFoldAndSelectPokemonCards = useCallback((num: number) => {}, []);
  const viewFoldAndSelectPropCards = useCallback((num: number) => {}, []);
  const viewFoldAndSelectSupporterCards = useCallback((num: number) => {}, []);

  const ctxVal = useMemo(
    () => ({
      ...state,
      attachToPokemonCard,
      drawCards,
      drawCardsInBack,
      drawCardsInFront,
      flipToBack,
      flipToFront,
      placeRewardCards,
      placeToBattle,
      placeToBench,
      placeToDead,
      placeToDeck,
      placeToDeckBottom,
      placeToFold,
      placeToHand,
      placeToStadium,
      shuffle,
      viewDeckAndSelectEnergyCards,
      viewDeckAndSelectItemCards,
      viewDeckAndSelectPokemonCards,
      viewDeckAndSelectPropCards,
      viewDeckAndSelectSupporterCards,
      viewFoldAndSelectEnergyCards,
      viewFoldAndSelectItemCards,
      viewFoldAndSelectPokemonCards,
      viewFoldAndSelectPropCards,
      viewFoldAndSelectSupporterCards,
    }),
    [
      state,
      attachToPokemonCard,
      drawCards,
      drawCardsInBack,
      drawCardsInFront,
      flipToBack,
      flipToFront,
      placeRewardCards,
      placeToBattle,
      placeToBench,
      placeToDead,
      placeToDeck,
      placeToDeckBottom,
      placeToFold,
      placeToHand,
      placeToStadium,
      shuffle,
      viewDeckAndSelectEnergyCards,
      viewDeckAndSelectItemCards,
      viewDeckAndSelectPokemonCards,
      viewDeckAndSelectPropCards,
      viewDeckAndSelectSupporterCards,
      viewFoldAndSelectEnergyCards,
      viewFoldAndSelectItemCards,
      viewFoldAndSelectPokemonCards,
      viewFoldAndSelectPropCards,
      viewFoldAndSelectSupporterCards,
    ],
  );

  return <Ctx.Provider value={ctxVal}>{children}</Ctx.Provider>;
};

const Ctx = createContext<DeskContext>({
  localBattleCard: undefined,
  localBenchCards: [],
  localCardStack: [],
  localFoldArea: [],
  localHandCards: [],
  localSelectedCards: [],
  localSyncopeArea: [],
  remoteBattleCard: undefined,
  remoteBenchCards: [],
  remoteFoldArea: [],
  remoteSelectedCards: [],
  remoteSyncopeArea: [],
  attachToPokemonCard(card: PokemonCard, item: ItemCard): void {},
  drawCards(num: number): void {},
  drawCardsInBack(num: number): void {},
  drawCardsInFront(num: number): void {},
  flipToBack(card: Card): void {},
  flipToFront(card: Card): void {},
  placeRewardCards(): void {},
  placeToBattle(card: PokemonCard): void {},
  placeToBench(card: PokemonCard): void {},
  placeToDead(card: PokemonCard): void {},
  placeToDeck(card: Card): void {},
  placeToDeckBottom(card: Card): void {},
  placeToFold(card: Card): void {},
  placeToHand(card: Card): void {},
  placeToStadium(card: Card): void {},
  shuffle(): void {},
  viewDeckAndSelectEnergyCards(num: number): void {},
  viewDeckAndSelectItemCards(num: number): void {},
  viewDeckAndSelectPokemonCards(num: number): void {},
  viewDeckAndSelectPropCards(num: number): void {},
  viewDeckAndSelectSupporterCards(num: number): void {},
  viewFoldAndSelectEnergyCards(num: number): void {},
  viewFoldAndSelectItemCards(num: number): void {},
  viewFoldAndSelectPokemonCards(num: number): void {},
  viewFoldAndSelectPropCards(num: number): void {},
  viewFoldAndSelectSupporterCards(num: number): void {},
});

export const useGameBoardCtx = () => useContext(Ctx);
