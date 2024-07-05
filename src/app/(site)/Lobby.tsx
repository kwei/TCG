import { BasicInfoSubmitForm } from "@/app/(site)/BasicInfoSubmitForm";
import { Profile } from "@/app/(site)/Profile";
import { Block } from "@/components/Block";
import { POKEMON_INDEX_RANGE } from "@/constants";

export const Lobby = () => {
  const randomIndex = Math.floor(Math.random() * POKEMON_INDEX_RANGE.max) + 1;
  return (
    <Block>
      <h1 className="mb-4 w-full text-center text-2xl font-bold">
        歡迎來到 PTCG 對戰網站
      </h1>
      <BasicInfoSubmitForm className="flex flex-col">
        <Profile randomIndex={randomIndex} />
        <button
          type="submit"
          className="bg-primary text-base-color hover:bg-light-primary mt-8 w-full rounded-md py-2 font-bold transition-colors"
        >
          建立房間
        </button>
      </BasicInfoSubmitForm>
    </Block>
  );
};
