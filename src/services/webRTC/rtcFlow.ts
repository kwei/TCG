import { createPieSocket } from "@/services/pieSocket/createPieSocket";
import { createPeerConnection } from "@/services/webRTC/createPeerConnection";
import { initDataChannel } from "@/services/webRTC/initDataChannel";

let peerConnection: RTCPeerConnection;
let dataChannel: RTCDataChannel;

enum Stage {
  GUEST_READY = "guest-ready",
  RECEIVE_OFFER = "offer",
  RECEIVE_ANSWER = "answer",
  RECEIVE_ICE = "ice",
  LEAVE = "leave"
}

enum Role {
  Guest = "guest",
  Host = "host",
}

export async function rtcFlow(
  roomID: string,
  role: Role,
  handleMessage: (message: Message) => void
) {
  const { send, onMessage, remove } = await createPieSocket(roomID);

  peerConnection = createPeerConnection((ice) => {
    console.log("Signaling ICE To Remote");
    send(Stage.RECEIVE_ICE, role, ice);
  });
  dataChannel = peerConnection.createDataChannel(roomID, {
    negotiated: true,
    id: 0,
    ordered: false
  });
  console.log("Create Data Channel", dataChannel);
  initDataChannel(dataChannel, handleMessage);

  console.log(`Role: ${role}`);
  if (role === Role.Guest) {
    send(Stage.GUEST_READY, role, "");
  }
  onMessage(Stage.GUEST_READY, async (userName: string) => {
    if (role !== userName) {
      console.log("Create Offer");
      const offer = await peerConnection.createOffer();
      console.log("Set Offer");
      await setLocalSDP(offer);
      console.log("Send Offer", peerConnection.localDescription);
      sendOffer(offer);
    }
  });
  onMessage(
    Stage.RECEIVE_OFFER,
    async (userName: string, offer: RTCSessionDescriptionInit) => {
      if (role !== userName) {
        console.log("Set Offer", offer);
        await handleOffer(offer);
        console.log("Create Answer");
        const answer = await peerConnection.createAnswer();
        console.log("Set Answer");
        await setLocalSDP(answer);
        console.log("Send Answer", peerConnection.localDescription);
        sendAnswer(answer);
      }
    }
  );
  onMessage(
    Stage.RECEIVE_ANSWER,
    async (userName: string, answer: RTCSessionDescriptionInit) => {
      if (role !== userName) {
        console.log("Set Answer", answer);
        await handleAnswer(answer);
      }
    }
  );
  onMessage(
    Stage.RECEIVE_ICE,
    async (userName: string, candidate: RTCIceCandidate) => {
      if (role !== userName) {
        console.log("Set Candidate", candidate);
        await handleCandidate(candidate);
      }
    }
  );
  onMessage(
    Stage.LEAVE,
    async () => {
      console.log("Leave Room");
      peerConnection.close();
      dataChannel.close();
      remove();
      document.getElementById("leave-room-btn")?.click();
    }
  );

  async function setLocalSDP(offer: RTCSessionDescriptionInit) {
    return peerConnection.setLocalDescription(new RTCSessionDescription(offer));
  }

  function sendOffer(offer: RTCSessionDescriptionInit) {
    send(Stage.RECEIVE_OFFER, role, offer);
  }

  function sendAnswer(offer: RTCSessionDescriptionInit) {
    send(Stage.RECEIVE_ANSWER, role, offer);
  }

  async function handleOffer(offer: RTCSessionDescriptionInit) {
    return peerConnection.setRemoteDescription(
      new RTCSessionDescription(offer)
    );
  }

  async function handleAnswer(answer: RTCSessionDescriptionInit) {
    return peerConnection.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  }

  async function handleCandidate(candidate: RTCIceCandidate) {
    return peerConnection.addIceCandidate(candidate);
  }

  return { peerConnection, dataChannel, send };
}
