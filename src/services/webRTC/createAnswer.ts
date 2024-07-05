export const createAnswer = async (pc: RTCPeerConnection) => {
  console.log("Create Answer");
  return pc
    .createAnswer()
    .then((answer) => answer.sdp!)
    .catch((e) => {
      console.log("Set Local SDP Failed: ", e);
      return "";
    });
};
