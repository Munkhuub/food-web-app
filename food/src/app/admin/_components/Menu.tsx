import {
  ChevronsUpDown,
  LayoutDashboardIcon,
  SettingsIcon,
  TruckIcon,
} from "lucide-react";

export const Menu = () => {
  return (
    <div className="w-full flex gap-6 bg-[#E4E4E7]">
      <div className="w-[205px] px-5 py-9 bg-[white] flex flex-col gap-10 shadow-xl">
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
        <div className=" w-[165px] flex flex-col gap-6 justify-center ml-6">
          <div className="flex gap-[10px]">
            <LayoutDashboardIcon className="size-[22px]" />
            <p>Food menu</p>
          </div>
          <div className="flex gap-[10px]">
            <TruckIcon className="size-[22px]" />
            <p>Orders</p>
          </div>
          <div className="flex gap-[10px]">
            <SettingsIcon className="size-[22px]" />
            <p>Settings</p>
          </div>
        </div>
      </div>
      <div className="h-full w-full mr-10 mb-13 pt-6 bg-[#E4E4E7] flex flex-col gap-6"></div>
    </div>
  );
};
