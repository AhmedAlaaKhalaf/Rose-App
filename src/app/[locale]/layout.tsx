import Providers from "@/components/providers";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import localFont from "next/font/local";

type LocaleProps = {
  children: React.ReactNode;
  params: { locale: string };
};

// English Font variants
const sarabun = localFont({
  src: [
    { path: "../../../public/fonts/Sarabun-Regular.ttf", weight: "400" },
    { path: "../../../public/fonts/Sarabun-Medium.ttf", weight: "500" },
    { path: "../../../public/fonts/Sarabun-SemiBold.ttf", weight: "600" },
    { path: "../../../public/fonts/Sarabun-Bold.ttf", weight: "700" },
  ],
  variable: "--font-sarabun",
  display: "swap",
});

// Arabic Font variants
const tajawal = localFont({
  src: [
    { path: "../../../public/fonts/Tajawal-Regular.ttf", weight: "400" },
    { path: "../../../public/fonts/Tajawal-Medium.ttf", weight: "500" },
    { path: "../../../public/fonts/Tajawal-Bold.ttf", weight: "700" },
    { path: "../../../public/fonts/Tajawal-ExtraBold.ttf", weight: "800" },
  ],
  variable: "--font-tajawal",
  display: "swap",
});

// Label fonts
const inter = localFont({
  src: "../../../public/fonts/Inter-VariableFont.ttf",
  variable: "--font-inter",
  weight: "300 400 500 600 700 800 900",
});

export async function generateMetadata({ params: { locale } }: Pick<LocaleProps, "params">) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("app-title"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({ children, params: { locale } }: LocaleProps) {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${sarabun.variable} ${tajawal.variable} ${inter.variable} antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
