"use client";

import { HEADER_NAV } from "@/lib/constants/header-nav.constant";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/tailwind-merge";
import { useTranslations } from "next-intl";

type HeaderNavigationProps = {
  onNavigate?: () => void;
};

export default function HeaderNavigation({ onNavigate }: HeaderNavigationProps) {
  const pathname = usePathname();
  const t = useTranslations("navigation");

  const pathnameWithoutLocale = pathname.replace(/^\/(en|ar)/, "") || "/";

  return (
    <nav className="block sm:flex items-center justify-center md:gap-4">
      {HEADER_NAV.map((item) => {
        const isActive = pathnameWithoutLocale === item.href;

        return (
          <Link
            href={item.href}
            key={item.labelKey}
            onClick={() => onNavigate?.()}
            className={cn(
              "flex items-center gap-2 p-4 sm:p-2 md:p-3 text-black dark:text-zinc-50 sm:text-zinc-50 dark:sm:text-zinc-800",
              isActive &&
                "text-maroon-800 sm:text-softPink-200 sm:border-b-2 sm:border-softPink-200 dark:text-primary dark:sm:text-maroon-800 dark:sm:border-maroon-800"
            )}
          >
            {item.icon && <item.icon className="w-5 h-5" />}
            {t(item.labelKey)}
          </Link>
        );
      })}
    </nav>
  );
}
