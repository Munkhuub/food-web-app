import axios from "axios";
import { useEffect, useState } from "react";
import { CategoriesComponent } from "./CategoriesComponent";
import { Plus } from "lucide-react";

type CategoryType = {
  _id: string;
  categoryName: string;
};
type AllFoods = {
  countAllFood: number;
};

export const CategoryMenu = () => {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const getCategories = async () => {
    const response = await axios.get("http://localhost:3001/category");
    setCategory(response.data.categories);
    console.log(response);
  };
  useEffect(() => {
    getCategories();
  }, []);

  const [allFoods, setAllFoods] = useState<AllFoods>({ countAllFood: 0 });
  const getAllFoods = async () => {
    const response = await axios.get("http://localhost:3001/countAll");
    setAllFoods(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getAllFoods();
  }, []);

  return (
    <div className="p-6 flex flex-col gap-6 bg-white w-full rounded-xl">
      <h4 className="text-xl font-semibold">Dishes category</h4>
      <div className="flex gap-3 flex-wrap items-center">
        <div className="px-4 py-2 bg-white rounded-full flex gap-2 border-[1px] border-[#E4E4E7] text-[14px]">
          All dishes
          <button className="bg-black rounded-full text-xs text-white px-[10px] py-[2px]">
            {allFoods.countAllFood}
          </button>
        </div>
        {category.map((item, index) => {
          return (
            <div key={index}>
              <CategoriesComponent item={item} />
            </div>
          );
        })}

        <button className="size-9 rounded-full bg-[#EF4444] flex items-center justify-center">
          <Plus className="text-white size-4" />
        </button>
      </div>
    </div>
  );
};
