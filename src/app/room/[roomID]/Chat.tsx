"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { TbSend2 } from "react-icons/tb";

interface Props {
  send?: (message: Message) => void;
  messages: Message[];
  userName: string;
  avatarIndex: number;
}

export const Chat = (props: Props) => {
  const { messages, userName, avatarIndex, send } = props;
  const msgRef = useRef<HTMLInputElement>(null);
  const msgListRef = useRef<HTMLUListElement>(null);
  const [maxHeight, setMaxHeight] = useState("");

  const sendMessage = useCallback(() => {
    const msg = msgRef.current?.value ?? "";
    if (msg === "" || !send) return;
    send({
      type: "chat",
      userName,
      avatarIndex,
      message: msg,
      timestamp: new Date().getTime(),
    });
  }, [userName, avatarIndex]);

  useEffect(() => {
    if (msgListRef.current) {
      msgListRef.current.scrollTo({
        behavior: "smooth",
        top: msgListRef.current.scrollHeight,
      });
    }
  }, [messages]);

  useEffect(() => {
    setMaxHeight((msgListRef.current?.clientHeight ?? 300) + "px");
  }, []);

  return (
    <div className="flex h-full w-full flex-col">
      <ul
        ref={msgListRef}
        className="border-frame flex w-full flex-1 flex-col gap-4 overflow-x-hidden overflow-y-scroll rounded-sm border border-b-0 border-solid p-1"
        style={{ maxHeight }}
      >
        {messages.map((message) => (
          <Msg
            key={`${message.userName}-${message.timestamp}`}
            message={message}
            self={message.userName === userName}
          />
        ))}
      </ul>
      <div className="border-frame flex w-full items-center justify-between rounded-sm border-x border-b border-t border-solid">
        <input
          type="text"
          ref={msgRef}
          className="w-[80%] rounded-md bg-transparent px-3 py-2 focus:outline-0"
          placeholder="輸入..."
        />
        <button
          onClick={sendMessage}
          className="border-frame hover:bg-light-frame flex size-10 items-center justify-center border-l border-solid transition-colors"
        >
          <TbSend2 className="size-5" />
        </button>
      </div>
    </div>
  );
};

const Msg = ({ message, self }: { message: Message; self: boolean }) => {
  if (message.type === "ctrl") {
    return (
      <li
        className="text-primary flex flex-row items-center justify-center gap-2"
        title={new Date(message.timestamp).toLocaleString()}
      >
        <span className="border-primary flex-1 border-t border-dashed"></span>
        {message.message}
        <span className="border-primary flex-1 border-t border-dashed"></span>
      </li>
    );
  } else if (!self) {
    return (
      <li
        className="flex flex-row gap-2"
        title={new Date(message.timestamp).toLocaleString()}
      >
        <div className="border-frame flex size-10 items-center justify-center rounded-full border-2 border-solid">
          <Image
            src={`/avatars/${message.avatarIndex}.svg`}
            className="size-8 object-scale-down"
            width={32}
            height={32}
            alt="Avatar"
            title={message.userName}
            priority
          />
        </div>
        <div className="max-w-[calc(100%-60px)] pt-3">
          <div className="bg-frame before:border-r-frame relative w-fit text-balance break-words rounded-full px-2 py-1 before:absolute before:-left-5 before:translate-y-1/2 before:border-x-[12px] before:border-y-4 before:border-transparent">
            {message.message}
          </div>
        </div>
      </li>
    );
  }
  return (
    <li
      className="flex flex-row-reverse pr-2"
      title={new Date(message.timestamp).toLocaleString()}
    >
      <div className="bg-frame before:border-l-frame relative max-w-[calc(100%-60px)] text-balance break-words rounded-full px-2 py-1 before:absolute before:-right-5 before:translate-y-1/2 before:border-x-[12px] before:border-y-4 before:border-transparent">
        {message.message}
      </div>
    </li>
  );
};
