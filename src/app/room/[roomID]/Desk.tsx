"use client";

import { LocalBoard, LocalBoardRef } from "@/app/room/[roomID]/LocalBoard";
import { RemoteBoard, RemoteBoardRef } from "@/app/room/[roomID]/RemoteBoard";
import { ActionType } from "@/constants";
import { formatMessage } from "@/services/webRTC/formatMessage";
import { useEffect, useRef } from "react";

interface Props {
  dataChannel?: RTCDataChannel;
  userInfo: UserInfo;
  isHost: boolean;
}

export const Desk = ({ userInfo, dataChannel, isHost }: Props) => {
  const localBoardRef = useRef<LocalBoardRef>(null);
  const remoteBoardRef = useRef<RemoteBoardRef>(null);

  useEffect(() => {
    if (dataChannel) {
      dataChannel.addEventListener("open", () => {
        dataChannel.send(formatMessage(userInfo, ActionType.SelectDeck, ""));
      });
      dataChannel.addEventListener("message", (event) => {
        const data = JSON.parse(event.data) as Message;
        if (data.type === "chat") return;
        if (isHost) {
          localBoardRef.current?.handleAction(data);
        } else {
          remoteBoardRef.current?.handleAction(data);
        }
      });
    }
  }, [dataChannel, isHost, userInfo]);

  return (
    <div className="grid h-full w-full grid-rows-2 gap-2 p-2">
      <RemoteBoard ref={remoteBoardRef} />
      <LocalBoard ref={localBoardRef} />
    </div>
  );
};
