"use client";
import Image from "next/image";
import { Header } from "./_components/Header";
import { MainBanner } from "./_components/MainBanner";
import { Categories } from "./_components/Categories";
import { Footer } from "./_components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Foods } from "./_components/Foods";
type CategoryType = {
  categoryName: string;
  _id: string;
};
export default function Home() {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const getCategories = async () => {
    const response = await axios.get("http://localhost:3001/category");
    setCategory(response.data.categories);
    console.log("homepage categories:", response);
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="lg:w-[1440px] m-auto relative">
      <Header />
      <MainBanner />

      <Categories />
      {category.map((item) => {
        return (
          <div key={item._id}>
            <Foods categoryId={item._id} categoryName={item.categoryName} />
          </div>
        );
      })}
      <Footer />
    </div>
  );
}
