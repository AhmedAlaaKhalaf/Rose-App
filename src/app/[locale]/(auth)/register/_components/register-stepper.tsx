"use client";

import { useState } from "react";
import RegisterEmailStep from "./register-email-step";
import RegisterOtpStep from "./register-otp-step";
import RegisterForm from "./register-form";

type Step = "email" | "otp" | "form";

export default function RegisterStepper() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState<string>("");

  return (
    <div className="flex flex-col w-full">
      {step === "email" && (
        <RegisterEmailStep email={email} setEmail={setEmail} onNext={() => setStep("otp")} />
      )}

      {step === "otp" && (
        <RegisterOtpStep
          email={email}
          onNext={() => setStep("form")}
          onBack={() => setStep("email")}
        />
      )}

      {step === "form" && <RegisterForm email={email} />}
    </div>
  );
}
