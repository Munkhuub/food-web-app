"use client";
import {
  ChevronsUpDown,
  LayoutDashboardIcon,
  SettingsIcon,
  TruckIcon,
} from "lucide-react";
import { DatePickerWithRange } from "../foodMenu/_components/DatePicker";
import { Button } from "@/components/ui/button";
import AddressToggler from "./_components/AddressToggler";
import { PaginationAdmin } from "../foodMenu/_components/PaginationAdmin";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Item } from "@radix-ui/react-select";
import { useAuth } from "@/app/_providers/AuthProvider";
import { formatDate } from "date-fns";
import OrderStatusSelect from "./_components/OrderStatusSelect";

const tableData = {
  location:
    "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоон20",
};
export type ordersType = {
  _id: string;
  orderNumber: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  foodOrderItems: Array<{ food: { foodName: string }; quantity: number }>;
  shippingAddress: string;
};
export default function Home() {
  const [orders, setOrders] = useState<ordersType[]>([]);
  const { user } = useAuth();
  const getAllOrders = useCallback(async () => {
    const { data } = await axios.get(`http://localhost:3001/orders/all`);

    setOrders(data.order);
    console.log(data.order);
  }, []);

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  return (
    <div className="h-full w-full mr-10 mb-13 pt-6 bg-[#E4E4E7] flex flex-col gap-6 pl-6 pr-10">
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
        <div className="overflow-auto max-h-[70vh]">
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
              {orders.map((order) => (
                <tr key={order._id}>
                  <th className="w-12 p-4">
                    <input type="checkbox" className="size-4" />
                  </th>
                  <th className="w-14 font-medium p-4">1</th>
                  <th className="w-[213.5px] font-medium p-4">
                    Test@gmail.com
                  </th>
                  <th className="w-40 font-medium p-4">
                    <p>food order items</p>
                  </th>
                  <th className="w-40 font-medium p-4">
                    <p>
                      {formatDate(new Date(order.createdAt), "yyyy / MM / dd")}
                    </p>
                  </th>
                  <td className="w-40 font-medium p-4">${order.totalPrice}</td>
                  <td className="w-[213.5px] text-xs p-4">
                    <AddressToggler address={user?.address} maxLength={57} />
                  </td>
                  <td className="w-40 p-4">
                    <OrderStatusSelect order={order} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="h-16 ml-auto">
        <PaginationAdmin />
      </div>
    </div>
  );
}
