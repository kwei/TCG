"use client";

import { ToastType, useToastCtx } from "@/app/ToastCtx";
import Link from "next/link";
import { useCallback } from "react";
import { TbArrowNarrowLeft, TbCopy, TbLink, TbPointer } from "react-icons/tb";

interface Props {
  leaveRoom: () => void;
}

export const ControlPanel = (props: Props) => {
  const { leaveRoom } = props;

  const { setMsg, setType } = useToastCtx();
  const copyRoomLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setType(ToastType.success);
      setMsg("邀請連結複製成功");
    });
  }, [setMsg, setType]);

  return (
    <div className="flex items-center justify-between rounded-md bg-dark-base-color p-2">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          id="leave-room-btn"
          onClick={leaveRoom}
          className="group/leave flex items-center gap-2 rounded-sm p-2 pr-3 transition-colors hover:bg-light-base-color"
        >
          <TbArrowNarrowLeft className="size-5 transition-transform group-hover/leave:-translate-x-1" />
          <span>離開</span>
        </Link>
        <button className="group/restart flex items-center gap-2 rounded-sm p-2 pr-3 transition-colors hover:bg-light-base-color">
          <TbPointer className="size-5 -scale-x-100 transition-transform group-hover/restart:translate-x-1" />
          <span>重新開始</span>
        </button>
        <button
          className="group/invite relative flex items-center gap-2 overflow-hidden rounded-sm p-2 pr-3 transition-colors hover:bg-light-base-color"
          onClick={copyRoomLink}
        >
          <TbLink className="absolute size-5 translate-y-0 transition-transform group-hover/invite:-translate-y-10" />
          <TbCopy className="absolute size-5 translate-y-10 transition-transform group-hover/invite:translate-y-0" />
          <span className="pl-7">邀請連結</span>
        </button>
      </div>
    </div>
  );
};
