"use client";

import { Header } from "./(customer)/_components/Header";
import { MainBanner } from "./(customer)/_components/MainBanner";
import { Categories } from "./(customer)/_components/Categories";
import { Footer } from "./(customer)/_components/Footer";
import { useEffect, useState } from "react";
import { Foods } from "./(customer)/_components/Foods";
import { api } from "@/axios";
export type CategoryType = {
  categoryName: string;
  _id: string;
};
export default function Home() {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const getCategories = async () => {
    const response = await api.get("/category");
    setCategory(response.data.categories);
    console.log("homepage categories:", response);
  };
  useEffect(() => {
    getCategories();
  }, []);

  const handleAllDishesClick = () => {
    setSelectedCategory("");
  };
  return (
    <div className="lg:w-[1440px] m-auto relative">
      <Header />
      <MainBanner />

      <Categories
        setSelectedCategory={setSelectedCategory}
        category={category}
        selectedCategory={selectedCategory}
        handleAllDishesClick={handleAllDishesClick}
      />
      {category
        .filter((categories) => {
          if (selectedCategory === "") return true;
          return selectedCategory === categories._id;
        })
        .map((item) => {
          return (
            <div key={item._id}>
              <Foods
                categoryId={item._id}
                categoryName={item.categoryName}
                selectedCategory={selectedCategory}
              />
            </div>
          );
        })}

      <Footer />
    </div>
  );
}
