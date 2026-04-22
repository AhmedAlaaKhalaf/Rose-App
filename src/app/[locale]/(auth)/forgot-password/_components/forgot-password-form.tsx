"use client";

import { useState } from "react";
import EmailStep from "./af-task/email-step";
import NewPasswordStep from "./af-task/new-password-step";
import OtpStep from "./otp-step";

export default function ForgotPasswordForm() {
  const [step, setStep] = useState<"email" | "otp" | "new-password">("email");
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");

  return (
    <div className="flex flex-col px-6 w-full">
      {/* email step — request reset email */}
      {step === "email" && (
        <EmailStep email={email} setEmail={setEmail} onNext={() => setStep("otp")} />
      )}

      {/* otp step — collect token from email */}
      {step === "otp" && (
        <OtpStep
          email={email}
          onTokenSubmit={(value) => {
            setToken(value);
            setStep("new-password");
          }}
          onBack={() => setStep("email")}
        />
      )}

      {/* new password step — reset using token */}
      {step === "new-password" && <NewPasswordStep token={token} />}
    </div>
  );
}
