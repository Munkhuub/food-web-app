import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRightIcon, MapPin } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useAuth } from "@/app/_providers/AuthProvider";
import { toast } from "sonner";

const DeliveryAddress = ({}) => {
  const [userAddress, setUserAddress] = useState("");
  const { user, setUser } = useAuth();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserAddress(e.target.value);
    setError("");
  };

  const updateAddress = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userAddress.trim()) {
      setError("Address is required");
      return;
    }

    const userId = user?._id;
    if (!userId) {
      setError("User not logged in or ID not available.");
      toast.error("User ID not found. Please log in again.");
      return;
    }
    setIsSubmitting(true);
    try {
      const userId = user?._id;

      const { data } = await axios.put(`http://localhost:3001/user/${userId}`, {
        address: userAddress,
      });
      setUser((prev) => {
        if (!prev) return prev;
        return { ...prev, address: userAddress };
      });
      console.log("Address updated successfully", data);
      toast.success("Address updated successfully");
      setOpen(false);
    } catch (error) {
      console.error("Failed to update address", error);
      setError("Failed to update address. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const clearAddress = async () => {
    const userId = user?._id;
    if (!userId) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await axios.put(`http://localhost:3001/user/${userId}`, {
        address: "",
      });
      setUser((prev) => {
        if (!prev) return prev;
        return { ...prev, address: "" };
      });
      setUserAddress("");
      toast.success("Address cleared successfully");
      setOpen(false);
    } catch (error) {
      console.error("Failed to clear address", error);
      toast.error("Failed to clear address. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="lg:w-[251px] h-[36px] rounded-full text-xs pl-2"
        >
          <MapPin className="text-[#EF4444]" />
          <p className="text-[#EF4444]">Delivery address:</p>
          <p className="text-[#71717A] truncate max-w-[100px] ">
            {user?.address || "Add Location"}
          </p>
          <ChevronRightIcon className="text-[#71717A]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6 ">
        <DialogHeader className=" h-9 justify-center">
          <DialogTitle>Delivery address</DialogTitle>
        </DialogHeader>
        <form onSubmit={updateAddress} className="flex flex-col gap-6">
          <div>
            <Textarea
              className="w-max-[432px] h-[112px]"
              placeholder="Please provide specific address details such as building number, entrance, and apartment number"
              value={userAddress}
              onChange={handleAddressChange}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={clearAddress}
              disabled={isSubmitting}
              className="bg-white text-black border border-[#E4E4E7]"
            >
              Clear Address
            </Button>
            <DialogClose asChild>
              <Button
                type="button"
                className="bg-white text-black border border-[#E4E4E7]"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Deliver Here"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeliveryAddress;
