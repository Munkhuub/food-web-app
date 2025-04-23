import axios from "axios";
import { useEffect, useState } from "react";
import { FoodsType } from "./Appetizers";

const card = [
  {
    name: "Finger food ",
    price: "$12.99",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    image: "/images/food.png",
  },
  {
    name: "Finger food ",
    price: "$12.99",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    image: "/images/food.png",
  },
  {
    name: "Finger food ",
    price: "$12.99",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    image: "/images/food.png",
  },
];

export const Salads = () => {
  const [salads, setSalads] = useState<FoodsType[]>([]);
  const getSalads = async () => {
    const response = await axios.get(
      "http://localhost:3001/food?categoryId=6807438c58747cab008b88ee"
    );
    setSalads(response.data.food);
  };
  useEffect(() => {
    getSalads();
  }, []);

  return (
    <div className="px-22 bg-[#404040] pb-[54px]">
      <h2 className="text-3xl font-semibold text-white">
        {salads[0]?.category?.categoryName}
      </h2>
      <div className="grid grid-cols-3 gap-9 mt-[54px]">
        {salads.map((item, i) => (
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
