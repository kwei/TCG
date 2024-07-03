export const initDataChannel = (
  dc: RTCDataChannel,
  onMessage: (msg: Message) => void,
) => {
  dc.onopen = () => {
    console.log("Data channel is open");
    dc.send(
      JSON.stringify({
        type: "ctrl",
        userName: "",
        avatarIndex: 0,
        message: "聊天室以開啟",
        timestamp: new Date().getTime(),
      } as Message),
    );
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
