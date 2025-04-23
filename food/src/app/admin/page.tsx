"use client";

import { useState } from "react";
import { Menu } from "./_components/Menu";
import { Orders } from "./_components/Orders";
import { Settings } from "./_components/Settings";

export default function Home() {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };
  return (
    <div className="lg:w-[1440px] m-auto relative ">
      {step === 0 && <Orders />}
      <Menu />
      <Settings />
    </div>
  );
}
