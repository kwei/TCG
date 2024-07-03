"use client";

import { useSetPlayerCtx } from "@/app/PlayerCtx";
import { useRouter } from "next/navigation";
import { FormEvent, HTMLAttributes, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

interface Props extends HTMLAttributes<HTMLFormElement> {}

export const BasicInfoSubmitForm = (props: Props) => {
  const { children, ...legacy } = props;
  const router = useRouter();
  const { setAvatarIndex, setUserName } = useSetPlayerCtx();

  const handleOnSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      const data = new FormData(event.target as HTMLFormElement);
      const roomId = uuidv4();
      const userName = data.get("userName") as string;
      const avatarIndex = Number(data.get("avatarIndex") as string);
      setUserName(userName);
      setAvatarIndex(avatarIndex);
      router.push(`/room/${roomId}`);
    },
    [router, setAvatarIndex, setUserName],
  );

  return (
    <form {...legacy} onSubmit={handleOnSubmit}>
      {children}
    </form>
  );
};
