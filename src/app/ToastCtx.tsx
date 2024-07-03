"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const ToastCtx = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<ToastType>(ToastType.info);
  const [msg, setMsg] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const timer = useRef<NodeJS.Timeout>();

  const ctxVal = useMemo(
    () => ({
      setType,
      setMsg,
    }),
    [],
  );

  const shadowColor = useMemo(() => {
    if (type === ToastType.info) {
      return "shadow-blue-300 border-blue-300";
    } else if (type === ToastType.success) {
      return "shadow-green-300 border-green-300";
    } else if (type === ToastType.warning) {
      return "shadow-orange-300 border-orange-300";
    } else if (type === ToastType.error) {
      return "shadow-red-300 border-red-300";
    }
  }, [type]);

  useEffect(() => {
    if (msg !== "") {
      setShow(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setShow(false);
        timer.current = undefined;
      }, 2000);
    }
  }, [msg, type]);

  useEffect(() => {
    if (!show) setMsg("");
  }, [show]);

  return (
    <Ctx.Provider value={ctxVal}>
      {children}
      <div
        className={`bg-dark-base-color fixed left-1/2 top-2 flex w-fit items-center rounded-sm border border-solid px-4 py-2 shadow-md transition-transform ${show ? "translate-y-0" : "-translate-y-60"} ${shadowColor}`}
      >
        {msg}
      </div>
    </Ctx.Provider>
  );
};

export enum ToastType {
  success,
  warning,
  error,
  info,
}

const Ctx = createContext({
  setType: (type: ToastType) => {},
  setMsg: (msg: string) => {},
});

export const useToastCtx = () => useContext(Ctx);
