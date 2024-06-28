"use client";

import { create } from "@/services/webRTC/create";
import { signaling } from "@/services/webRTC/signaling";
import { join } from "@/services/webRTC/join";
import { init } from "@/services/webRTC/simpleTest";
import { useCallback, useRef, useState, ChangeEvent, useEffect } from "react";

export const Room = () => {
  const [roomId, setRoomId] = useState("");
  const dcRef1 = useRef<RTCDataChannel>();
  const dcRef2 = useRef<RTCDataChannel>();
  const pcRef1 = useRef<RTCPeerConnection>();
  const pcRef2 = useRef<RTCPeerConnection>();
  const [messages, setMessages] = useState("");
  const [userName1, setUsername1] = useState("");
  const [userName2, setUsername2] = useState("");

  const onMessage = useCallback((msg: Message) => {
    console.log(
      `Get Message from ${msg.userName} with: ${msg.message}, at: ${new Date(msg.timestamp).toLocaleString()}`,
    );
  }, []);

  const createRoom = async () => {
    setUsername1("Tester");
    const { pc, roomId, dc } = await create("Tester", onMessage);
    dcRef1.current = dc;
    pcRef1.current = pc;
    setRoomId(roomId);
  };

  const handleOnChangeRoomId = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomId(event.target.value);
  };

  const handleOnChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setMessages(event.target.value);
  };

  const joinRoom = useCallback(async () => {
    setUsername2("Tester2");
    const { pc } = await join(roomId, "Tester2", onMessage, dcRef2);
    pcRef2.current = pc;
  }, [roomId]);

  const sendMessage = useCallback(() => {
    console.log(
      "Message Sender 1 Ready? ",
      dcRef1.current?.readyState === "open",
    );
    if (dcRef1.current && dcRef1.current.readyState === "open") {
      dcRef1.current.send(
        JSON.stringify({
          userName: userName1,
          message: messages,
          timestamp: new Date().getTime(),
        } as Message),
      );
    }
    console.log(
      "Message Sender 2 Ready? ",
      dcRef2.current?.readyState === "open",
    );
    if (dcRef2.current && dcRef2.current.readyState === "open") {
      dcRef2.current.send(
        JSON.stringify({
          userName: userName2,
          message: messages,
          timestamp: new Date().getTime(),
        } as Message),
      );
    }
  }, [messages, userName1, userName2, roomId]);

  const refresh = useCallback(async () => {
    if (pcRef1.current) {
      await signaling(pcRef1.current, roomId, userName1);
    }
  }, [roomId, userName1]);

  useEffect(() => {
    const { createConnection } = init();
    createConnection();
  }, []);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full items-center gap-4 rounded-[14px] border border-solid border-gray-500 p-3">
        <span className="text-left">User 1</span>
        <button
          className="cursor-pointer rounded-sm border border-solid border-gray-500 px-2 py-1"
          onClick={createRoom}
        >
          Create Room
        </button>
        <span>Room ID: {roomId}</span>
        <button
          className="cursor-pointer rounded-sm border border-solid border-gray-500 px-2 py-1"
          onClick={refresh}
        >
          Refresh
        </button>
      </div>

      <div className="flex w-full items-center gap-4 rounded-[14px] border border-solid border-gray-500 p-3">
        <span className="text-left">User 2</span>
        <button
          className="cursor-pointer rounded-sm border border-solid border-gray-500 px-2 py-1"
          onClick={joinRoom}
        >
          Join Room
        </button>
        Room ID:{" "}
        <input
          type="text"
          className="flex-1 px-2 text-black"
          onChange={handleOnChangeRoomId}
        />
      </div>

      <div className="flex items-center gap-4 rounded-[14px] border border-solid border-gray-500 p-3">
        <input
          type="text"
          className="flex-1 px-2 text-black"
          onChange={handleOnChangeMessage}
        />
        <button
          className="cursor-pointer rounded-sm border border-solid border-gray-500 px-2 py-1"
          onClick={sendMessage}
        >
          Send Message
        </button>
      </div>

      <div className="flex items-center gap-4 rounded-[14px] border border-solid border-gray-500 p-3">
        <input
          type="text"
          id="dataChannelSend"
          className="flex-1 px-2 text-black"
        />
        <button
          className="cursor-pointer rounded-sm border border-solid border-gray-500 px-2 py-1"
          id="sendButton"
        >
          Test Send
        </button>
      </div>
    </div>
  );
};
