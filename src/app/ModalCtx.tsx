"use client";

import { Profile } from "@/app/(site)/Profile";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export const ModalCtx = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<ReactNode>();
  const [open, setOpen] = useState<boolean>(false);

  const updateContent = useCallback((content: ReactNode) => {
    setOpen(true);
    setContent(content);
  }, []);

  const close = useCallback((cb?: () => void) => {
    setOpen(false);
    setContent(undefined);
    if (cb) cb();
  }, []);

  const ctxVal = useMemo(
    () => ({
      updateContent,
      close,
    }),
    [updateContent, close],
  );

  return (
    <Ctx.Provider value={ctxVal}>
      {children}
      {open && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-highlight shadow-highlight rounded-xl p-[2px] shadow-lg">
            <div className="bg-base-color rounded-[10px] p-6">{content}</div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
};

const Ctx = createContext<{
  updateContent: (content: ReactNode) => void;
  close: (cb?: () => void) => void;
}>({
  updateContent: (content: ReactNode) => {},
  close: (cb?: () => void) => {},
});

export const useModalCtx = () => useContext(Ctx);
