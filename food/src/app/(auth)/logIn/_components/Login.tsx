"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import { StepContext } from "../../StepProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../../signUp/_components/Step1";

type LoginPropsType = {
  handlePrev: () => void;
  handleNext: () => void;
};

export const Login = ({ handlePrev, handleNext }: LoginPropsType) => {
  const context = useContext(StepContext);
  const [showPassword, setShowPassword] = useState(false);

  if (!context) {
    throw new Error("Step1 must be used within a StepProvider");
  }

  const { values, setValues } = context;
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: values?.email,
      password: values?.password || "",
    },
  });

  return (
    <div className="flex gap-12 p-5 w-full h-screen justify-center">
      <form
        className="w-[416px] mt-[246px] ml-20 flex flex-col gap-6"
        onSubmit={handleSubmit((data) => {
          const copyOfValues = { ...values };
          copyOfValues.email = data.email;
          setValues(copyOfValues);
          handleNext();
        })}
      >
        <Link href="/">
          <Button variant="outline" size="icon" onClick={handlePrev}>
            <ChevronLeft />
          </Button>
        </Link>
        <div>
          <h3 className="text-2xl font-semibold">Log in</h3>
          <p className="text-[#71717A]">
            Log in to enjoy your favorite dishes.
          </p>
        </div>
        <div>
          <div className="w-full h-9 px-3 py-2 border-[1px] border-[#E4E4E7] rounded-md">
            <input
              type="email"
              placeholder="Enter your mail address"
              className="h-5 flex items-center text-[14px] w-full border-none"
              {...register("email")}
            />
          </div>
          {formState.errors.email && (
            <div className="text-[#E14942] text-[14px]">
              {formState.errors.email.message}
            </div>
          )}
          <div className="w-full h-9 px-3 py-2 border-[1px] border-[#E4E4E7] rounded-md">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="h-5 flex items-center text-[14px] w-full border-none"
              {...register("password")}
            />
          </div>
        </div>

        <Button
          className={`w-full transition-none hover:bg-black hover:text-white ${
            formState.isValid
              ? "bg-black text-white"
              : "bg-[#d1d1d1] text-black hover:bg-[#d1d1d1] hover:text-black"
          }`}
          type="submit"
        >
          Let's Go
        </Button>
        <div className="w-full flex justify-center">
          <div className="flex gap-3">
            <p className="text-[#71717A]">Already have an account?</p>
            <Link href="/login" className="text-[#2563EB]">
              Log in
            </Link>
          </div>
        </div>
      </form>
      <div className="h-full w-[856px]">
        <img
          className="h-full"
          src="/images/signUp/signup.png"
          alt="Delivery image"
        />
      </div>
    </div>
  );
};
