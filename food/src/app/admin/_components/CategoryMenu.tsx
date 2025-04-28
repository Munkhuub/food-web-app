import axios from "axios";
import { useEffect, useState } from "react";
import { Categories } from "./Category";
import { Check, CircleX, Plus, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type CategoryType = {
  _id: string;
  categoryName: string;
};
type AllFoods = {
  countAllFood: number;
};

export const CategoryMenu = () => {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
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

  const addCategory = async () => {
    try {
      if (!newCategoryName.trim()) return;

      const response = await axios.post("http://localhost:3001/category", {
        categories: [{ categoryName: newCategoryName }],
      });
      console.log(response.data);

      setNewCategoryName("");
      setShowInput(false);
      setSuccessMessage(true);

      setTimeout(() => {
        setSuccessMessage(false);
      }, 2000);
      getCategories();
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6 bg-white w-full rounded-xl relative">
      <h4 className="text-xl font-semibold">Dishes category</h4>
      <div className="flex gap-3 flex-wrap items-center ">
        <div className="px-4 py-2 bg-white rounded-full flex gap-2 border-[1px] border-[#E4E4E7] text-[14px]">
          All dishes
          <button className="bg-black rounded-full text-xs text-white px-[10px] py-[2px]">
            {allFoods.countAllFood}
          </button>
        </div>
        {category.map((item, index) => {
          return (
            <div key={index}>
              <Categories item={item} />
            </div>
          );
        })}
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
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className=" w-[420px] h-[272px] flex flex-col justify-between rounded-xl bg-white p-6 shadow-xs ">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between h-[52px]">
                <p className="text-lg font-semibold">Add new category</p>
                <Button
                  onClick={() => {
                    setShowInput(false);
                    setNewCategoryName("");
                  }}
                  className="bg-gray-300 text-black px-3 py-1text-sm rounded-full size-9"
                >
                  <XIcon className="size-4" />
                </Button>
              </div>
              <div className=" flex flex-col gap-2">
                <p className="text-[14px]">Category name</p>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder=""
                  className="border border-[#E4E4E7] rounded-lg px-3 py-1 text-[14px] w-full h-[38px]"
                />
              </div>
            </div>

            <Button
              onClick={addCategory}
              className=" text-white px-4 py-[10px] rounded-lg text-sm w-[123px] ml-auto "
            >
              Add category
            </Button>
          </div>
        </div>
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
