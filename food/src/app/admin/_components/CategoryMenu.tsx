import axios from "axios";
import { useEffect, useState } from "react";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddCategory } from "./AddCategory";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CategoryType = {
  _id: string;
  categoryName: string;
};

type allFood = {
  countAllFood: number;
};

export const CategoryMenu = () => {
  const [showInput, setShowInput] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [allFoods, setAllFoods] = useState<allFood>();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>(
    {}
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const getCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/category");
      setCategories(data.categories);
      console.log(data.categories);

      await fetchAllCategoryCounts(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getAllFoods = async () => {
    try {
      const response = await axios.get("http://localhost:3001/countAll");
      setAllFoods(response.data);
      console.log("food count:", response.data);
    } catch (error) {
      console.error("Error fetching all foods count:", error);
    }
  };

  useEffect(() => {
    getAllFoods();
  }, []);

  const fetchAllCategoryCounts = async (cats: CategoryType[]) => {
    try {
      const counts: Record<string, number> = {};

      for (const category of cats) {
        const { data } = await axios.get(
          `http://localhost:3001/count?categoryId=${category._id}`
        );
        counts[category._id] = data.countFood;
      }

      setCategoryCounts(counts);
    } catch (error) {
      console.error("Error fetching category counts:", error);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className="p-6 flex flex-col gap-6 bg-white w-full rounded-xl relative">
      <h4 className="text-xl font-semibold">Dishes category</h4>
      <div className="flex gap-3 flex-wrap items-center ">
        <div className="px-4 py-2 bg-white rounded-full flex gap-2 border-[1px] border-[#E4E4E7] text-[14px]">
          All dishes
          <button className="bg-black rounded-full text-xs text-white px-[10px] py-[2px]">
            {allFoods?.countAllFood}
          </button>
        </div>
        {categories.map((category) => (
          <div
            key={category._id}
            className={`px-4 py-2 bg-white rounded-full flex gap-2 border border-[#E4E4E7] text-[14px] cursor-pointer ${
              selectedCategory === category._id ? "border-[#EF4444]" : ""
            }`}
            onClick={() => setSelectedCategory(category._id)}
          >
            {category.categoryName}
            <span className="bg-black rounded-full text-xs text-white px-[10px] py-[2px]">
              {categoryCounts[category._id] || 0}
            </span>
          </div>
        ))}

        {!showInput && (
          <Button
            className="size-9 rounded-full bg-[#EF4444] flex items-center justify-center"
            onClick={() => setShowInput(true)}
          >
            <Plus className="text-white size-4" />
          </Button>
        )}
      </div>
      {showInput && (
        <AddCategory
          getCategories={getCategories}
          setShowInput={setShowInput}
          setSuccessMessage={setSuccessMessage}
        />
      )}
      {successMessage && (
        <div className="bg-black p-4 rounded-lg shadow-lg flex gap-2 items-center absolute top-[136px] left-1/2 transform -translate-x-1/2">
          <Check className="text-white size-4" />
          <p className="text-white">
            New Category successfully added to the menu
          </p>
        </div>
      )}
    </div>
  );
};
