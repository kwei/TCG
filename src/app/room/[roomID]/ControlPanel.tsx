"use client";

import { ToastType, useToastCtx } from "@/app/ToastCtx";
import Link from "next/link";
import { useCallback } from "react";
import {
  TbArrowNarrowLeft,
  TbCopy,
  TbLink,
  TbPointer,
  TbRefresh,
} from "react-icons/tb";

interface Props {
  refresh: () => void;
}

export const ControlPanel = (props: Props) => {
  const { refresh } = props;

  const { setMsg, setType } = useToastCtx();
  const copyRoomLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setType(ToastType.success);
      setMsg("邀請連結複製成功");
    });
  }, []);

  return (
    <div className="bg-dark-base-color flex items-center justify-between rounded-md p-2">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="group/leave hover:bg-light-base-color flex items-center gap-2 rounded-sm p-2 pr-3 transition-colors"
        >
          <TbArrowNarrowLeft className="size-5 transition-transform group-hover/leave:-translate-x-1" />
          <span>離開</span>
        </Link>
        <button className="group/restart hover:bg-light-base-color flex items-center gap-2 rounded-sm p-2 pr-3 transition-colors">
          <TbPointer className="size-5 -scale-x-100 transition-transform group-hover/restart:translate-x-1" />
          <span>重新開始</span>
        </button>
        <button
          className="group/invite hover:bg-light-base-color relative flex items-center gap-2 overflow-hidden rounded-sm p-2 pr-3 transition-colors"
          onClick={copyRoomLink}
        >
          <TbLink className="absolute size-5 translate-y-0 transition-transform group-hover/invite:-translate-y-10" />
          <TbCopy className="absolute size-5 translate-y-10 transition-transform group-hover/invite:translate-y-0" />
          <span className="pl-7">邀請連結</span>
        </button>
      </div>
      <button
        className="group/refresh hover:bg-light-base-color bg-base-color flex items-center gap-2 rounded-sm p-2 pr-3 transition-colors"
        onClick={refresh}
      >
        <TbRefresh className="size-5 transition-transform group-hover/refresh:rotate-180" />
        <span>刷新</span>
      </button>
    </div>
  );
};
