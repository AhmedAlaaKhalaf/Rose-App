import { useTranslations } from "next-intl";

export default function LoginNeed() {
  // Translation
  const t = useTranslations("product-reviews");

  return (
    <p className="top-44 z-30 absolute px-4 font-semibold text-zinc-800">{t("login-need")}</p>
  );
}
