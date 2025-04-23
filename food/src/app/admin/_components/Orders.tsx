import {
  ChevronsUpDown,
  LayoutDashboardIcon,
  SettingsIcon,
  TruckIcon,
} from "lucide-react";
import { DatePickerWithRange } from "./DatePicker";
import { Button } from "@/components/ui/button";
import AddressToggler from "./AddressToggler";
import { PaginationAdmin } from "./PaginationAdmin";

const tableData = {
  location:
    "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоон20",
};

export const Orders = () => {
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
      <div className="h-full w-full mr-10 mb-13 pt-6 bg-[#E4E4E7] flex flex-col gap-6">
        <div className="size-9 bg-black ml-auto rounded-full">
          <img />
        </div>
        <div className="bg-white h-[800px] rounded-lg px-4">
          <div className="flex justify-between py-4">
            <div>
              <p className="text-xl font-bold">Orders</p>
              <p className="text-xs text-[#71717A]">32 items</p>
            </div>
            <div className="flex gap-3">
              <DatePickerWithRange />
              <Button>Change delivery state</Button>
            </div>
          </div>
          <div>
            <table className="text-[#71717A] w-full text-left">
              <thead className="w-full h-13 border-y-[1px] border-[#F4F4F5CC] ">
                <tr>
                  <th className="w-12 p-4">
                    <input type="checkbox" className="size-4" />
                  </th>
                  <th className="w-14 text-black font-medium p-4">№</th>
                  <th className="w-[213.5px] font-medium p-4">Customer</th>
                  <th className="w-40 font-medium p-4">
                    <p>Food</p>
                  </th>
                  <th className="h-full w-40 font-medium flex items-cente justify-between pl-4 pr-5 py-4">
                    <p>Date</p>
                    <div className="flex items-center">
                      <ChevronsUpDown className="size-4" />
                    </div>
                  </th>
                  <td className="w-40 font-medium p-4">Total</td>
                  <td className="w-[213.5px] p-4">Delivery Address</td>
                  <th className="h-full w-40 font-medium flex items-cente justify-between pl-4 pr-5 py-4">
                    <p>Delivery state</p>
                    <div className="flex items-center">
                      <ChevronsUpDown className="size-4" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="w-full h-13 border-b-[1px] border-[#F4F4F5CC]">
                <tr>
                  <th className="w-12 p-4">
                    <input type="checkbox" className="size-4" />
                  </th>
                  <th className="w-14 font-medium p-4">1</th>
                  <th className="w-[213.5px] font-medium p-4">
                    Test@gmail.com
                  </th>
                  <th className="w-40 font-medium p-4">
                    <p>2 Foods</p>
                  </th>
                  <th className="w-40 font-medium p-4">
                    <p>2024/12/20</p>
                  </th>
                  <td className="w-40 font-medium p-4">$26.97</td>
                  <td className="w-[213.5px] text-xs p-4">
                    <AddressToggler
                      address={tableData.location}
                      maxLength={57}
                    />
                  </td>
                  <td className="w-40 p-4">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="h-16 ml-auto">
          <PaginationAdmin />
        </div>
      </div>
    </div>
  );
};
