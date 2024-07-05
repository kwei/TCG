import PieSocket from "piesocket-js";

export async function createPieSocket(roomId) {
  const pieSocket = new PieSocket({
    clusterId: "free.blr2",
    apiKey: "p92tUWPCLY9GLUZ1ybSTDA1YoSQwogrOWoMC1vzc",
    notifySelf: true
  });
  const channel = await pieSocket.subscribe(roomId);
  const onMessage = (topic, cb) => {
    channel.listen(topic, ({ data, userName }) => {
      cb(userName, data);
    });
  };

  const send = (topic, from, data) => {
    channel.publish(topic, {
      data,
      userName: from
    });
  };

  const remove = () => {
    pieSocket.unsubscribe(roomId);
  };

  return { send, onMessage, remove };
}
