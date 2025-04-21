"use client";

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
    <div className="lg:w-[1440px] m-auto relative">
      {step === 0 && <Login handleNext={handleNext} />}
      {step === 1 && <ForgotPass handlePrev={handlePrev} />}
    </div>
  );
}
