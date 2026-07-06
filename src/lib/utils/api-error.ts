type ApiErrorItem = {
  path?: string;
  message?: string;
  messages?: string[];
};

type RawRecord = Record<string, unknown>;

function asRecord(value: unknown): RawRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as RawRecord) : {};
}

export function formatApiError(payload: unknown, fallback: string) {
  const response = asRecord(payload);
  const errors = response.errors;

  if (Array.isArray(errors) && errors.length > 0) {
    return (errors as ApiErrorItem[])
      .map((error) => {
        if (error.messages?.length) {
          return `${error.path ?? "field"}: ${error.messages.join(", ")}`;
        }

        if (error.message) {
          return error.path ? `${error.path}: ${error.message}` : error.message;
        }

        return "";
      })
      .filter(Boolean)
      .join("; ");
  }

  return String(response.message ?? fallback);
}
