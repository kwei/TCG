import { createAnswer } from "@/services/webRTC/createAnswer";
import { initDataChannel } from "@/services/webRTC/initDataChannel";
import { signaling } from "@/services/webRTC/signaling";
import { initRTC } from "@/services/webRTC/initRTC";
import { MutableRefObject } from "react";

export const join = async (
  roomId: string,
  userName: string,
  onMessage: (msg: Message) => void,
  dcRef: MutableRefObject<RTCDataChannel | undefined>,
) => {
  const pc = initRTC(roomId, userName);
  pc.ondatachannel = (event) => {
    const dc = event.channel;
    console.log("Listen on Data Channel: ", dc.readyState);
    dcRef.current = dc;
    initDataChannel(dc, onMessage);
  };
  await signaling(pc, roomId, userName, (pc) => createAnswer(pc));
  return { pc };
};
