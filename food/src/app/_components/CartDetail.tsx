import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cart } from "./_assets/Cart";
import { ShoppingCartIcon } from "lucide-react";

const CartDetail = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Cart />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#404040] rounded-l-[20px]">
        <DialogHeader>
          <div className="flex gap-3 items-center text-white">
            <ShoppingCartIcon className="size-6" />
            <DialogTitle>Order detail</DialogTitle>
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <p>My cart</p>
            <div>
              <img />
            </div>
          </div>
          <div></div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CartDetail;
