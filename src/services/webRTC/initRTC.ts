export const initRTC = (roomId: string, userName: string) => {
  const pc = new RTCPeerConnection();

  console.log("Listen on ICE Candidate Event");
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      console.log("Send Local ICE Candidate: ", event.candidate);
      fetch("/api/aiven/pg/connection", {
        method: "POST",
        body: JSON.stringify({
          action: "get",
          RoomID: roomId,
        } as PGReq),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status) {
            const playerList = (res.playerList as Room[]).filter(
              (player) => player.UserName === userName,
            );
            if (playerList.length === 0) {
              fetch("/api/aiven/pg/connection", {
                method: "POST",
                body: JSON.stringify({
                  action: "set",
                  RoomID: roomId,
                  data: {
                    UserName: userName,
                    RoomID: roomId,
                    SDP: pc.localDescription,
                    ICE: event.candidate,
                    Timestamp: new Date().toISOString(),
                  },
                } as PGReq),
              }).then();
            }
          }
        });
    }
  };

  pc.onconnectionstatechange = (event) => {
    console.log("[PC] Connection State: ", pc.connectionState, event);
  };

  pc.oniceconnectionstatechange = () => {
    console.log("[PC] ICE connection state change: ", pc.iceConnectionState);
  };

  pc.onicegatheringstatechange = () => {
    console.log(
      "[PC] ICE connection gathering state change: ",
      pc.iceGatheringState,
    );
  };

  pc.onicecandidateerror = (event) => {
    console.log("ICE Candidate Event Error: ", event);
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
