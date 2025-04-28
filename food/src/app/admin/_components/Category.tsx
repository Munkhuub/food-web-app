"use client";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useEffect, useState } from "react";
type CategoryProps = {
  categoryId: string;
  categoryName: string;
};

export const Category: React.FC<CategoryProps> = ({
  categoryId,
  categoryName,
}) => {
  const [counts, setCounts] = useState<number>(0);

  useEffect(() => {
    const getFoodCount = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/food/counter?categoryId=${categoryId}`
      );
      setCounts(data.countFood);
    };

    getFoodCount();
  }, [categoryId]);
  return (
    <Badge
      className="py-2 rounded-full flex gap-2 border-[1px] text-[14px]"
      variant="outline"
    >
      {categoryName}
      <div className="bg-black rounded-full text-xs text-white px-[10px] py-[2px]">
        {counts}
      </div>
    </Badge>
  );
};
