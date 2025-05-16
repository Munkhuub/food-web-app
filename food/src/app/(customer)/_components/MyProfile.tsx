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
import { ChevronRight, UserIcon } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { UpdateProfileImage } from "./UpdateProfileImage";

export const MyProfile = () => {
  const { user, setUser } = useAuth();
  const [userImage, setUserImage] = useState(user?.image || "");
  const [userName, setUserName] = useState(user?.name || "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const updateUserProfile = async () => {
    setIsSaving(true);
    setError("");

    try {
      const userId = user?._id;
      const { data } = await axios.put(`http://localhost:3001/user/${userId}`, {
        name: userName,
        image: userImage,
      });

      setUser((prev) => {
        if (!prev) return prev;
        return { ...prev, name: userName, image: userImage };
      });
    } catch (err) {
      console.error("Failed to update profile", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex py-2 px-2 justify-between w-full shadow-xs rounded-md">
          <div className="flex gap-3 items-center">
            <UserIcon className="size-4" />
            <p className="text-xs">My Profile</p>
          </div>
          <ChevronRight className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="image" className="text-right pt-2">
              Image
            </Label>
            <UpdateProfileImage
              defaultValue={user?.image}
              onChange={(url) => setUserImage(url)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              className="col-span-3"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          {error && (
            <p className="col-span-4 text-sm text-red-500 text-center">
              {error}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button type="button" onClick={updateUserProfile} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MyProfile;
