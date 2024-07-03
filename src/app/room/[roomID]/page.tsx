"use client";

import { Profile } from "@/app/(site)/Profile";
import { useModalCtx } from "@/app/ModalCtx";
import { usePlayerCtx } from "@/app/PlayerCtx";
import { Chat } from "@/app/room/[roomID]/Chat";
import { ControlPanel } from "@/app/room/[roomID]/ControlPanel";
import { Desk } from "@/app/room/[roomID]/Desk";
import { POKEMON_INDEX_RANGE } from "@/constants";
import { create } from "@/services/webRTC/create";
import { join } from "@/services/webRTC/join";
import { signaling } from "@/services/webRTC/signaling";
import { useParams } from "next/navigation";
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export default function Home() {
  const { roomID }: { roomID: string } = useParams();
  const { userName: _userName, avatarIndex: _avatarIndex } = usePlayerCtx();
  const [userName, setUserName] = useState(_userName);
  const [avatarIndex, setAvatarIndex] = useState(_avatarIndex);
  const { updateContent, close } = useModalCtx();
  const [messages, setMessages] = useState<Message[]>([]);
  const peerConnectionRef = useRef<RTCPeerConnection>();
  const dataChannelRef = useRef<RTCDataChannel>();
  const initRef = useRef<boolean>(false);

  const isHost = useMemo(
    () => _userName !== "" && avatarIndex !== 0,
    [_userName, avatarIndex],
  );

  const handleJoinRoom = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (initRef.current) return;
      const data = new FormData(event.target as HTMLFormElement);
      const userName = data.get("userName") as string;
      const avatarIndex = Number(data.get("avatarIndex") as string);
      setUserName(userName);
      setAvatarIndex(avatarIndex);
      close(() => {
        join(
          roomID,
          userName,
          (message) => {
            setMessages((prevState) => {
              const newState = Array.from(prevState);
              newState.push(message);
              return newState;
            });
          },
          dataChannelRef,
        ).then(({ pc }) => {
          peerConnectionRef.current = pc;
        });
      });
      initRef.current = true;
    },
    [roomID],
  );

  const handleSignaling = useCallback(() => {
    if (!isHost || !peerConnectionRef.current) return;
    signaling(peerConnectionRef.current, roomID, _userName).then();
  }, [isHost, roomID, _userName]);

  const sendMessage = useCallback((message: Message) => {
    dataChannelRef.current?.send(JSON.stringify(message));
    setMessages((prevState) => {
      const newState = Array.from(prevState);
      newState.push(message);
      return newState;
    });
  }, []);

  useEffect(() => {
    if (isHost) {
      if (!initRef.current) {
        create(roomID, _userName, (message) => {
          setMessages((prevState) => {
            const newState = Array.from(prevState);
            newState.push(message);
            return newState;
          });
        }).then(({ pc, dc }) => {
          peerConnectionRef.current = pc;
          dataChannelRef.current = dc;
        });
        initRef.current = true;
      }
    } else {
      updateContent(
        <form onSubmit={handleJoinRoom}>
          <Profile
            randomIndex={
              Math.floor(Math.random() * POKEMON_INDEX_RANGE.max) + 1
            }
          />
          <button
            type="submit"
            className="hover:bg-light-primary bg-primary text-base-color mt-8 w-full rounded-md py-2 font-bold transition-colors"
          >
            進入房間
          </button>
        </form>,
      );
    }
  }, [roomID, _userName, isHost]);

  return (
    <main className="flex h-screen flex-col gap-2 overflow-hidden p-2">
      <ControlPanel refresh={handleSignaling} />
      <div className="grid flex-1 grid-cols-12">
        <div className="col-span-9 h-full">
          <Desk />
        </div>
        <div className="col-span-3 h-full">
          <Chat
            messages={messages}
            userName={userName}
            avatarIndex={avatarIndex}
            send={sendMessage}
          />
        </div>
      </div>
    </main>
  );
}
