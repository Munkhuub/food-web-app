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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { FoodsTypeCategory } from "./CategoryFoods";
import { CategorySelect } from "./CategorySelect";
import { Controller } from "react-hook-form";

type CategoryEditProps = {
  food: FoodsTypeCategory;
  categoryId: string;
  getFoods: () => Promise<void>;
};

export const formSchema = z.object({
  foodName: z.string().min(1, "Food name is required"),
  ingredients: z.string().min(1, "Ingredients are required"),
  price: z.number().positive("Price must be positive"),
  categoryId: z.string(),
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
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodName: food.foodName,
      ingredients: food.ingredients,
      price: food.price,
      categoryId: categoryId,
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (value: string) => {
    setValue("categoryId", value);
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
          <DialogTitle>Dishes info</DialogTitle>
        </DialogHeader>

        <form className="grid gap-4 py-4" onSubmit={handleSubmit(handleUpdate)}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Dish name
            </Label>
            <Input
              {...register(`foodName`)}
              className={errors.foodName ? "border-red-500" : ""}
            />
            {errors.foodName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.foodName.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Dish category
            </Label>
            <div className="col-span-3">
              <CategorySelect
                selectedValue={watch("categoryId")}
                onValueChange={handleCategoryChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Ingredients
            </Label>
            <Input
              id="ingredients"
              {...register("ingredients")}
              className={errors.ingredients ? "border-red-500" : ""}
            />
            {errors.ingredients && (
              <p className="text-red-500 text-sm mt-1">
                {errors.ingredients.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Ingredients
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className={errors.price ? "border-red-500" : ""}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
