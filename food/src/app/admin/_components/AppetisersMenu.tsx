import { FoodsType } from "@/app/_components/Appetizers";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Pencil, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export const AppetizersMenu = () => {
  const [foods, setFoods] = useState<FoodsType[]>([]);
  const getFoods = async () => {
    const response = await axios.get(
      "http://localhost:3001/food?categoryId=6807438c58747cab008b88ed"
    );

    setFoods(response.data.food);
  };
  useEffect(() => {
    getFoods();
  }, []);

  return (
    <div className="bg-white p-5 rounded-xl flex flex-col gap-4">
      <h4 className="text-xl font-semibold">
        {foods[0]?.category?.categoryName}
      </h4>
      <div className="flex gap-4 flex-wrap">
        <div className="w-[270.75px] h-[241px] border border-dashed rounded-[20px] border-[#EF4444] flex flex-col gap-6 items-center justify-center">
          <Button className="size-10 rounded-full bg-[#EF4444] flex items-center justify-center">
            <Plus className="text-white size-4" />
          </Button>
          <p className="text-[14px]">Add new Dish to Appetizers </p>
        </div>
        {foods?.map((item, i) => (
          <div
            className="w-[270.75px] h-[241px] p-4 bg-white rounded-[20px] flex flex-col gap-5 border border-[#E4E4E7] relative"
            key={i}
          >
            <Button
              className="absolute rounded-full right-9 top-[81px] bg-white size-11"
              size="icon"
            >
              <Pencil className="text-[#EF4444] size-4" />
            </Button>
            <img
              src={item?.image}
              className="h-[129px] w-full object-cover rounded-xl"
            />
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <h3 className="text-[14px] text-[#EF4444] font-semibold">
                  {item.foodName}
                </h3>
                <p className="text-xs font-semibold">$12.99</p>
              </div>
              <p className="text-xs">{item.ingredients}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
