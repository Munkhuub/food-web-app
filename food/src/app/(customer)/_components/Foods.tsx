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
  const [error, setError] = useState(false);

  const getFoods = async () => {
    try {
      setError(false);
      const response = await api.get(`/food?categoryId=${categoryId}`);
      setFoods(response.data.food || []);
    } catch (error) {
      console.error("Error fetching foods:", error);
      setError(true);
      setFoods([]);
    }
  };

  useEffect(() => {
    getFoods();
  }, [categoryId]);

  if (!foods.length && !selectedCategory) return null;

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 bg-[#404040] pb-6 sm:pb-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
        {categoryName}
      </h2>

      {error ? (
        <div className="text-white text-center py-10 sm:py-16 mt-6 sm:mt-8 border border-gray-700 rounded-lg bg-[#353535]">
          <p className="text-red-400 mb-2">Failed to load dishes</p>
          <button
            onClick={getFoods}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md transition-colors"
          >
            Retry
          </button>
        </div>
      ) : foods.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
          {foods.map((food) => (
            <FoodCard food={food} key={food._id} />
          ))}
        </div>
      ) : (
        <div className="text-white text-center py-10 sm:py-16 mt-6 sm:mt-8 border border-gray-700 rounded-lg bg-[#353535]">
          No dishes available in this category.
        </div>
      )}
    </div>
  );
};