import { TOccasion } from "@/lib/types/occasion";
import CrudButtons from "./crud-buttons";
import { useFormatter, useTranslations } from "next-intl";

export default function OccasionList({ occasion }: { occasion: TOccasion }) {
  // Translations
  const t = useTranslations("db-occasions");
  const format = useFormatter();

  return (
    <tr key={occasion._id} className="hover:bg-maroon-50 transition">
      <td className="px-6 py-4 font-semibold whitespace-nowrap">{occasion.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {format.number(occasion.productsCount, "numbers-only")} {t("products-QTY")}
      </td>
      <CrudButtons id={occasion._id} />
    </tr>
  );
}
