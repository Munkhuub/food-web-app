import { Button } from "@/components/ui/button";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type CategoryType = {
  categoryName: string;
};

export const Categories = () => {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const getCategories = async () => {
    const response = await axios.get("http://localhost:3001/category");
    setCategory(response.data.categories);
    console.log(response);
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="w-full h-[176px] bg-[#404040] px-12 py-8 flex flex-col gap-8">
      <h1 className="text-3xl/8 font-semibold text-white">Categories</h1>
      <div className="flex gap-2 w-full">
        <Button variant="outline" size="icon" className="bg-[#404040]">
          <ChevronLeft className="text-white border-none" />
        </Button>
        <div className="flex gap-2 overflow-x-hidden">
          {category?.map((item, i) => (
            <button
              className="px-5 py-1 bg-white rounded-full overflow-scroll"
              key={i}
            >
              {item.categoryName}
            </button>
          ))}
        </div>
        <Button variant="outline" size="icon" className="bg-[#404040]">
          <ChevronRight className="text-white border-none" />
        </Button>
      </div>
    </div>
  );
};
