import React from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRightIcon, MapPin } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const DeliveryAddress = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="lg:w-[251px] h-[36px] rounded-full text-xs"
        >
          <MapPin className="text-[#EF4444]" />
          <p className="text-[#EF4444]">Delivery address:</p>
          <p className="text-[#71717A]">Add Location</p>
          <ChevronRightIcon className="text-[#71717A]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6 gap-6">
        <DialogHeader className=" h-9 justify-center">
          <DialogTitle>Delivery address</DialogTitle>
        </DialogHeader>
        <div>
          <div>
            <Textarea
              className="w-max-[432px] h-[112px]"
              placeholder="Please provide specific address details such as building number, entrance, and apartment number"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-white text-black border border-[#E4E4E7]"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Deliver Here</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeliveryAddress;
