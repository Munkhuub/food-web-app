import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { CategoryType } from "../page";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

type CategorySelectProps = {
  selectedValue?: string;
  onValueChange: (value: string) => void;
};

export const CategorySelect = ({
  selectedValue,
  onValueChange,
}: CategorySelectProps) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:3001/category");
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Select value={selectedValue} onValueChange={onValueChange} name="Category">
      <SelectTrigger className="w-full">
        <SelectValue placeholder={loading ? "Loading..." : "Select category"} />
      </SelectTrigger>
      <SelectContent className="text-xs">
        <SelectGroup>
          {categories.length > 0 ? (
            categories.map(({ _id, categoryName }) => (
              <SelectItem key={_id} value={_id} className="text-xs">
                <Badge className="bg-[#F4F4F5] text-black rounded-full">
                  {categoryName}
                </Badge>
              </SelectItem>
            ))
          ) : (
            <SelectItem value="loading" disabled>
              {loading ? "Loading categories..." : "No categories found"}
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
