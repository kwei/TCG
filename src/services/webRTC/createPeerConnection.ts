export const createPeerConnection = (
  onIceCandidate: (data: RTCIceCandidate) => void,
) => {
  const pc = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      onIceCandidate(event.candidate);
    } else {
      console.log("[PC] All ICE candidates have been generated.");
    }
  };

  pc.onsignalingstatechange = () => {
    console.log("[PC] Signaling State: ", pc.signalingState);
  };

  pc.onconnectionstatechange = () => {
    console.log("[PC] Connection State: ", pc.connectionState);
  };

  pc.oniceconnectionstatechange = () => {
    console.log("[PC] ICE connection state: ", pc.iceConnectionState);
  };

  pc.onicegatheringstatechange = () => {
    console.log("[PC] ICE connection gathering state: ", pc.iceGatheringState);
  };

  pc.onicecandidateerror = (event) => {
    console.log("[PC] ICE Candidate Event Error: ", event);
  };

  // pc.addEventListener("track", (event) => {
  //   const [remoteStream] = event.streams;
  //   console.log("Remote Stream: ", remoteStream);
  // });
  //
  // navigator.mediaDevices
  //   .getUserMedia({ video: false, audio: true })
  //   .then((stream) => {
  //     console.log("Local Stream: ", stream);
  //     stream.getTracks().forEach((track) => pc.addTrack(track, stream));
  //   });

  return pc;
};
