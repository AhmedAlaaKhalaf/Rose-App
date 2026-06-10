import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RegisterTranslation = (key: string, values?: Record<string, any>) => string;

export type Translation = Awaited<ReturnType<typeof getTranslations>>;

export type SearchParams = Record<string, string | string[] | undefined>;

export type TLocale = typeof routing.defaultLocale;