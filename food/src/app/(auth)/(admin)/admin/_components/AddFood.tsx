import { Button } from "@/components/ui/button";
import axios from "axios";
import { Plus, XIcon } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const UPLOAD_PRESET = "foodWebApp";
const CLOUD_NAME = "dpbmpprw5";

type AddFoodProps = {
  getFoods: () => Promise<void>;
  categoryId: string;
  categoryName: string;
};

export const AddFood = ({
  getFoods,
  categoryId,
  categoryName,
}: AddFoodProps) => {
  const [loading, setLoading] = useState(false);
  const [deployedImg, setDeployedImg] = useState("");
  const [open, setOpen] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");

  const uploadImage = async (file: File | undefined) => {
    if (!file) {
      return null;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const result = response.data.url;
      return result;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        setDeployedImg(imageUrl);
      } else {
        setDeployedImg("");
      }
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      setLoading(true);

      if (!deployedImg) {
        console.error("No image uploaded.");
        setLoading(false);
        return;
      }

      await axios.post("http://localhost:3001/food/oneFood", {
        foodName,
        price: Number(price),
        image: deployedImg,
        ingredients,
        category: categoryId,
      });

      await getFoods();
      setOpen(false);
      setFoodName("");
      setPrice("");
      setIngredients("");
      setDeployedImg("");
    } catch (error) {
      console.error("Error creating food:", error);
      toast.error("Error creating food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="w-[270.75px] h-[241px] border border-dashed border-[#EF4444] rounded-[20px] flex flex-col gap-6 justify-center items-center cursor-pointer">
          <Button className="size-10 rounded-full bg-[#EF4444] flex items-center justify-center">
            <Plus className="text-white size-4" />
          </Button>
          <div className="text-[14px] text-center">
            Add new Dish to <br /> {categoryName}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new Dish to {categoryName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="food-name" className="text-right">
                Food name
              </Label>
              <Input
                id="food-name"
                value={foodName}
                className="col-span-3"
                onChange={(e) => setFoodName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="food-price" className="text-right">
                Food price
              </Label>
              <Input
                type="number"
                value={price}
                className="col-span-3"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ingredients" className="text-top">
              Ingredients
            </Label>
            <Textarea
              value={ingredients}
              className="h-[90px]"
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="food-image" className="text-top">
              Food image
            </Label>
            {deployedImg ? (
              <div className="relative w-full h-[150px] border rounded-md overflow-hidden flex items-center justify-center">
                <img
                  src={deployedImg}
                  alt="Uploaded food image"
                  className="object-cover w-full h-full"
                />

                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 rounded-full"
                  onClick={() => setDeployedImg("")}
                >
                  <XIcon className="size-4" />
                </Button>
              </div>
            ) : (
              <Input
                id="food-image"
                className="h-[90px] cursor-pointer"
                onChange={handleFileChange}
                type="file"
                accept="image/*"
              />
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleCreate}
            disabled={
              loading || !deployedImg || !foodName || !price || !ingredients
            }
          >
            {loading ? (
              <>
                Saving... <span className="ml-2 animate-spin">🌀</span>
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
