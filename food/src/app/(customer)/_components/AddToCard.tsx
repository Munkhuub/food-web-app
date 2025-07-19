import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { FoodsType } from "./Foods";
import { useCart } from "./CartContext";

type AddToCardProps = {
  food: FoodsType;
};

export const AddToCard = ({ food }: AddToCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const { addToCart } = useCart();

  const minusFood = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const plusFood = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="absolute rounded-full right-2 sm:right-4 md:right-9 bottom-[100px] xs:bottom-[110px] sm:bottom-[120px] md:bottom-[136px] bg-white size-8 sm:size-9 md:size-11"
          size="icon"
        >
          <Plus className="text-[#EF4444] size-3 sm:size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95%] sm:max-w-md md:max-w-2xl lg:max-w-4xl">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden">
            <img
              src={food?.image}
              alt={food?.foodName}
              className="rounded-xl object-fit"
            />
          </div>

          <div className="flex flex-col justify-between gap-4 md:gap-0">
            <div className="mt-0 md:mt-4 lg:mt-9 flex flex-col gap-2 md:gap-3">
              <DialogTitle className="text-xl sm:text-2xl md:text-3xl text-[#EF4444]">
                {food?.foodName}
              </DialogTitle>
              <p className="text-sm sm:text-base">{food?.ingredients}</p>
            </div>

            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm sm:text-base">Total price</p>
                  <p className="text-xl sm:text-2xl font-semibold">
                    ${(food?.price * quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-2 sm:gap-3 items-center">
                  <Button
                    size="icon"
                    className="rounded-full bg-white border border-[#E4E4E7] size-8 sm:size-9"
                    onClick={minusFood}
                  >
                    <Minus className="text-black size-3 sm:size-4" />
                  </Button>
                  <p className="text-base sm:text-lg min-w-[20px] text-center">
                    {quantity}
                  </p>
                  <Button
                    size="icon"
                    className="rounded-full bg-white border border-black size-8 sm:size-9"
                    onClick={plusFood}
                  >
                    <Plus className="text-black size-3 sm:size-4" />
                  </Button>
                </div>
              </div>

              <DialogFooter className="mt-2 sm:mt-0">
                <Button
                  type="submit"
                  className="w-full rounded-full h-10 sm:h-11 bg-black"
                  onClick={() => {
                    addToCart(food, quantity);
                    setOpen(false);
                  }}
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
