import { FoodsType } from "@/app/_components/Appetizers";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { Pencil, Plus } from "lucide-react";
import { useEffect, useState } from "react";
// import { EditFood } from "./EditFood";

type FoodCardProps = {
  food: FoodsType;
};

export const FoodCard = ({ food }: FoodCardProps) => {
  return (
    <Card className="w-full p-0">
      <CardContent className="p-4 rounded-[20px] flex flex-col gap-2 relative">
        <img
          src={food?.image}
          className="h-[129px] w-full object-cover rounded-xl"
        />
        {/* <EditFood food={food} /> */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h3 className="text-[14px] text-[#EF4444] font-semibold">
              {food.foodName}
            </h3>
            <p className="text-xs font-semibold">
              {food.price.toLocaleString()}$
            </p>
          </div>
          <p className="text-xs">{food.ingredients}</p>
        </div>
      </CardContent>
    </Card>
  );
};
