import { TAddress, TAddressInput } from "../types/addresses";

type RawRecord = Record<string, unknown>;

function asRecord(value: unknown): RawRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as RawRecord) : {};
}

export function normalizeAddress(raw: RawRecord): TAddress {
  return {
    id: String(raw.id ?? raw._id ?? ""),
    title: String(raw.title ?? "Home"),
    isPrimary: Boolean(raw.isPrimary ?? false),
    city: String(raw.city ?? ""),
    street: String(raw.street ?? ""),
    phone: String(raw.phone ?? ""),
    latitude: Number(raw.latitude ?? raw.lat ?? 0),
    longitude: Number(raw.longitude ?? raw.long ?? 0),
  };
}

export function normalizeAddressesResponse(raw: unknown): { addresses: TAddress[] } {
  const response = asRecord(raw);
  const payload = asRecord(response.payload);

  const rawAddresses = (
    Array.isArray(response.addresses)
      ? response.addresses
      : Array.isArray(payload.addresses)
        ? payload.addresses
        : Array.isArray(payload.data)
          ? payload.data
          : []
  ) as RawRecord[];

  return {
    addresses: rawAddresses.map(normalizeAddress),
  };
}

export function toAddressRequestBody(input: TAddressInput) {
  return {
    title: input.title.trim(),
    city: input.city.trim(),
    street: input.street.trim(),
    phone: input.phone.trim(),
    latitude: input.latitude,
    longitude: input.longitude,
    isPrimary: input.isPrimary ?? false,
  };
}
