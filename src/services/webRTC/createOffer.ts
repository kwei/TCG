export const createOffer = async (pc: RTCPeerConnection) => {
  console.log("Create Offer");
  return pc
    .createOffer()
    .then((offer) => offer.sdp!)
    .catch((e) => {
      console.log("Set Local SDP Failed: ", e);
      return "";
    });
};
