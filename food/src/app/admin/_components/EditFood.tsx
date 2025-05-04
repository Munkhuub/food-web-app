import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { FoodsTypeCategory } from "./CategoryFoods";
import { CategorySelect } from "./CategorySelect";
import { UpdateImage } from "./UpdateImage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FoodEditDeleteButton } from "./FoodEditDeleteButton";

type CategoryEditProps = {
  food: FoodsTypeCategory;
  categoryId: string;
  getFoods: () => Promise<void>;
};

const formSchema = z.object({
  foodName: z.string().min(1, "Food name is required"),
  ingredients: z.string().min(1, "Ingredients are required"),
  price: z.number().positive("Price must be positive"),
  categoryId: z.string().min(1, "Category is required"),
  image: z.string().url("Valid image URL is required"),
});

type FormValues = z.infer<typeof formSchema>;

export const EditFood = ({ food, categoryId, getFoods }: CategoryEditProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodName: food.foodName,
      ingredients: food.ingredients,
      price: food.price,
      categoryId: categoryId,
      image: food.image || "",
    },
  });

  const handleUpdate = async (data: FormValues) => {
    try {
      setLoading(true);

      await axios.put(`http://localhost:3001/food/${food._id}`, {
        ...data,
      });

      setOpen(false);
      await getFoods();
    } catch (error) {
      console.error("Failed to update food:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (value: string) => {
    setValue("categoryId", value);
  };

  const handleImageChange = (imageUrl: string) => {
    setValue("image", imageUrl, {
      shouldValidate: true,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="absolute rounded-full right-9 top-[81px] bg-white size-11"
          size="icon"
        >
          <Pencil className="text-[#EF4444] size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[472px]">
        <DialogHeader>
          <DialogTitle>Edit Dish Information</DialogTitle>
        </DialogHeader>

        <form className="grid gap-4 py-4" onSubmit={handleSubmit(handleUpdate)}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="foodName"
              className="text-right text-[#71717A] text-xs mb-auto"
            >
              Dish name
            </Label>
            <div className="col-span-3">
              <Input
                id="foodName"
                {...register("foodName")}
                className={`w-[288px] ${
                  errors.foodName ? "border-red-500" : ""
                }`}
              />
              {errors.foodName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.foodName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label
              htmlFor="categories"
              className="text-right text-[#71717A] text-xs mb-auto"
            >
              Dish category
            </Label>
            <div className="col-span-3 w-[288px]">
              <CategorySelect
                selectedValue={watch("categoryId")}
                onValueChange={handleCategoryChange}
              />
              {errors.categoryId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.categoryId.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label
              htmlFor="ingredients"
              className="text-right text-[#71717A] text-xs mb-auto"
            >
              Ingredients
            </Label>
            <div className="col-span-3">
              <textarea
                id="ingredients"
                {...register("ingredients")}
                className={`w-[288px] h-[80px] border rounded-md p-2 ${
                  errors.ingredients ? "border-red-500" : "border-input"
                }`}
              />
              {errors.ingredients && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ingredients.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="price"
              className="text-right text-[#71717A] text-xs mb-auto"
            >
              Price
            </Label>
            <div className="col-span-3">
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                className={`w-[288px] ${errors.price ? "border-red-500" : ""}`}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label
              htmlFor="image"
              className="text-right text-[#71717A] text-xs mb-auto"
            >
              Image
            </Label>
            <UpdateImage onChange={handleImageChange} />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1 col-start-2 col-span-3">
                {errors.image.message}
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <FoodEditDeleteButton food={food} onDelete={getFoods} />
            <DialogFooter>
              <Button
                type="submit"
                disabled={loading}
                className="hover:bg-[#DC2626] h-10 mr-6"
              >
                {loading ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
