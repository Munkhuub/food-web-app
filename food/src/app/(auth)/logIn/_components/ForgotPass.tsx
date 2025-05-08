import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext, useState } from "react";
import { FormValues, StepContext } from "../../StepProvider";
import { schema } from "@/app/(auth)/signUp/_components/Step1";
import { Step2type } from "../../signUp/_components/Step2";

type ForgotPassPropsType = {
  handlePrev: () => void;
};

export const ForgotPass = ({ handlePrev }: ForgotPassPropsType) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const context = useContext(StepContext);

  if (!context) {
    throw new Error("Step1 must be used within a StepProvider");
  }

  const { values, setValues } = context;
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      password: values?.password || "",
      confirmPassword: values?.confirmPassword || "",
    },
  });

  return (
    <div className="flex gap-12 p-5 w-full h-screen justify-center">
      <form
        className="w-[416px] mt-[246px] ml-20 flex flex-col gap-6"
        onSubmit={handleSubmit((submit) => {})}
      >
        <Button variant="outline" size="icon" onClick={() => handlePrev()}>
          <ChevronLeft />
        </Button>

        <div>
          <h3 className="text-2xl font-semibold">Create a strong password</h3>
          <p className="text-[#71717A]">
            Create a strong password with letters, numbers.
          </p>
        </div>
        <div className="passwordBox flex flex-col gap-4">
          <div className="w-full h-9 px-3 py-2 border-[1px] border-[#E4E4E7] rounded-md">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="h-5 flex items-center text-[14px] w-full border-none"
              {...register("password")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-full h-9 px-3 py-2 border-[1px] border-[#E4E4E7] rounded-md">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm"
                className="h-5 flex items-center text-[14px] w-full border-none"
                {...register("confirmPassword")}
              />
            </div>
            {formState.errors.password && (
              <div className="text-[#E14942] text-[14px]">
                {formState.errors.password.message}
              </div>
            )}
            {formState.errors.confirmPassword && (
              <div className="text-[#E14942] text-[14px]">
                {formState.errors.confirmPassword.message}
              </div>
            )}
          </div>

          <div className="flex h-[16px] items-center gap-2">
            <label
              htmlFor="showPassword"
              className="text-sm text-[#71717A] flex items-center h-full"
            >
              <input
                type="checkbox"
                id="showPassword"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setShowPassword(e.target.checked)
                }
                className="size-[16px]"
              />
            </label>
            <p> Show password</p>
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
