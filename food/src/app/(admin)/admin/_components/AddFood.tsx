import { Button } from "@/components/ui/button";
import axios from "axios";
import { Plus, XIcon } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";

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
  const [imageValue, setImageValue] = useState<File | undefined>();
  const [deployedImg, setDeployedImg] = useState("");
  const [open, setOpen] = useState(false);
  const [foodName, setfoodName] = useState("");
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
      console.log(error);
      return { error: "failed to upload image" };
    }
  };

  const handleCreate = async () => {
    try {
      setLoading(true);

      await axios.post("http://localhost:3001/food/oneFood", {
        foodName,
        price: Number(price),
        image: deployedImg,
        ingredients,
        category: categoryId,
      });

      await getFoods();

      setOpen(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleUploadImg = async () => {
    const result = await uploadImage(imageValue);
    setDeployedImg(result);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-[270.75px] h-[241px] border border-dashed border-[#EF4444] rounded-[20px] flex flex-col gap-6 justify-center items-center">
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
          <DialogTitle>Add new Dish to Appetizers</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-right">
                Food name
              </Label>
              <Input
                id="name"
                value={foodName}
                className="col-span-3"
                onChange={(e) => setfoodName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="username" className="text-right">
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
            <Input
              value={ingredients}
              className="h-[90px]"
              onChange={(e) => setIngredients(e.target.value)}
              type="text"
            />
          </div>
          {deployedImg == "" ? (
            <div className="flex flex-col gap-2">
              <Label htmlFor="image" className="text-top">
                Food image
              </Label>
              <Input
                className="h-[90px]"
                onChange={(e) => setImageValue(e.target.files?.[0])}
                type="file"
              />
              <Button onClick={handleUploadImg}>Add</Button>
            </div>
          ) : (
            <img alt="asd" src={deployedImg} />
          )}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCreate} disabled={loading}>
            Save changes
            {!loading}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
