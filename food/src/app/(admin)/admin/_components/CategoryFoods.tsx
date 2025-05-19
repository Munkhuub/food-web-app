import { useCallback, useEffect, useState } from "react";
import { FoodCard } from "./FoodCard";
import { AddFood } from "./AddFood";
import { api } from "@/axios";
type CategoryFoodsProps = {
  categoryId: string;
  categoryName: string;
};

export type FoodsTypeCategory = {
  _id: string;
  foodName: string;
  ingredients: string;
  image: string;
  category: { categoryName: string };
  price: number;
};

export const CategoryFoods = ({
  categoryId,
  categoryName,
}: CategoryFoodsProps) => {
  const [foods, setFoods] = useState<FoodsTypeCategory[]>([]);
  const getFoods = useCallback(async () => {
    const { data } = await api.get(`/food?categoryId=${categoryId}`);

    setFoods(data.food);
  }, [categoryId]);

  useEffect(() => {
    getFoods();
  }, [getFoods]);

  return (
    <div className="bg-white p-5 rounded-xl flex flex-col gap-4">
      <h4 className="text-xl font-semibold">
        {categoryName} ({foods.length})
      </h4>
      <div className="grid grid-cols-4 gap-4">
        <AddFood
          getFoods={getFoods}
          categoryId={categoryId}
          categoryName={categoryName}
        />

        {foods.map((food) => (
          <FoodCard
            key={food._id}
            food={food}
            categoryId={categoryId}
            getFoods={getFoods}
          />
        ))}
      </div>
    </div>
  );
};
