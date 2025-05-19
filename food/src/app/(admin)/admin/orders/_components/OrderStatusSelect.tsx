"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronsUpDown } from "lucide-react";
import { ordersType } from "../page";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { api } from "@/axios";
type statusProps = {
  order: ordersType;
};

const statusOptions = ["Pending", "Canceled", "Delivered"];

const OrderStatusSelect = ({ order }: statusProps) => {
  const [newStatus, setNewStatus] = useState(order.status);
  const updateStatus = async (status: string) => {
    try {
      const userId = order?._id;
      const token = localStorage.getItem("token");

      const { data } = await api.put(
        `/orders/${userId}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log("status updated successfully", data);
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Failed to update status", error);
      toast.error("Failed to update status");
    }
  };

  const handleSelectStatus = async (status: string) => {
    setNewStatus(status);
    await updateStatus(status);
  };

  const borderColorClass =
    newStatus === "Pending"
      ? "border-red-500"
      : newStatus === "Delivered"
      ? "border-green-500"
      : "";

  return (
    <Select value={newStatus} onValueChange={handleSelectStatus}>
      <SelectTrigger
        className={cn(
          "rounded-full flex gap-2",
          borderColorClass,
          newStatus === "Pending" && "focus:ring-red-500",
          newStatus === "Delivered" && "focus:ring-green-500"
        )}
      >
        <SelectValue placeholder="Pending" />
        <div className="flex items-center">
          <ChevronsUpDown className="size-4" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statusOptions.map((status, index) => (
            <SelectItem key={index} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default OrderStatusSelect;
