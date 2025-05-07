import axios from "axios";
import { useEffect, useState } from "react";
import { FoodCard } from "./FoodCard";

export type FoodsType = {
  foodName: string;
  ingredients: string;
  image: string;
  category: { categoryName: string };
  price: number;
  _id: string;
};
type AppetizersType = {
  categoryId: string;
  categoryName: string;
};
export const Foods = ({ categoryId, categoryName }: AppetizersType) => {
  const [foods, setFoods] = useState<FoodsType[]>([]);
  const getFoods = async () => {
    const response = await axios.get(
      `http://localhost:3001/food?categoryId=${categoryId}`
    );
    setFoods(response.data.food);
  };

  useEffect(() => {
    getFoods();
  }, []);

  if (foods.length < 1) {
    return null;
  }
  return (
    <div className="px-22 bg-[#404040] pt-10 pb-[54px]">
      <h2 className="text-3xl font-semibold text-white">{categoryName}</h2>
      <div className="grid grid-cols-3 gap-9 mt-[54px]">
        {foods?.map((food, i) => (
          <FoodCard food={food} key={i} />
        ))}
      </div>
    </div>
  );
};
