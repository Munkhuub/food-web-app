"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, LogIn } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-12 p-5 w-full h-screen justify-center">
      <div className="w-[416px] mt-[246px] ml-20 flex flex-col gap-6">
        <Button variant="outline" size="icon">
          <ChevronLeft />
        </Button>
        <div>
          <h3 className="text-2xl font-semibold">Create your account</h3>
          <p className="text-[#71717A]">
            Sign up to explore your favorite dishes.
          </p>
        </div>

        <div className="w-full h-9 px-3 py-2 border-[1px] border-[#E4E4E7] rounded-md">
          <input
            type="email"
            placeholder="Enter your mail address"
            className="h-5 flex items-center text-[14px] w-[58%] border-none"
          />
        </div>

        <Button className="w-full bg-[#d1d1d1]">Let's Go</Button>
        <div className="w-full flex justify-center">
          <div className="flex gap-3">
            <p className="text-[#71717A]">Already have an account?</p>
            <Link href={LogIn}>Log in</Link>
          </div>
        </div>
      </div>
      <div className="h-full w-[856px]">
        <img
          className="h-full"
          src="/images/signUp/signup.png"
          alt="Delivery image"
        />
      </div>
    </div>
  );
}
