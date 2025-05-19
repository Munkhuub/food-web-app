"use client";
import { CategoryMenu } from "./_components/CategoryMenu";
import { useEffect, useState } from "react";
import { CategoryFoods } from "./_components/CategoryFoods";
import { useAuth } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";

export type CategoryType = {
  _id: string;
  categoryName: string;
};

export default function Home() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { user } = useAuth();
  const getCategories = async () => {
    const { data } = await api.get("/category");
    setCategories(data.categories);
    console.log("check", data.categories);
  };
  useEffect(() => {
    getCategories();
  }, []);

  const handleAllDishesClick = () => {
    setSelectedCategory("");
  };
  if (!user) {
    return null;
  }
  if (user.role !== "admin") {
    return null;
  }
  return (
    <div className="min-h-screen w-full bg-[#E4E4E7] pl-6 pr-10 py-6 flex flex-col gap-6">
      <div className="size-9 bg-black ml-auto rounded-full">
        <img src={user.image} />
      </div>
      <div className="p-4 rounded-md bg-white flex flex-col gap-2 ">
        <CategoryMenu
          getCategories={getCategories}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          selectedCategory={selectedCategory}
          handleAllDishes={handleAllDishesClick}
        />

        {categories
          .filter((item) => {
            if (selectedCategory === "") return true;
            return selectedCategory === item._id;
          })
          .map(({ _id, categoryName }) => (
            <CategoryFoods
              key={_id}
              categoryId={_id}
              categoryName={categoryName}
            />
          ))}
      </div>
    </div>
  );
}
