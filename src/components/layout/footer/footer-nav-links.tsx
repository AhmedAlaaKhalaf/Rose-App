"use client";

import { FOOTER_NAV } from "@/lib/constants/footer-nav.constant";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function FooterNavLinks() {
  const t = useTranslations("navigation");

  return (
    <ul className="flex flex-col gap-2">
      {FOOTER_NAV.map((item) => (
        <li key={item.labelKey}>
          <Link href={item.href} className="text-zinc-50">
            {t(item.labelKey)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
