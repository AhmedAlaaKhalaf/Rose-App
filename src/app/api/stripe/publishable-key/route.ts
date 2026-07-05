import { NextResponse } from "next/server";

function readStripePublishableKey() {
  return (
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() ||
    process.env.STRIPE_PUBLISHABLE_KEY?.trim() ||
    process.env.STRIPE_PUBLIC_KEY?.trim() ||
    ""
  );
}

export async function GET() {
  const publishableKey = readStripePublishableKey();

  if (!publishableKey) {
    return NextResponse.json({ publishableKey: null }, { status: 404 });
  }

  return NextResponse.json({ publishableKey });
}
