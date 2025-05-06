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

import { Minus, Plus, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FoodsType } from "./Foods";

type AddToCardProps = {
  food: FoodsType;
};

interface CartItem {
  id: string;
  foodName: string;
  price: number;
  quantity: number;
  image: string;
  ingredients: string;
}

export const AddToCard = ({ food }: AddToCardProps) => {
  const [quantity, setQuantity] = useState(1); // Start with 1 instead of 0
  const [open, setOpen] = useState(false);

  const minusFood = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Minimum quantity should be 1
  };

  const plusFood = () => {
    setQuantity((prev) => prev + 1);
  };
  const addToCart = () => {
    try {
      let cart = [];
      const savedCart = localStorage.getItem("foodCart");
      if (savedCart) {
        cart = JSON.parse(savedCart);
      }

      const foodId =
        food._id || `food-${food.foodName.replace(/\s+/g, "-").toLowerCase()}`;

      const existingItemIndex = cart.findIndex((item) => item.id === foodId);

      if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += quantity;
      } else {
        cart.push({
          id: foodId,
          foodName: food.foodName,
          price: food.price,
          quantity: quantity,
          image: food.image,
          ingredients: food.ingredients,
        });
      }

      // Save back to localStorage
      localStorage.setItem("foodCart", JSON.stringify(cart));

      // Create and dispatch a custom event
      const event = new CustomEvent("cartUpdated");
      window.dispatchEvent(event);

      // Show toast notification
      // toast({
      //   title: "Added to cart",
      //   description: `${quantity} ${food.foodName}${
      //     quantity > 1 ? "s" : ""
      //   } added to your cart.`,
      // });
    } catch (error) {
      console.error("Error adding to cart:", error);
      // toast({
      //   title: "Error",
      //   description: "Could not add item to cart. Please try again.",
      //   variant: "destructive",
      // });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                  <p className="text-[18px]">{quantity}</p>
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
                  onClick={() => {
                    addToCart();
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
