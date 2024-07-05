"use client";

import { Profile } from "@/app/(site)/Profile";
import { useModalCtx } from "@/app/ModalCtx";
import { usePlayerCtx } from "@/app/PlayerCtx";
import { Chat } from "@/app/room/[roomID]/Chat";
import { ControlPanel } from "@/app/room/[roomID]/ControlPanel";
import { Desk } from "@/app/room/[roomID]/Desk";
import { POKEMON_INDEX_RANGE } from "@/constants";
import { rtcFlow } from "@/services/webRTC/rtcFlow";
import { useParams } from "next/navigation";
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

enum Role {
  Guest = "guest",
  Host = "host",
}

export default function Home() {
  const { roomID }: { roomID: string } = useParams();
  const { userName: _userName, avatarIndex: _avatarIndex } = usePlayerCtx();
  const [userInfo, setUserInfo] = useState({
    userName: _userName,
    avatarIndex: _avatarIndex
  });
  const { updateContent, close } = useModalCtx();
  const [messages, setMessages] = useState<Message[]>([]);
  const initRef = useRef<boolean>(false);
  const peerConnectionRef = useRef<RTCPeerConnection>();
  const dataChannelRef = useRef<RTCDataChannel>();
  const signalingRef = useRef<(topic: string, from: string, data: string) => void>();

  const role = useMemo(() => _userName === "" ? Role.Guest : Role.Host, [_userName]);

  const handleOnMessage = (message: Message) => {
    setMessages((prevState) => {
      const newState = Array.from(prevState);
      newState.push(message);
      return newState;
    });
  };

  const handleLeaveRoom = useCallback(() => {
    if (signalingRef.current) {
      signalingRef.current("leave", "", "");
    }
  }, []);

  const handleJoinRoom = useCallback((event: FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const userName = data.get("userName") as string;
    const avatarIndex = Number(data.get("avatarIndex") as string);
    setUserInfo({
      userName,
      avatarIndex
    });
    close();
  }, [close]);

  const sendMessage = useCallback((message: Message) => {
    dataChannelRef.current?.send(JSON.stringify(message));
    handleOnMessage(message);
  }, []);

  const handleSetUserInfo = useCallback(() => {
    updateContent(
      <form onSubmit={handleJoinRoom}>
        <Profile
          randomIndex={Math.floor(Math.random() * POKEMON_INDEX_RANGE.max) + 1}
        />
        <button
          type="submit"
          className="hover:bg-light-primary bg-primary text-base-color mt-8 w-full rounded-md py-2 font-bold transition-colors"
        >
          進入房間
        </button>
      </form>
    );
  }, [updateContent, handleJoinRoom]);

  useEffect(() => {
    if (!initRef.current) {
      rtcFlow(roomID, role, handleOnMessage).then(({ peerConnection, dataChannel, send }) => {
        peerConnectionRef.current = peerConnection;
        dataChannelRef.current = dataChannel;
        signalingRef.current = send;
      });
      if (role === Role.Guest) {
        handleSetUserInfo();
      }
      initRef.current = true;
    }
  }, [roomID, handleSetUserInfo, role]);

  return (
    <main className="flex h-screen flex-col gap-2 overflow-hidden p-2">
      <ControlPanel leaveRoom={handleLeaveRoom} />
      <div className="grid flex-1 grid-cols-12">
        <div className="col-span-9 h-full">
          <Desk />
        </div>
        <div className="col-span-3 h-full">
          <Chat messages={messages} userInfo={userInfo} send={sendMessage} />
        </div>
      </div>
    </main>
  );
}
