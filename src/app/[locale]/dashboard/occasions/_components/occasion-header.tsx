import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function OccasionHead() {
  // Translations
  const t = useTranslations("db-occasions");

  return (
    <div className="flex justify-between items-center">
      <h1 className="font-semibold text-zinc-800 text-2xl">{t("occasions-overview-title")}</h1>
      <Button>
        <Link href="/dashboard/occasions/add-occasion" className="flex items-center gap-2">
          <PlusIcon /> {t("occasions-overview-head-button")}
        </Link>
      </Button>
    </div>
  );
}
