"use client";
import { ChevronsUpDown } from "lucide-react";
import { DatePickerWithRange } from "../_components/DatePicker";
import { Button } from "@/components/ui/button";
import AddressToggler from "./_components/AddressToggler";
import { PaginationAdmin } from "../_components/PaginationAdmin";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth, User } from "@/app/_providers/AuthProvider";
import { formatDate, isAfter, isBefore, isEqual, parseISO } from "date-fns";
import OrderStatusSelect from "./_components/OrderStatusSelect";
import { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrderedFoodView from "./_components/OrderedFoodView";
import { api } from "@/axios";

export type ordersType = {
  user: User;
  _id: string;
  orderNumber: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  foodOrderItems: Array<{
    food: { foodName: string; image: string; _id: string };
    quantity: number;
  }>;
  shippingAddress: string;
};

export default function Home() {
  const [orders, setOrders] = useState<ordersType[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<ordersType[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { user } = useAuth();

  const getAllOrders = useCallback(async () => {
    const { data } = await api.get(`/orders/all`);
    setOrders(data.order);
    setFilteredOrders(data.order);
    console.log(data.order);
  }, []);

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  useEffect(() => {
    if (!dateRange || !dateRange.from) {
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter((order) => {
      const orderDate = parseISO(order.createdAt);

      if (dateRange.from && !dateRange.to) {
        return (
          isEqual(orderDate, dateRange.from) ||
          isAfter(orderDate, dateRange.from)
        );
      }

      if (dateRange.from && dateRange.to) {
        return (
          (isEqual(orderDate, dateRange.from) ||
            isAfter(orderDate, dateRange.from)) &&
          (isEqual(orderDate, dateRange.to) ||
            isBefore(orderDate, dateRange.to))
        );
      }

      return true;
    });

    setFilteredOrders(filtered);
  }, [dateRange, orders]);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const resetFilters = () => {
    setDateRange(undefined);
    setFilteredOrders(orders);
  };

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentOrders = useMemo(() => {
    return filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredOrders, indexOfFirstItem, indexOfLastItem]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  if (!user) {
    return null;
  }
  if (user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-[#E4E4E7] flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 lg:pl-6 lg:pr-10">
 
      <div className="size-8 sm:size-9 bg-black ml-auto rounded-full overflow-hidden">
        <img src={user.image} className="w-full h-full object-cover" alt="User" />
      </div>

   
      <div className="bg-white min-h-[600px] lg:min-h-[800px] rounded-lg p-3 sm:p-4 flex flex-col">
      
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 py-4 border-b">
          <div>
            <p className="text-lg sm:text-xl font-bold">Orders</p>
            <p className="text-xs text-[#71717A]">
              {filteredOrders.length} items
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Select
              value={String(itemsPerPage)}
              onValueChange={handleItemsPerPageChange}
            >
              <SelectTrigger className="w-full sm:w-[120px]">
                <SelectValue placeholder="Items per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 per page</SelectItem>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>
            <DatePickerWithRange onDateRangeChange={handleDateRangeChange} />
            {dateRange && (
              <Button onClick={resetFilters} variant="outline">
                Clear Filters
              </Button>
            )}
          </div>
        </div>

    
        <div className="flex-1 overflow-auto">
          <div className="min-w-[800px]">
            <table className="text-[#71717A] w-full text-left">
              <thead className="w-full border-b border-[#F4F4F5CC]">
                <tr className="h-12 sm:h-13">
                  <th className="text-black font-medium p-2 sm:p-4 text-xs sm:text-sm">№</th>
                  <th className="font-medium p-2 sm:p-4 text-xs sm:text-sm min-w-[120px] sm:min-w-[180px]">Customer</th>
                  <th className="font-medium p-2 sm:p-4 text-xs sm:text-sm min-w-[100px] sm:min-w-[160px]">
                    <p>Food</p>
                  </th>
                  <th className="font-medium p-2 sm:p-4 text-xs sm:text-sm min-w-[120px] sm:min-w-[160px]">
                    <div className="flex items-center justify-between">
                      <p>Date</p>
                      <ChevronsUpDown className="size-3 sm:size-4" />
                    </div>
                  </th>
                  <th className="font-medium p-2 sm:p-4 text-xs sm:text-sm min-w-[80px] sm:min-w-[160px]">Total</th>
                  <th className="font-medium p-2 sm:p-4 text-xs sm:text-sm min-w-[120px] sm:min-w-[180px]">Delivery Address</th>
                  <th className="font-medium p-2 sm:p-4 text-xs sm:text-sm min-w-[120px] sm:min-w-[160px]">
                    <div className="flex items-center justify-between">
                      <p>Delivery state</p>
                      <ChevronsUpDown className="size-3 sm:size-4" />
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentOrders.map((order, index) => (
                  <tr key={order._id} className="border-b border-[#F4F4F5CC] hover:bg-gray-50">
                    <td className="font-medium p-2 sm:p-4 text-xs sm:text-sm">{indexOfFirstItem + index + 1}</td>
                    <td className="font-medium p-2 sm:p-4 text-xs sm:text-sm">
                      <div className="truncate max-w-[120px] sm:max-w-none" title={order.user.email}>
                        {order.user.email}
                      </div>
                    </td>
                    <td className="font-medium p-2 sm:p-4 text-xs sm:text-sm">
                      <OrderedFoodView order={order} />
                    </td>
                    <td className="font-medium p-2 sm:p-4 text-xs sm:text-sm">
                      <p className="whitespace-nowrap">
                        {formatDate(new Date(order.createdAt), "yyyy/MM/dd")}
                      </p>
                    </td>
                    <td className="font-medium p-2 sm:p-4 text-xs sm:text-sm whitespace-nowrap">
                      ${order.totalPrice}
                    </td>
                    <td className="p-2 sm:p-4 text-xs">
                      <AddressToggler
                        address={order.user?.address}
                        maxLength={window.innerWidth < 640 ? 20 : 57}
                      />
                    </td>
                    <td className="p-2 sm:p-4">
                      <OrderStatusSelect order={order} />
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500 text-sm">
                      No orders found for the selected date range
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>


      <div className="flex justify-center sm:justify-end">
        <PaginationAdmin
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}