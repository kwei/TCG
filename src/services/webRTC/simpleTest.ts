export function init() {
  let localConnection: RTCPeerConnection;
  let remoteConnection: RTCPeerConnection;
  let sendChannel: RTCDataChannel;
  let receiveChannel: RTCDataChannel;

  const dataChannelSend = document.getElementById(
    "dataChannelSend",
  ) as HTMLInputElement;
  const sendButton = document.getElementById("sendButton") as HTMLButtonElement;
  if (sendButton) sendButton.onclick = sendData;

  function createConnection() {
    dataChannelSend.placeholder = "";
    localConnection = new RTCPeerConnection();
    console.log("Created local peer connection object localConnection");

    sendChannel = localConnection.createDataChannel("sendDataChannel");
    console.log("Created send data channel");

    localConnection.onicecandidate = (e) => {
      onIceCandidate(localConnection, e);
    };
    sendChannel.onopen = onSendChannelStateChange;
    sendChannel.onclose = onSendChannelStateChange;

    remoteConnection = new RTCPeerConnection();
    console.log("Created remote peer connection object remoteConnection");

    remoteConnection.onicecandidate = (e) => {
      onIceCandidate(remoteConnection, e);
    };
    remoteConnection.ondatachannel = receiveChannelCallback;

    localConnection
      .createOffer()
      .then(gotDescription1, onCreateSessionDescriptionError);
  }

  function onCreateSessionDescriptionError(error: any) {
    console.log("Failed to create session description: " + error.toString());
  }

  function sendData() {
    const data = dataChannelSend.value;
    sendChannel.send(data);
    console.log("Sent Data: " + data);
  }

  function gotDescription1(desc: RTCSessionDescriptionInit) {
    localConnection.setLocalDescription(desc).then();
    console.log(`Offer from localConnection\n${desc.sdp}`);
    remoteConnection.setRemoteDescription(desc).then();
    remoteConnection
      .createAnswer()
      .then(gotDescription2, onCreateSessionDescriptionError);
  }

  function gotDescription2(desc: RTCSessionDescriptionInit) {
    remoteConnection.setLocalDescription(desc).then();
    console.log(`Answer from remoteConnection\n${desc.sdp}`);
    localConnection.setRemoteDescription(desc).then();
  }

  function getOtherPc(pc: RTCPeerConnection) {
    return pc === localConnection ? remoteConnection : localConnection;
  }

  function getName(pc: RTCPeerConnection) {
    return pc === localConnection
      ? "localPeerConnection"
      : "remotePeerConnection";
  }

  function onIceCandidate(
    pc: RTCPeerConnection,
    event: RTCPeerConnectionIceEvent,
  ) {
    if (event.candidate) {
      getOtherPc(pc)
        .addIceCandidate(event.candidate)
        .then(onAddIceCandidateSuccess, onAddIceCandidateError);
      console.log(
        `${getName(pc)} ICE candidate: ${event.candidate ? event.candidate.candidate : "(null)"}`,
      );
    }
  }

  function onAddIceCandidateSuccess() {
    console.log("AddIceCandidate success.");
  }

  function onAddIceCandidateError(error: any) {
    console.log(`Failed to add Ice Candidate: ${error.toString()}`);
  }

  function receiveChannelCallback(event: RTCDataChannelEvent) {
    console.log("Receive Channel Callback");
    receiveChannel = event.channel;
    receiveChannel.onmessage = onReceiveMessageCallback;
    receiveChannel.onopen = onReceiveChannelStateChange;
    receiveChannel.onclose = onReceiveChannelStateChange;
  }

  function onReceiveMessageCallback(event: MessageEvent) {
    console.log("Received Message: ", event.data);
  }

  function onSendChannelStateChange() {
    const readyState = sendChannel.readyState;
    console.log("Send channel state is: " + readyState);
    if (readyState === "open") {
      dataChannelSend.disabled = false;
      dataChannelSend.focus();
      sendButton.disabled = false;
    } else {
      dataChannelSend.disabled = true;
      sendButton.disabled = true;
    }
  }

  function onReceiveChannelStateChange() {
    const readyState = receiveChannel.readyState;
    console.log(`Receive channel state is: ${readyState}`);
  }

  return { createConnection };
}
