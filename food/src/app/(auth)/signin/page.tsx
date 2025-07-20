"use client";

import { StepProvider } from "../StepProvider";
import { Login } from "./_components/Login";
import { AuthProvider } from "@/app/_providers/AuthProvider";

export default function Home() {
  return (
    <StepProvider>
      <AuthProvider>
        <div className="lg:w-[1440px] m-auto relative">
          <Login />
        </div>
      </AuthProvider>
    </StepProvider>
  );
}
