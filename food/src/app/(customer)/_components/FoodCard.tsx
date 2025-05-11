import React, { useState } from "react";
import { AddToCard } from "./AddToCard";
import { FoodsType } from "./Foods";

type FoodCardProps = {
  food: FoodsType;
};

export const FoodCard = ({ food }: FoodCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="w-[400px] h-[342px] p-4 bg-white rounded-[20px] flex flex-col gap-5 relative">
      <img
        src={food?.image}
        className="h-[210px] w-full object-cover rounded-xl"
      />
      <AddToCard food={food} />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h3 className="text-2xl text-[#EF4444] font-semibold">
            {food.foodName}
          </h3>
          <p className="text-[18px] font-semibold">${food.price.toFixed(2)}</p>
        </div>
        <p>{food.ingredients}</p>
      </div>
    </div>
  );
};
