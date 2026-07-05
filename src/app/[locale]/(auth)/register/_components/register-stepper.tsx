"use client";

import { useState } from "react";
import RegisterEmailStep from "./register-email-step";
import RegisterForm from "./register-form";
import RegisterOtpStep from "./register-otp-step";

type Step = "email" | "otp" | "form";

export default function RegisterStepper() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState<string>("");
  const [emailVerified, setEmailVerified] = useState(false);

  return (
    <div className="flex flex-col w-full">
      {step === "email" && (
        <RegisterEmailStep email={email} setEmail={setEmail} onNext={() => setStep("otp")} />
      )}

      {step === "otp" && (
        <RegisterOtpStep
          email={email}
          onNext={() => {
            setEmailVerified(true);
            setStep("form");
          }}
          onBack={() => setStep("email")}
        />
      )}

      {step === "form" && emailVerified && (
        <RegisterForm email={email} emailVerified={emailVerified} />
      )}
    </div>
  );
}
