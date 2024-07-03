"use client";

import { useState } from "react";
import Image from "next/image";
import { TbPencil } from "react-icons/tb";

export const Profile = ({ randomIndex }: { randomIndex: number }) => {
  const [avatarIndex, setAvatarIndex] = useState(randomIndex);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="border-frame group relative flex size-[160px] cursor-pointer items-center justify-center rounded-full border-4 border-solid">
        <Image
          src={`/avatars/${avatarIndex}.svg`}
          className="size-[100px] object-scale-down"
          width={100}
          height={100}
          alt="Avatar"
          priority
        />
        <div className="bg-frame absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-60">
          <TbPencil className="size-10" />
        </div>
        <input
          type="number"
          name="avatarIndex"
          value={avatarIndex}
          className="invisible absolute"
          readOnly={true}
        />
      </div>

      <fieldset className="mt-8">
        <legend className="font-bold">暱稱</legend>
        <input
          type="text"
          name="userName"
          className="border-frame w-full rounded-md border-2 border-solid bg-transparent px-3 py-2 font-bold focus:outline-0"
          placeholder="ex: 小智"
          defaultValue={`Player-${avatarIndex}`}
        />
      </fieldset>
    </div>
  );
};
