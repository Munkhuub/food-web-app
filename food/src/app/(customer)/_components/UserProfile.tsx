"use client";

import { useAuth } from "@/app/_providers/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Profile } from "./_assets/Profile";
import { useEffect, useState } from "react";

export const UserProfile = () => {
  const { user, signOut } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  // Log user data for debugging
  console.log("UserProfile rendered with user:", user);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-[#EF4444] border-none"
        >
          <Profile />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[308px] !top-[154px] !left-[88%]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex gap-2 items-center ">
              <img className="size-12 rounded-full bg-black" />
              <div>
                <p className="text-xs">Name here</p>
                <p className="text-xs">{email}</p>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 mb-auto">
          <DialogFooter className="flex justify-between items-center">
            <Button
              variant="destructive"
              onClick={() => {
                signOut();
                setOpen(false);
              }}
              type="button"
            >
              Sign Out
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
