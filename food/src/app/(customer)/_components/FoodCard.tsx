import { AddToCard } from "./AddToCard";
import { FoodsType } from "./Foods";

type FoodCardProps = {
  food: FoodsType;
};

export const FoodCard = ({ food }: FoodCardProps) => {
  return (
  <div className="w-full h-auto p-4 lg:p-6 xl:p-8 bg-white rounded-2xl md:rounded-[20px] flex flex-col gap-4 lg:gap-6 xl:gap-8 relative shadow-md hover:shadow-lg transition-shadow">
      <div className="relative overflow-hidden rounded-xl aspect-[1.9/1]">
        <img
          src={food?.image}
          alt={food.foodName}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>

      <AddToCard food={food} />

      <div className="flex flex-col gap-2 lg:gap-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl lg:text-2xl xl:text-3xl text-red-500 font-semibold line-clamp-1">
            {food.foodName}
          </h3>
          <p className="text-lg lg:text-xl xl:text-2xl font-semibold whitespace-nowrap pl-2">
            ${food.price.toFixed(2)}
          </p>
        </div>
        <p className="text-base lg:text-lg text-gray-600 line-clamp-2">
          {food.ingredients}
        </p>
      </div>
    </div>
  );
};