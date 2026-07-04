"use client";

import ErrorBoundary from "@/components/shared/error-boundary";
import useOccasions from "@/hooks/shared/use-occasions";
import OccasionFilterSkeleton from "@/components/skeletons/shared/occasion-filter.skeleton";
import Image from "next/image";
import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/tailwind-merge";
import ClearButton from "./clear-button";
import InfiniteScroll from "react-infinite-scroll-component";

const OCCASION_OVERLAY_GRADIENT =
  "linear-gradient(180deg, rgba(0, 0, 0, 0.1375) 0%, rgba(166, 37, 42, 0.55) 100%)";
const OCCASION_PARAM = "occasionId";

export default function OccasionFilter() {
  // Translations
  const t = useTranslations("products");

  // Hooks
  const { isPending, error, refetch, fetchNextPage, hasNextPage, data } = useOccasions();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeOccasionIds = new Set(searchParams.getAll(OCCASION_PARAM));
  const hasActiveOccasion = activeOccasionIds.size > 0;

  const setOccasionParams = useCallback(
    (ids: Set<string>) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(OCCASION_PARAM);
      ids.forEach((id) => params.append(OCCASION_PARAM, id));
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams]
  );

  const handleToggle = useCallback(
    (id: string) => {
      const current = new Set(searchParams.getAll(OCCASION_PARAM));
      if (current.has(id)) current.delete(id);
      else {
        current.clear();
        current.add(id);
      }
      setOccasionParams(current);
    },
    [searchParams, setOccasionParams]
  );

  const handleClear = useCallback(() => {
    setOccasionParams(new Set());
  }, [setOccasionParams]);

  if (error) return <ErrorBoundary onRetry={refetch} error={error} />;

  if (isPending) return <OccasionFilterSkeleton />;

  const occasions = data?.pages.flatMap((page) => page.payload.data) ?? [];

  return (
    <section className="pb-5 border-zinc-100 dark:border-zinc-700 border-b">
      <div className="flex justify-between items-center">
        {/* filter title */}
        <h3 className="ps-[5px] font-medium text-zinc-800 dark:text-zinc-50 text-lg">
          {t("occasion")}
        </h3>
        {hasActiveOccasion && <ClearButton onClick={handleClear} label={t("reset")} />}
      </div>
      {/* Occasions list */}
      <InfiniteScroll
        dataLength={occasions?.length}
        next={fetchNextPage}
        hasMore={hasNextPage ?? false}
        loader={
          <div className="py-2 w-full text-zinc-500 text-sm text-center">{t("loading-more")}</div>
        }
        height={260}
        className="flex flex-wrap justify-between overflow-x-hidden overscroll-contain hide-scroll"
      >
        {occasions?.map((occasion) => {
          const isActive = activeOccasionIds.has(occasion.id);
          return (
            <div
              key={occasion.id}
              className={cn(
                "group ps-[5px] pe-[5px] pt-[10px] pb-[5px] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 w-1/2 overflow-hidden cursor-pointer",
                isActive && "active"
              )}
              role="button"
              tabIndex={0}
              onClick={() => handleToggle(occasion.id)}
              onKeyDown={(e) => e.key === "Enter" && handleToggle(occasion.id)}
            >
              <div className="relative rounded-lg">
                <Image
                  src={occasion.image}
                  alt={occasion.title}
                  width={153}
                  height={74}
                  sizes="auto"
                  priority
                  className="rounded-lg object-cover"
                />
                <div
                  className={cn(
                    "absolute inset-0 rounded-lg transition-colors",
                    !isActive &&
                      "bg-black/50 group-hover:bg-gradient-to-b group-hover:from-black/25 group-hover:to-black/50"
                  )}
                  style={isActive ? { background: OCCASION_OVERLAY_GRADIENT } : undefined}
                  aria-hidden
                />
                <p className="top-1/2 left-1/2 absolute font-medium text-zinc-50 text-center text-nowrap -translate-x-1/2 -translate-y-1/2">
                  {occasion.title}
                </p>
              </div>
            </div>
          );
        })}
      </InfiniteScroll>
    </section>
  );
}
