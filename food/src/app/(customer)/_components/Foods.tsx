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
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 bg-[#404040] pb-8 sm:pb-12 md:pb-[54px] lg:pb-16 xl:pb-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white">
          {categoryName}
        </h2>

        {error ? (
          <div className="text-white text-center py-10 sm:py-16 lg:py-20 mt-6 sm:mt-8 md:mt-[54px] lg:mt-16 border border-gray-700 rounded-lg bg-[#353535] max-w-2xl mx-auto">
            <p className="text-red-400 mb-2 text-sm sm:text-base lg:text-lg">Failed to load dishes</p>
            <button
              onClick={getFoods}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-red-500 hover:bg-red-600 rounded-md transition-colors text-sm sm:text-base"
            >
              Retry
            </button>
          </div>
        ) : foods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-6 sm:mt-8 md:mt-[54px] lg:mt-16 justify-items-center">
            {foods.map((food) => (
              <FoodCard food={food} key={food._id} />
            ))}
          </div>
        ) : (
          <div className="text-white text-center py-10 sm:py-16 lg:py-20 mt-6 sm:mt-8 md:mt-[54px] lg:mt-16 border border-gray-700 rounded-lg bg-[#353535] max-w-2xl mx-auto">
            <p className="text-sm sm:text-base lg:text-lg">No dishes available in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};