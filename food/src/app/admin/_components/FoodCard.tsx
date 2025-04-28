import { FoodsType } from "@/app/_components/Appetizers";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { Pencil, Plus } from "lucide-react";
import { useEffect, useState } from "react";

type FoodCardProps = {
  food: FoodsType;
};

export const FoodCard = ({ food }: FoodCardProps) => {
  return (
    <Card className="w-full p-0">
      <CardContent className="p-4 rounded-[20px] flex flex-col gap-5 relative">
        <Button
          className="absolute rounded-full right-9 top-[81px] bg-white size-11"
          size="icon"
        >
          <Pencil className="text-[#EF4444] size-4" />
        </Button>
        <img
          src={food?.image}
          className="h-[129px] w-full object-cover rounded-xl"
        />
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
