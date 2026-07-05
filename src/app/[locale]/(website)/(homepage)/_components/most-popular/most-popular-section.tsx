import OccasionsFilterLinks from "./occasions-filter-links";
import MostPopularProductsList from "./most-popular-products-list";
import { SectionHead } from "@/components/ui/section-header";
import { getOccasions } from "@/lib/services/occasion.service";
import { Suspense } from "react";
import ProductListSkeleton from "@/components/skeletons/shared/product-list.skeleton";
import { SearchParams } from "@/lib/types/global";
import OccasionsFilterSkeleton from "@/components/skeletons/most-popular/occasions-filter.skeleton";
import { getTranslations } from "next-intl/server";

type MostPopularSectionProps = {
  searchParams: SearchParams;
};

export default async function MostPopularSection({ searchParams }: MostPopularSectionProps) {
  const t = await getTranslations("most-popular");

  const {
    payload: { data: occasions },
  } = await getOccasions();

  const defaultOccasionId = occasions[0]?.id;
  const selectedOccasionId = String(searchParams?.occasionId ?? defaultOccasionId ?? "");

  return (
    <section className="flex flex-col gap-10 w-full">
      <header className="flex justify-between items-center">
        <SectionHead size={"sm"} className="ltr:capitalize">
          {t("heading")}
        </SectionHead>

        <Suspense fallback={<OccasionsFilterSkeleton />}>
          <OccasionsFilterLinks
            occasions={occasions}
            selectedOccasionId={selectedOccasionId}
          />
        </Suspense>
      </header>

      <Suspense fallback={<ProductListSkeleton />} key={selectedOccasionId}>
        <MostPopularProductsList occasionId={selectedOccasionId || undefined} />
      </Suspense>
    </section>
  );
}
