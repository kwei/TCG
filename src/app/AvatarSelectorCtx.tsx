"use client";

import { POKEMON_INDEX_RANGE } from "@/constants";
import Image from "next/image";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const AvatarSelectorCtx = ({ children }: { children: ReactNode }) => {
  const [index, setIndex] = useState(0);
  const [tempIndex, setTempIndex] = useState(0);
  const [show, setShow] = useState(false);
  const avatarListRef = useRef<HTMLDivElement>(null);

  const ctxVal = useMemo(
    () => ({
      open: (initIndex?: number) => {
        if (initIndex) setTempIndex(initIndex);
        setShow(true);
      },
      index,
    }),
    [index],
  );

  const saveIndex = useCallback(() => {
    setShow(false);
    setIndex(tempIndex);
  }, [tempIndex]);

  useEffect(() => {
    if (show && avatarListRef.current) {
      const rows = Math.floor(tempIndex / 6) + 1;
      avatarListRef.current.scrollTo({
        top:
          rows * 72 + // element size
          (rows - 1) * 8 - // gap size
          avatarListRef.current.clientHeight / 2, // list window size
        behavior: "smooth",
      });
    }
  }, [show, tempIndex]);

  return (
    <Ctx.Provider value={ctxVal}>
      {children}
      <div
        className={`fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center ${show ? "visible" : "invisible"}`}
      >
        <div
          className={`flex h-3/4 w-[576px] flex-col gap-8 rounded-xl bg-dark-base-color p-8 transition-all duration-300 ${show ? "scale-100" : "scale-0"}`}
        >
          <h1 className="w-full text-center text-xl font-bold">選擇大頭貼</h1>
          <div
            ref={avatarListRef}
            className="flex w-full flex-1 flex-wrap gap-2 overflow-y-auto overflow-x-hidden p-4"
          >
            {new Array(POKEMON_INDEX_RANGE.max).fill(0).map((_, i) => (
              <button
                type="button"
                key={i.toString()}
                onClick={() => setTempIndex(i + 1)}
                className={`flex size-[72px] scale-100 items-center justify-center rounded-full border-2 border-solid border-frame transition-all ${i + 1 === tempIndex ? "scale-110 border-light-primary opacity-100" : "opacity-60 hover:scale-110 hover:border-light-primary hover:opacity-100"}`}
              >
                <Image
                  src={`/avatars/${i + 1}.svg`}
                  className="size-[52px] object-scale-down"
                  width={52}
                  height={52}
                  alt="Avatar"
                  priority
                />
              </button>
            ))}
          </div>
          <div className="flex w-full items-center justify-center">
            <button
              type="button"
              className="rounded-md bg-primary px-6 py-2 font-bold text-base-color transition-colors hover:bg-light-primary"
              onClick={saveIndex}
            >
              就決定是你了!
            </button>
          </div>
        </div>
      </div>
    </Ctx.Provider>
  );
};

const Ctx = createContext<{
  open: (initIndex?: number) => void;
  index: number;
}>({
  open: () => {},
  index: 0,
});

export const useAvatarSelectorCtx = () => useContext(Ctx);
