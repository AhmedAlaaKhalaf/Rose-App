"use client";

import { useState } from "react";
import EmailStep from "./af-task/email-step";
import NewPasswordStep from "./af-task/new-password-step";
import OtpStep from "./otp-step";

export default function ForgotPasswordForm() {
  const [step, setStep] = useState<"email" | "otp" | "new-password">("email");
  const [email, setEmail] = useState<string>("");

  return (
    <div className="flex flex-col px-6 w-full max-w-md">
      {/* email step */}
      {step === "email" && (
        <EmailStep email={email} setEmail={setEmail} onNext={() => setStep("otp")} />
      )}

      {/* otp step */}
      {step === "otp" && (
        <OtpStep
          email={email}
          onNext={() => setStep("new-password")}
          onBack={() => setStep("email")}
        />
      )}

      {/* new password step */}
      {step === "new-password" && <NewPasswordStep email={email} />}
    </div>
  );
}
