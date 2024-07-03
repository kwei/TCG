export const signaling = async (
  pc: RTCPeerConnection,
  roomId: string,
  userName: string,
  cb?: (pc: RTCPeerConnection) => Promise<void>,
) => {
  const res = await fetch("/api/aiven/pg/connection", {
    method: "POST",
    body: JSON.stringify({
      action: "get",
      RoomID: roomId,
    } as PGReq),
  }).then((res) => res.json());
  if (res.status) {
    const playerList = (res.playerList as Room[]).filter(
      (player) => player.UserName !== userName,
    );
    if (playerList[0]) {
      if (playerList[0].SDP) {
        await pc
          .setRemoteDescription({
            ...playerList[0].SDP,
            sdp: playerList[0].SDP.sdp.replace(/\\r\\n/g, "\n"),
          })
          .then(async () => {
            console.log("Set Remote SDP: ", playerList[0].SDP);
            if (cb) await cb(pc);
          })
          .catch((e) => {
            console.log("Set Remote SDP Failed: ", e);
          });
      }
      if (playerList[0].ICE) {
        await pc
          .addIceCandidate(new RTCIceCandidate(playerList[0].ICE))
          .then(() => {
            console.log("Set Remote ICE Candidate: ", playerList[0].ICE);
          })
          .catch((e) => {
            console.log("Set Remote ICE Candidate Failed: ", e);
          });
      }
    }
  } else {
    console.log("Get room failed.");
  }
};
