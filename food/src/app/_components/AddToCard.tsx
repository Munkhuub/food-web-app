import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus, XIcon } from "lucide-react";
import { FoodsType } from "./Appetizers";
import { useState } from "react";

type AddToCardProps = {
  food: FoodsType;
};

export const AddToCard = ({ food }: AddToCardProps) => {
  const [addedFood, setAddedFood] = useState(0);

  const minusFood = () => {
    setAddedFood((prev) => (prev > 0 ? prev - 1 : 0));
  };
  const plusFood = () => {
    setAddedFood((prev) => prev + 1);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="absolute rounded-full right-9 bottom-[136px] bg-white size-11"
          size="icon"
        >
          <Plus className="text-[#EF4444] size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[826px]">
        <div className="flex gap-6">
          <img src={food?.image} className="w-[377px] h-[364px] rounded-xl" />

          <div className="flex flex-col justify-between">
            <div className="mt-9 flex flex-col gap-3">
              <DialogTitle className="text-3xl text-[#EF4444]">
                {food?.foodName}
              </DialogTitle>
              <p>{food?.ingredients}</p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div>
                  <p>Total price</p>
                  <p className="text-2xl font-semibold">${food?.price}</p>
                </div>
                <div className="flex gap-3 items-center">
                  <Button
                    size="icon"
                    className="rounded-full bg-white border border-[#E4E4E7]"
                    onClick={minusFood}
                  >
                    <Minus className="text-black" />
                  </Button>
                  <p className="text-[18px]">{addedFood}</p>
                  <Button
                    size="icon"
                    className="rounded-full bg-white border border-black"
                    onClick={plusFood}
                  >
                    <Plus className="text-black" />
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full rounded-full h-11 bg-black"
                >
                  Add to cart
                </Button>
              </DialogFooter>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
