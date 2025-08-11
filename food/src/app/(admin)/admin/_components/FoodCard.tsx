import { Card, CardContent } from "@/components/ui/card";
import { EditFood } from "./EditFood";
import { FoodsTypeCategory } from "./CategoryFoods";

type FoodCardProps = {
  food: FoodsTypeCategory;
  categoryId: string;
  getFoods: () => Promise<void>;
};

export const FoodCard = ({ food, categoryId, getFoods }: FoodCardProps) => {
  return (
    <Card className="w-full p-0">
      <CardContent className="p-3 sm:p-4 rounded-[20px] flex flex-col gap-2 relative">
        <img
          src={food?.image}
          className="h-[100px] sm:h-[127px] w-full object-cover rounded-xl"
        />
        <EditFood food={food} categoryId={categoryId} getFoods={getFoods} />
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <h3 className="text-xs sm:text-[14px] text-[#EF4444] font-semibold leading-tight flex-1 min-w-0 pr-2">
              {food.foodName}
            </h3>
            <p className="text-xs font-semibold whitespace-nowrap">
              {food.price.toLocaleString()}$
            </p>
          </div>
          <p className="text-xs leading-relaxed line-clamp-2 text-gray-600">
            {food.ingredients}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
