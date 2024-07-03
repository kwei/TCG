import { createOffer } from "@/services/webRTC/createOffer";
import { initDataChannel } from "@/services/webRTC/initDataChannel";
import { initRTC } from "@/services/webRTC/initRTC";

export const create = async (
  roomId: string,
  userName: string,
  onMessage: (msg: Message) => void,
) => {
  const pc = initRTC(roomId, userName);
  const dc = pc.createDataChannel(roomId);
  console.log("Create Data Channel: ", dc.readyState);
  initDataChannel(dc, onMessage);
  await createOffer(pc);
  return { roomId, pc, dc };
};
