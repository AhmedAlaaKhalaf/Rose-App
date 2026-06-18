import { routing } from "@/i18n/routing";
import Image from "next/image";
import layoutCover from "../../../../public/assets/images/auth-layout-cover.png";
import LanguageSwitcher from "@/components/ui/language-switcher";
import AuthLayoutSeparator from "./_components/auth-layout-separator";

type AuthProps = {
  children: React.ReactNode;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function AuthLayout({ children }: AuthProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 dark:bg-zinc-800 h-screen overflow-y-hidden">
      {/* Body */}
      <section className="flex flex-col gap-10 m-auto w-[70%]">
        {/* Header  */}
        <LanguageSwitcher />

        {/* Content  */}
        <div className="flex flex-col gap-5">
          <AuthLayoutSeparator />
          {children}
          <AuthLayoutSeparator flip />
        </div>
      </section>

      {/* Cover */}
      <section className="hidden md:block relative">
        <Image src={layoutCover} fill priority sizes="auto" alt="Authentication layout cover" />
      </section>
    </div>
  );
}
