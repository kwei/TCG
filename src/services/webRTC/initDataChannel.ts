export const initDataChannel = (
  dc: RTCDataChannel,
  onMessage: (msg: Message) => void,
) => {
  dc.onopen = () => {
    console.log("Data channel is open");
  };

  dc.onclose = () => {
    console.log("Data channel is closed");
  };

  dc.onerror = (error) => {
    console.error("Data channel error:", error);
  };

  dc.onmessage = (event) => {
    const data = JSON.parse(event.data) as Message;
    onMessage(data);
  };
};
