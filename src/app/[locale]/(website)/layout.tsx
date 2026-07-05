import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";

type LocaleProps = {
  children: React.ReactNode;
};

export default function LocaleLayout({ children }: LocaleProps) {
  return (
    <div className="max-w-screen overflow-x-hidden">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
