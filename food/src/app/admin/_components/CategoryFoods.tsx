import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FoodCard } from "./FoodCard";
type CategoryFoodsProps = {
  categoryId: string;
  categoryName: string;
};

export type FoodsType = {
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
  const [foods, setFoods] = useState<FoodsType[]>([]);
  const getFoods = useCallback(async () => {
    const { data } = await axios.get(
      `http://localhost:3001/food?categoryId=${categoryId}`
    );

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
        {/* <AddFood key={food._id} food={food}/> */}
        {foods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};
