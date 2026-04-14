import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import { Great_Vibes, Sarabun, Tajawal, Inter } from "next/font/google";
import Providers from "@/components/providers/app";

// Auth layout font
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-greatVibes",
  weight: "400",
});

type LocaleProps = {
  children: React.ReactNode;
  params: { locale: string };
};

// English Font variants
const sarabun = Sarabun({
  subsets: ["latin"],
  variable: "--font-sarabun",
  weight: ["400", "500", "600", "700"],
});
// Arabic Font variants
const tajawal = Tajawal({
  subsets: ["latin"],
  variable: "--font-tajawal",
  weight: ["400", "500", "700", "800"],
});

// Label fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "700", "800", "900"],
});

export async function generateMetadata({ params: { locale } }: Pick<LocaleProps, "params">) {
  // Translations
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("app-title"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }: LocaleProps) {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${sarabun.variable} ${tajawal.variable} ${inter.variable} ${greatVibes.variable} antialiased`}
      >
        <Providers locale={locale} messages={messages}>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
