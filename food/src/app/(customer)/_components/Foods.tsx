import { useEffect, useState } from "react";
import { FoodCard } from "./FoodCard";
import { api } from "@/axios";

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
  selectedCategory: string;
};

export const Foods = ({
  categoryId,
  categoryName,
  selectedCategory,
}: AppetizersType) => {
  const [foods, setFoods] = useState<FoodsType[]>([]);
  const [loading, setLoading] = useState(true);

  const getFoods = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/food?categoryId=${categoryId}`);
      setFoods(response.data.food || []);
    } catch (error) {
      console.error("Error fetching foods:", error);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFoods();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="px-22 bg-[#404040] pt-10 pb-[54px]">
        <h2 className="text-3xl font-semibold text-white">{categoryName}</h2>
        <div className="text-white text-center py-16">Loading dishes...</div>
      </div>
    );
  }

  if (!foods.length && !selectedCategory) return null;

  return (
    <div className="px-22 bg-[#404040] pb-[54px]">
      <h2 className="text-3xl font-semibold text-white">{categoryName}</h2>

      {foods.length > 0 ? (
        <div className="grid grid-cols-3 gap-9 mt-[54px]">
          {foods.map((food, i) => (
            <FoodCard food={food} key={i} />
          ))}
        </div>
      ) : (
        <div className="text-white text-center py-16 mt-[54px] border border-gray-700 rounded-lg bg-[#353535]">
          No dishes available in this category.
        </div>
      )}
    </div>
  );
};
