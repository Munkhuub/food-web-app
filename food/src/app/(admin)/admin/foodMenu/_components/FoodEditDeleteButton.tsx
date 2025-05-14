import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import { FoodsTypeCategory } from "./CategoryFoods";

type FoodEditDeleteButtonProps = {
  food: FoodsTypeCategory;
  onDelete: () => void;
};

export const FoodEditDeleteButton = ({
  food,
  onDelete,
}: FoodEditDeleteButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${food.foodName}?`)) {
      return;
    }
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3001/food/${food._id}`);
      onDelete();
    } catch (error) {
      console.error("Failed to delete food", error);
      alert("Failed to delete food item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="icon"
      className="w-12 h-10 border border-[#EF4444] bg-white hover:bg-[#DC2626]"
      onClick={handleDelete}
      disabled={loading}
    >
      <Trash className="size-4 text-[#EF4444] hover:text-white" />
    </Button>
  );
};
