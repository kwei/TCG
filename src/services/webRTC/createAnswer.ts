export const createAnswer = async (pc: RTCPeerConnection) => {
  await pc
    .createAnswer()
    .then(async (answer) => {
      await pc.setLocalDescription(answer);
    })
    .then(() => {
      console.log("Local SDP: ", pc.localDescription);
    })
    .catch((e) => {
      console.log("Set Local SDP Failed: ", e);
    });
};
