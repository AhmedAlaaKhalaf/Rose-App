import UpdateOccasionForm from "./_components/update-occasion-form";
import { getOccasionData } from "../_services/get-occasion";
import { getTranslations } from "next-intl/server";

type PageParams = {
  params: {
    occasionId: string;
  };
};

export default async function Page({ params: { occasionId } }: PageParams) {
  // Translation
  const t = await getTranslations("db-occasions");

  // Fetch Occasion Data
  const occasionDetails = await getOccasionData(occasionId);

  return (
    <section className="space-y-4 px-5 w-full">
      <h1 className="font-semibold text-zinc-800 text-2xl">
        {t("update-page-head")} {occasionDetails.occasion.name}
      </h1>

      <UpdateOccasionForm occasionData={occasionDetails} />
    </section>
  );
}
