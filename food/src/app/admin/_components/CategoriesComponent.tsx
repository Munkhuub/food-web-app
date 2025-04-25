"use client";
import axios from "axios";
import { useEffect, useState } from "react";
type categoriesComponentProps = {
  item: any;
};

export const CategoriesComponent = ({ item }: categoriesComponentProps) => {
  const [foodCounts, setFoodCounts] = useState<number>(0);
  const getFoodCount = async () => {
    const response = await axios.get(
      `http://localhost:3001/count?categoryId=${item._id}`
    );
    setFoodCounts(response.data.countFood);
    console.log(response.data);
  };

  useEffect(() => {
    getFoodCount();
  }, []);
  return (
    <div
      className="px-4 py-2 bg-white rounded-full flex gap-2 border-[1px] border-[#E4E4E7] text-[14px]"
      key={item._id}
    >
      {item.categoryName}
      <button className="bg-black rounded-full text-xs text-white px-[10px] py-[2px]">
        {foodCounts}
      </button>
    </div>
  );
};
