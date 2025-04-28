"use client";

import { SaladsMenu } from "./_components/SaladsMenu";
import { AppetizersMenu } from "./_components/AppetisersMenu";
import { LunchMenu } from "./_components/LunchMenu";
import { BeveragesMenu } from "./_components/BeveragesMenu";
import { CategoryMenu } from "./_components/CategoryMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { Category } from "./_components/Category";
import { CategoryFoods } from "./_components/CategoryFoods";

type CategoryType = {
  _id: string;
  categoryName: string;
};

export default function Home() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const getCategories = async () => {
    const { data } = await axios.get("http://localhost:3001/category");
    setCategories(data.categories);
    console.log(data.categories);
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="h-full w-full bg-[#E4E4E7] pl-6 pr-10 py-6 flex flex-col gap-6">
      <div className="size-9 bg-black ml-auto rounded-full">
        <img />
      </div>
      <div className="p-4 rounded-md bg-white flex flex-col gap-2 ">
        <h4 className="text-xl font-semibold">Dishes category</h4>
        <div className="flex gap-2">
          {categories.map(({ _id, categoryName }) => (
            <Category key={_id} categoryId={_id} categoryName={categoryName} />
          ))}
        </div>
        {categories.map(({ _id, categoryName }) => (
          <CategoryFoods
            key={_id}
            categoryId={_id}
            categoryName={categoryName}
          />
        ))}
      </div>
      {/* <CategoryMenu />
      <AppetizersMenu />
      <SaladsMenu />
      <LunchMenu />
      <BeveragesMenu /> */}
    </div>
  );
}
