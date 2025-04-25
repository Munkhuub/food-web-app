"use client";

import { SaladsMenu } from "./_components/SaladsMenu";
import { AppetizersMenu } from "./_components/AppetisersMenu";
import { LunchMenu } from "./_components/LunchMenu";
import { BeveragesMenu } from "./_components/BeveragesMenu";
import { CategoryMenu } from "./_components/CategoryMenu";

export default function Home() {
  return (
    <div className="h-full w-full bg-[#E4E4E7] pl-6 pr-10 py-6 flex flex-col gap-6">
      <div className="size-9 bg-black ml-auto rounded-full">
        <img />
      </div>
      <CategoryMenu />
      <AppetizersMenu />
      <SaladsMenu />
      <LunchMenu />
      <BeveragesMenu />
    </div>
  );
}
