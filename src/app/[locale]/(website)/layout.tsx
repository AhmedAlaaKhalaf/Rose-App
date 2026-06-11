import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";

type LocaleProps = {
  children: React.ReactNode;
};

export default function LocaleLayout({ children }: LocaleProps) {
  return (
    <div className="max-w-screen overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Children */}
      <div className="mx-auto px-4 pt-5 lg:pt-16 container">{children}</div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
