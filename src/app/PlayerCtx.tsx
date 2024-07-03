"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export const PlayerCtx = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState<string>("");
  const [avatarIndex, setAvatarIndex] = useState<number>(0);

  const ctxVal = useMemo(
    () => ({
      userName,
      avatarIndex,
    }),
    [userName, avatarIndex],
  );

  return (
    <Ctx.Provider value={ctxVal}>
      <ControlCtx.Provider
        value={{
          setUserName,
          setAvatarIndex,
        }}
      >
        {children}
      </ControlCtx.Provider>
    </Ctx.Provider>
  );
};

const Ctx = createContext({
  userName: "",
  avatarIndex: 0,
});

export const usePlayerCtx = () => useContext(Ctx);

const ControlCtx = createContext({
  setUserName: (name: string) => {},
  setAvatarIndex: (index: number) => {},
});

export const useSetPlayerCtx = () => useContext(ControlCtx);
