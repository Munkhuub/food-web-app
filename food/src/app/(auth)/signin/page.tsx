"use client";

import { number } from "zod";
import { StepProvider } from "../StepProvider";

import { useState } from "react";
import { ForgotPass } from "./_components/ForgotPass";
import { Login } from "./_components/Login";

export default function Home() {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <StepProvider>
      <div className="lg:w-[1440px] m-auto relative">
        {step === 0 && (
          <Login handlePrev={handlePrev} handleNext={handleNext} />
        )}
        {step === 1 && <ForgotPass handlePrev={handlePrev} />}
      </div>
    </StepProvider>
  );
}
