"use client";

import { StepProvider } from "../StepProvider";

import { useState } from "react";
import { ForgotPass } from "./_components/ForgotPass";
import { Login } from "./_components/Login";
import { AuthProvider } from "@/app/_providers/AuthProvider";

export default function Home() {
  const [step, setStep] = useState(0);

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <StepProvider>
      <AuthProvider>
        <div className="lg:w-[1440px] m-auto relative">
          {step === 0 && <Login handlePrev={handlePrev} />}
          {step === 1 && <ForgotPass handlePrev={handlePrev} />}
        </div>
      </AuthProvider>
    </StepProvider>
  );
}
