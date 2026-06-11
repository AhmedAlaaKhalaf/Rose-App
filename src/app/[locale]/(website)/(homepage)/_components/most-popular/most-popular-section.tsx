import OccasionsFilterLinks from "./occasions-filter-links";
import { SectionHead } from "@/components/ui/section-header";
import { getOccasions } from "@/lib/services/occasion.service";
import { Suspense } from "react";
import ProductsList from "@/components/shared/products-list";
import ProductListSkeleton from "@/components/skeletons/shared/product-list.skeleton";
import { SearchParams } from "@/lib/types/global";
import OccasionsFilterSkeleton from "@/components/skeletons/most-popular/occasions-filter.skeleton";
import { getTranslations } from "next-intl/server";

type MostPopularSectionProps = {
  searchParams: SearchParams;
};

export default async function MostPopularSection({ searchParams }: MostPopularSectionProps) {
  // Translations
  const t = await getTranslations("most-popular");

  // Services
  const {
    payload: { data: occasions },
  } = await getOccasions();

  return (
    <section className="flex flex-col gap-10 w-full">
      {/* Header */}
      <header className="flex sm:flex-row flex-col justify-between items-center gap-4 sm:gap-0">
        {/* Heading */}
        <SectionHead size={"sm"} className="me-auto ltr:capitalize">
          {t("heading")}
        </SectionHead>

        {/* Occasions Filter */}
        <Suspense fallback={<OccasionsFilterSkeleton />}>
          <OccasionsFilterLinks occasions={occasions} searchParams={searchParams} />
        </Suspense>
      </header>

      {/* Products */}
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductsList
          className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          searchParams={searchParams}
        />
      </Suspense>
    </section>
  );
}
