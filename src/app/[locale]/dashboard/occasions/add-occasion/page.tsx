import { useTranslations } from "next-intl";
import AddOccasionForm from "./_components/add-occasion-form";

export default function Page() {
  // Translation
  const t = useTranslations("db-occasions");

  return (
    <section className="space-y-4 px-5 w-full">
      <h1 className="font-semibold text-zinc-800 text-2xl">{t("add-page-head")}</h1>

      <AddOccasionForm />
    </section>
  );
}
