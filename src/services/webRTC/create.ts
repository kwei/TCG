import { createOffer } from "@/services/webRTC/createOffer";
import { initDataChannel } from "@/services/webRTC/initDataChannel";
import { initRTC } from "@/services/webRTC/initRTC";
import { v4 as uuidv4 } from "uuid";

export const create = async (
  userName: string,
  onMessage: (msg: Message) => void,
) => {
  const roomId = uuidv4();
  const pc = initRTC(roomId, userName);
  const dc = pc.createDataChannel(roomId);
  console.log("Create Data Channel: ", dc.readyState);
  initDataChannel(dc, onMessage);
  await createOffer(pc);
  return { roomId, pc, dc };
};
