"use server";

import {
  ConfirmEmailFields,
  EmailStepField,
  EmailStepResponse,
  NewPasswordResponse,
  ResetPasswordFields,
} from "../types/auth";

// Step 1 (Register): Send a 6-digit OTP to the user's email
export async function sendEmailVerificationAction(fields: EmailStepField) {
  const response = await fetch(`${process.env.API}/auth/send-email-verification`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: { "Content-Type": "application/json" },
  });

  const payload: ApiResponse<EmailStepResponse> = await response.json();
  return payload;
}

// Step 2 (Register): Confirm the OTP — marks the email as verified
export async function confirmEmailVerificationAction(fields: ConfirmEmailFields) {
  const res = await fetch(`${process.env.API}/auth/confirm-email-verification`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(fields),
  });

  const payload: ApiResponse<EmailStepResponse> = await res.json();
  return payload;
}

// Forgot Password: Request a reset email (contains the reset token/code)
export async function forgotPasswordAction(fields: EmailStepField) {
  const response = await fetch(`${process.env.API}/auth/forgot-password`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: { "Content-Type": "application/json" },
  });

  const payload: ApiResponse<EmailStepResponse> = await response.json();
  return payload;
}

// Reset Password: Use the token from the email to set a new password
export async function resetPasswordAction(fields: ResetPasswordFields) {
  const response = await fetch(`${process.env.API}/auth/reset-password`, {
    method: "POST",
    body: JSON.stringify({
      token: fields.token,
      newPassword: fields.newPassword,
      confirmPassword: fields.confirmPassword,
    }),
    headers: { "Content-Type": "application/json" },
  });

  const payload: ApiResponse<NewPasswordResponse> = await response.json();
  return payload;
}
