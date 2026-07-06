type RawRecord = Record<string, unknown>;

function asRecord(value: unknown): RawRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as RawRecord) : {};
}

function readString(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  return undefined;
}

export function normalizePaymentIntentResponse(raw: unknown, orderId: string) {
  const response = asRecord(raw);
  const payload = asRecord(response.payload);
  const data = asRecord(payload.data ?? payload);

  const checkoutUrl = readString(
    data.checkoutUrl,
    data.checkoutSessionUrl,
    data.paymentUrl,
    data.url,
    asRecord(data.session).url,
    payload.checkoutUrl,
    payload.checkoutSessionUrl,
    payload.paymentUrl,
    payload.url,
    asRecord(payload.session).url
  );

  const clientSecret = readString(data.clientSecret, data.client_secret, payload.clientSecret);
  const publishableKey = readString(
    data.publishableKey,
    data.publishable_key,
    data.stripePublishableKey,
    payload.publishableKey,
    payload.publishable_key,
    payload.stripePublishableKey
  );
  const paymentIntentId = readString(
    data.paymentIntentId,
    data.paymentIntent,
    payload.paymentIntentId,
    payload.paymentIntent
  );

  return {
    orderId,
    checkoutUrl,
    clientSecret,
    publishableKey,
    paymentIntentId,
    message: String(response.message ?? payload.message ?? ""),
  };
}
