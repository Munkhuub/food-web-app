"use client";

import { Button } from "@/components/ui/button";
import { Cart } from "./_assets/Cart";
import { Profile } from "./_assets/Profile";
import DeliveryAddress from "./DeliveryAddress";
import CartDetail from "./CartDetail";

export const Header = () => {
  return (
    <div className="w-full h-[68px] bg-[#18181B] px-22 py-3 items-center flex justify-between">
      <div className="flex text-white gap-3 items-center">
        <img className="size-[38px] object-fit" src="/images/logo.png" />
        <div>
          <div className="flex text-xl/7 font-semibold">
            <p className="text-[#EF4444] ">Nom</p>
            <p>Nom</p>
          </div>
          <p className="text-xs">Swift delivery</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <DeliveryAddress />
        <CartDetail />
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-[#EF4444] border-none"
        >
          <Profile />
        </Button>
      </div>
    </div>
  );
};
