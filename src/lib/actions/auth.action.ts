"use server";

import { RegisterFormFields, RegisterResponse } from "../types/auth";

export async function registerAction(fields: RegisterFormFields) {
  const body: Record<string, string> = {
    username: fields.username,
    firstName: fields.firstName,
    lastName: fields.lastName,
    email: fields.email,
    password: fields.password,
    confirmPassword: fields.confirmPassword,
  };

  if (fields.gender) body.gender = fields.gender;
  if (fields.phone) body.phone = fields.phone;

  const response = await fetch(`${process.env.API}/auth/register`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload: ApiResponse<RegisterResponse> = await response.json();

  return payload;
}
