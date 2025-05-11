"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import { StepContext } from "../../StepProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../../signup/_components/Step1";
import { z } from "zod";
import { useAuth } from "@/app/_providers/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type LoginPropsType = {
  handlePrev: () => void;
  handleNext: () => void;
};
export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const Login = ({ handlePrev, handleNext }: LoginPropsType) => {
  const router = useRouter();
  const context = useContext(StepContext);
  const [showPassword, setShowPassword] = useState(false);
  const { user, signIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!context) {
    throw new Error("Login must be used within a StepProvider");
  }

  const { values, setValues } = context;
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(loginSchema),
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
        onSubmit={handleSubmit(async (data) => {
          setIsSubmitting(true);
          const updatedValues = {
            ...values,
            email: data.email,
            password: data.password,
          };
          setValues(updatedValues);
          try {
            await signIn({
              email: data.email,
              password: data.password,
            });
          } catch (error) {
            console.error("Login failed", error);
            setIsSubmitting(false);
          }
        })}
      >
        <Button variant="outline" size="icon" onClick={handlePrev}>
          <ChevronLeft />
        </Button>

        <div>
          <h3 className="text-2xl font-semibold">Log in</h3>
          <p className="text-[#71717A]">
            Log in to enjoy your favorite dishes.
          </p>
        </div>
        <div className="flex flex-col gap-4">
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
          <p>Forgot password ?</p>
        </div>
        <Button
          className={`w-full transition-none hover:bg-black hover:text-black ${
            formState.isValid && !isSubmitting
              ? "bg-black text-white"
              : "bg-[#d1d1d1] text-[white] hover:bg-[#d1d1d1] hover:text-black"
          }`}
          type="submit"
          disabled={!formState.isValid || isSubmitting}
        >
          {isSubmitting ? "Logging In..." : "Let's Go"}
        </Button>

        <div className="w-full flex justify-center">
          <div className="flex gap-3">
            <p className="text-[#71717A]">Don't have an account?</p>
            <Link href="/signup" className="text-[#2563EB]">
              Sign up
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
