import { Button } from "@/components/ui/button";
import { Pencil, XIcon } from "lucide-react";
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
import { useEffect, useState } from "react";
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
  image: z.string().url("Valid image URL is required"),
});

type FormValues = z.infer<typeof formSchema>;

export const EditFood = ({ food, categoryId, getFoods }: CategoryEditProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    setError,
    clearErrors,
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

  const { image } = watch();

  const handleUpdate = async (data: FormValues) => {
    try {
      setLoading(true);

      await axios.put(`http://localhost:3001/food/${food._id}`, {
        ...data,
      });
      setOpen(false);
      console.log("edit", data);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setError("image", { message: "Image is required" });
      return;
    }

    try {
      // Create a sub-schema just for image validation
      const imageSchema = z
        .instanceof(File)
        .refine(
          (file) => file.size <= 5000000,
          "File size must be less than 5MB"
        )
        .refine(
          (file) =>
            ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
              file.type
            ),
          "Only .jpg, .jpeg, .png, and .webp formats are supported"
        );

      imageSchema.parse(file);

      setValue("image", file);

      clearErrors("image");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0]?.message || "Invalid image";
        setError("image", { message: errorMessage });
      }
    }
  };

  const handleCancelImage = () => {
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
    setValue("image", undefined as any);
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
            <Label
              htmlFor="foodName"
              className="text-right text-[#71717A] text-xs mb-auto"
            >
              Dish name
            </Label>
            <Input
              {...register(`foodName`)}
              className={`w-[288px] ${errors.foodName ? "border-red-500" : ""}`}
            />
            {errors.foodName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.foodName.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
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
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 w-full">
            <Label
              htmlFor="ingredients"
              className="text-right text-[#71717A] text-xs mb-auto"
            >
              Ingredients
            </Label>
            <Input
              id="ingredients"
              {...register("ingredients")}
              className={`w-[288px] h-[80px] ${
                errors.ingredients ? "border-red-500" : ""
              }`}
            />
            {errors.ingredients && (
              <p className="text-red-500 text-sm mt-1">
                {errors.ingredients.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="price"
              className="text-right text-[#71717A] text-xs mb-auto"
            >
              Price
            </Label>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="image"
              className="text-right text-[#71717A] text-xs mb-auto"
            >
              Image
            </Label>

            {!show && (
              <Input
                id="image"
                type="file"
                {...register("image")}
                className={`w-[288px] h-[116px] ${
                  errors.image ? "border-red-500" : ""
                }`}
              />
            )}

            {/* {show && (
              <div className="w-[288px] h-[116px] relative">
                <img
                  // src={imagePreviewUrl}
                  className="w-full h-full object-cover"
                  alt="Food preview"
                />
                <Button
                  type="button"
                  onClick={handleCancelImage}
                  className="z-20 rounded-full absolute top-2 right-2 bg-white hover:bg-gray-200"
                  size="icon"
                >
                  <XIcon className="size-4" />
                </Button>
              </div>
            )} */}
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
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
