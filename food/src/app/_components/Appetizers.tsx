import axios from "axios";
import { useEffect, useState } from "react";

export type FoodsType = {
  foodName: string;
  ingredients: string;
  image: string;
  category: { categoryName: string };
};

export const Appetizers = () => {
  const [foods, setFoods] = useState<FoodsType[]>([]);
  const getFoods = async () => {
    const response = await axios.get("http://localhost:3001/food");
    const appetizerFoods = response.data.food.filter(
      (food: FoodsType) =>
        food.category.categoryName.toLowerCase() === "appetizers"
    );
    setFoods(appetizerFoods);
  };
  useEffect(() => {
    getFoods();
  }, []);

  return (
    <div className="px-22 bg-[#404040] pt-10 pb-[54px]">
      <h2 className="text-3xl font-semibold text-white">
        {foods[0]?.category?.categoryName}
      </h2>
      <div className="grid grid-cols-3 gap-9 mt-[54px]">
        {foods?.map((item, i) => (
          <div
            className="w-[400px] h-[342px] p-4 bg-white rounded-[20px] flex flex-col gap-5"
            key={i}
          >
            <img
              src={item?.image}
              className="h-[210px] w-full object-cover rounded-xl"
            />
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <h3 className="text-2xl text-[#EF4444] font-semibold">
                  {item.foodName}
                </h3>
                <p className="text-[18px] font-semibold">$12.99</p>
              </div>
              <p>{item.ingredients}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
