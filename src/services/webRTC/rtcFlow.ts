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
}

enum Role {
  Guest = "guest",
  Host = "host",
}

export async function rtcFlow(
  roomID: string,
  role: Role,
  handleMessage: (message: Message) => void,
) {
  const { send, onMessage } = await createPieSocket(roomID);

  peerConnection = createPeerConnection((ice) => {
    console.log("Signaling ICE To Remote");
    send(Stage.RECEIVE_ICE, role, ice);
  });

  console.log(`Role: ${role}`);
  if (role === Role.Guest) {
    console.log("Listen on Data Channel");
    peerConnection.ondatachannel = (event) => {
      dataChannel = event.channel;
      initDataChannel(dataChannel, handleMessage);
    };
    send(Stage.GUEST_READY, role, "");
  } else if (role === Role.Host) {
    dataChannel = peerConnection.createDataChannel("test-channel");
    console.log("Create Data Channel");
    initDataChannel(dataChannel, handleMessage);
  }
  onMessage(Stage.GUEST_READY, async (userName: string) => {
    if (role !== userName) {
      console.log("Create Offer");
      const offer = await peerConnection.createOffer();
      console.log("Set Offer");
      await setLocalSDP(offer);
      console.log("Send Offer");
      sendOffer(offer);
    }
  });
  onMessage(Stage.RECEIVE_OFFER, async (userName: string, sdp: string) => {
    if (role !== userName) {
      console.log("Set Offer");
      await handleOffer(sdp);
      console.log("Create Answer");
      const answer = await peerConnection.createAnswer();
      console.log("Set Answer");
      await setLocalSDP(answer);
      console.log("Send Answer");
      sendAnswer(answer);
    }
  });
  onMessage(Stage.RECEIVE_ANSWER, async (userName: string, sdp: string) => {
    if (role !== userName) {
      console.log("Set Answer");
      await handleAnswer(sdp);
    }
  });
  onMessage(
    Stage.RECEIVE_ICE,
    async (userName: string, candidate: RTCIceCandidate) => {
      if (role !== userName) {
        console.log("Set Candidate");
        await handleCandidate(candidate);
      }
    },
  );

  async function setLocalSDP(offer: RTCSessionDescriptionInit) {
    return peerConnection.setLocalDescription(offer);
  }

  function sendOffer(offer: RTCSessionDescriptionInit) {
    send(Stage.RECEIVE_OFFER, role, offer.sdp);
  }

  function sendAnswer(offer: RTCSessionDescriptionInit) {
    send(Stage.RECEIVE_ANSWER, role, offer.sdp);
  }

  async function handleOffer(sdp: string) {
    return peerConnection.setRemoteDescription({
      type: "offer",
      sdp,
    });
  }

  async function handleAnswer(sdp: string) {
    return peerConnection.setRemoteDescription({
      type: "answer",
      sdp,
    });
  }

  async function handleCandidate(candidate: RTCIceCandidate) {
    return peerConnection.addIceCandidate(candidate);
  }

  return dataChannel;
}
