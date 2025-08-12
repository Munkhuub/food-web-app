import { AddToCard } from "./AddToCard";
import { FoodsType } from "./Foods";

type FoodCardProps = {
  food: FoodsType;
};

export const FoodCard = ({ food }: FoodCardProps) => {
  return (
    <div className="w-full max-w-[400px] min-w-[280px] h-auto p-3 sm:p-4 bg-white rounded-2xl md:rounded-[20px] flex flex-col gap-3 sm:gap-4 md:gap-5 relative shadow-md hover:shadow-lg transition-shadow mx-auto">
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
        <div className="flex justify-between items-start">
          <h3 className="text-lg sm:text-xl md:text-2xl text-red-500 font-semibold line-clamp-1">
            {food.foodName}
          </h3>
          <p className="text-base sm:text-lg md:text-[18px] font-semibold whitespace-nowrap pl-2">
            ${food.price.toFixed(2)}
          </p>
        </div>
        <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
          {food.ingredients}
        </p>
      </div>
    </div>
  );
};