import React from "react";
import { AddToCard } from "./AddToCard";
import { FoodsType } from "./Foods";

type FoodCardProps = {
  food: FoodsType;
};

export const FoodCard = ({ food }: FoodCardProps) => {
  return (
    <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[380px] xl:max-w-[400px] h-auto p-3 sm:p-4 lg:p-5 bg-white rounded-2xl md:rounded-[20px] flex flex-col gap-3 sm:gap-4 md:gap-5 relative shadow-md hover:shadow-lg transition-shadow">
      <div className="relative overflow-hidden rounded-xl aspect-[1.9/1]">
        <img
          src={food?.image}
          alt={food.foodName}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>

      <AddToCard food={food} />

      <div className="flex flex-col gap-1 sm:gap-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl text-red-500 font-semibold line-clamp-2 flex-1 min-w-0">
            {food.foodName}
          </h3>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold whitespace-nowrap flex-shrink-0">
            ${food.price.toFixed(2)}
          </p>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 line-clamp-2">
          {food.ingredients}
        </p>
      </div>
    </div>
  );
};