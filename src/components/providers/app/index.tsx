import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { WishlistProvider } from "@/components/providers/wishlist/wishlist.provider";
import NextAuthProvider from "./components/next-auth.provider";
import ReactQueryProvider from "./components/react-query.provider";

type ProvidersProps = {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, unknown>;
};

export default function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <NextAuthProvider>
      <ReactQueryProvider>
        <WishlistProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <NextIntlClientProvider locale={locale} messages={messages}>
              {children}
            </NextIntlClientProvider>
          </ThemeProvider>
        </WishlistProvider>
      </ReactQueryProvider>
    </NextAuthProvider>
  );
}
