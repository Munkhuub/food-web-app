"use client";
import { useAuth } from "@/app/_providers/AuthProvider";
import { LayoutDashboardIcon, SettingsIcon, TruckIcon } from "lucide-react";
import Link from "next/link";

export const SideBar = () => {
  const { user } = useAuth();
  if (!user) {
    return;
  }
  if (user.role !== "admin") {
    return;
  }
  return (
    <div className="w-[205px] px-5 py-9 bg-[white] flex flex-col gap-10 shadow-xl relative">
      <div className="sticky top-9">
        <Link href="/">
          <div className="flex gap-3 items-center">
            <img className="size-[38px] object-fit" src="/images/logo.png" />
            <div>
              <div className="flex text-xl/7 font-semibold">
                <p className="text-[#EF4444] ">Nom</p>
                <p>Nom</p>
              </div>
              <p className="text-xs">Swift delivery</p>
            </div>
          </div>
        </Link>
      </div>

      <div className=" w-[165px] flex flex-col gap-6 justify-center ml-6 sticky top-30">
        <Link href="/admin">
          <div className="flex gap-[10px]">
            <LayoutDashboardIcon className="size-[22px]" />
            <p>Food menu</p>
          </div>
        </Link>
        <Link href="/admin/orders">
          <div className="flex gap-[10px]">
            <TruckIcon className="size-[22px]" />
            <p>Orders</p>
          </div>
        </Link>
        <div className="flex gap-[10px]">
          <SettingsIcon className="size-[22px]" />
          <p>Settings</p>
        </div>
      </div>
    </div>
  );
};
