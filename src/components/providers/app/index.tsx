import { NextIntlClientProvider } from "next-intl";
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
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </ReactQueryProvider>
    </NextAuthProvider>
  );
}
