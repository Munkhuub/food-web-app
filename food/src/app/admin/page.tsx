"use client";

import { useEffect, useState } from "react";

import { Settings } from "./_components/Settings";
import axios from "axios";
import { Plus } from "lucide-react";
import { FoodsType } from "../_components/Appetizers";
import { SaladsMenu } from "./_components/SaladsMenu";
import { AppetizersMenu } from "./_components/AppetisersMenu";
import { LunchMenu } from "./_components/LunchMenu";
import { BeveragesMenu } from "./_components/BeveragesMenu";

type CategoryType = {
  categoryName: string;
};

export default function Home() {
  const [step, setStep] = useState(0);

  const [category, setCategory] = useState<CategoryType[]>([]);
  const getCategories = async () => {
    const response = await axios.get("http://localhost:3001/category");
    setCategory(response.data.categories);
    console.log(response);
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="h-full w-full bg-[#E4E4E7] pl-6 pr-10 py-6 flex flex-col gap-6">
      <div className="size-9 bg-black ml-auto rounded-full">
        <img />
      </div>
      <div className="p-6 flex flex-col gap-6 bg-white w-full rounded-xl">
        <h4 className="text-xl font-semibold">Dishes category</h4>
        <div className="flex gap-3 flex-wrap items-center">
          <div className="px-4 py-2 bg-white rounded-full flex gap-2 border-[1px] border-[#E4E4E7] text-[14px]">
            All dishes
            <button className="bg-black rounded-full text-xs text-white px-[10px] py-[2px]">
              112
            </button>
          </div>
          {category?.map((item, i) => (
            <div
              className="px-4 py-2 bg-white rounded-full flex gap-2 border-[1px] border-[#E4E4E7] text-[14px]"
              key={i}
            >
              {item.categoryName}
              <button className="bg-black rounded-full text-xs text-white px-[10px] py-[2px]">
                12
              </button>
            </div>
          ))}
          <button className="size-9 rounded-full bg-[#EF4444] flex items-center justify-center">
            <Plus className="text-white size-4" />
          </button>
        </div>
      </div>
      <AppetizersMenu />
      <SaladsMenu />
      <LunchMenu />
      <BeveragesMenu />
    </div>
  );
}
