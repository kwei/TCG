export const createOffer = async (pc: RTCPeerConnection) => {
  await pc
    .createOffer()
    .then(async (offer) => {
      await pc.setLocalDescription(offer);
    })
    .then(() => {
      console.log("Local SDP: ", pc.localDescription);
    })
    .catch((e) => {
      console.log("Set Local SDP Failed: ", e);
    });

  return pc;
};
