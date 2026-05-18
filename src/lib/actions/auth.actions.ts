"use server";
import { VerifyOtpFields } from "@/lib/types/auth-types/forgot-password";
import { EmailStepField, EmailStepResponse, NewPasswordResponse } from "../types/auth";

// verify otp
export async function verifyOtp(data: VerifyOtpFields) {
  const res = await fetch(`${process.env.API}/auth/confirm-email-verification`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const payload = await res.json();

  return payload;
}

export async function sendOTPAction(fields: EmailStepField) {
  const response = await fetch(`${process.env.API}/auth/send-email-verification`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload: ApiResponse<EmailStepResponse> = await response.json();

  return payload;
}

export async function newPasswordAction(fields: {
  email: string;
  newPassword: string;
  token?: string;
  confirmPassword?: string;
}) {
  const response = await fetch(`${process.env.API}/auth/reset-password`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload: ApiResponse<NewPasswordResponse> = await response.json();

  return payload;
}
