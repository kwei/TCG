"use client";

import { POKEMON_INDEX_RANGE } from "@/constants";
import Image from "next/image";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export const AvatarSelectorCtx = ({ children }: { children: ReactNode }) => {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);

  const ctxVal = useMemo(
    () => ({
      open: () => {
        console.log("open");
        setShow(true);
      },
      index,
    }),
    [index],
  );

  return (
    <Ctx.Provider value={ctxVal}>
      {children}
      <div
        className={`fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center ${show ? "visible" : "invisible"}`}
      >
        <div
          className={`h-1/2 w-[576px] rounded-xl bg-dark-base-color p-8 transition-all duration-300 ${show ? "scale-100" : "scale-0"}`}
        >
          <div className="flex h-[calc(100%-64px)] w-full flex-wrap gap-2 overflow-y-auto overflow-x-hidden p-4">
            {new Array(POKEMON_INDEX_RANGE.max).fill(0).map((_, i) => (
              <button
                type="button"
                key={i.toString()}
                onClick={() => setIndex(i + 1)}
                className={`flex size-[72px] scale-100 items-center justify-center rounded-full border-2 border-solid border-frame transition-all ${i + 1 === index ? "scale-110 border-light-primary" : "hover:scale-110 hover:border-light-primary"}`}
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
          <div className="flex h-[64px] w-full items-end justify-end">
            <button
              type="button"
              className="rounded-md bg-primary px-4 py-1 font-bold text-base-color transition-colors hover:bg-light-primary"
              onClick={() => setShow(false)}
            >
              關閉
            </button>
          </div>
        </div>
      </div>
    </Ctx.Provider>
  );
};

const Ctx = createContext<{
  open: () => void;
  index: number;
}>({
  open: () => {},
  index: 0,
});

export const useAvatarSelectorCtx = () => useContext(Ctx);