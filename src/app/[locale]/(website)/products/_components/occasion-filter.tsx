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
const OCCASION_PARAM = "occasion";

export default function OccasionFilter() {
  // Translations
  const t = useTranslations("Products");

  // Hooks
  const {
    isPending,
    data: payload,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useOccasions();
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
      router.replace(query ? `${pathname}?${query}` : pathname);
    },
    [pathname, router, searchParams]
  );

  const handleToggle = useCallback(
    (id: string) => {
      const current = new Set(searchParams.getAll(OCCASION_PARAM));
      if (current.has(id)) current.delete(id);
      else current.add(id);
      setOccasionParams(current);
    },
    [searchParams, setOccasionParams]
  );

  const handleClear = useCallback(() => {
    setOccasionParams(new Set());
  }, [setOccasionParams]);

  if (error) return <ErrorBoundary onRetry={refetch} error={error} />;
  if (isPending) return <OccasionFilterSkeleton />;

  // Data variables
  const imageBaseUrl = "https://flower.elevateegy.com/uploads/";
  const occasions = payload?.pages.flatMap((page) => page.occasions) ?? [];

  return (
    <section className="border-b border-zinc-100 dark:border-zinc-700 pb-5">
      <div className="flex justify-between items-center">
        {/* filter title */}
        <h3 className="text-zinc-800 dark:text-zinc-50 font-medium text-lg ps-[5px]">
          {t("occasion")}
        </h3>
        {hasActiveOccasion && <ClearButton onClick={handleClear} label={t("reset")} />}
      </div>
      {/* Occasions list */}
      <InfiniteScroll
        dataLength={occasions.length}
        next={fetchNextPage}
        hasMore={hasNextPage ?? false}
        loader={
          <div className="w-full py-2 text-center text-sm text-zinc-500">{t("loading-more")}</div>
        }
        height={260}
        className="hide-scroll flex flex-wrap justify-between overflow-x-hidden overscroll-contain"
      >
        {occasions.map((occasion) => {
          const isActive = activeOccasionIds.has(occasion._id);
          return (
            <div
              key={occasion._id}
              className={cn(
                "group w-1/2 cursor-pointer overflow-hidden pt-[10px] ps-[5px] pe-[5px] pb-[5px] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isActive && "active"
              )}
              role="button"
              tabIndex={0}
              onClick={() => handleToggle(occasion._id)}
              onKeyDown={(e) => e.key === "Enter" && handleToggle(occasion._id)}
            >
              <div className="relative rounded-lg">
                <Image
                  src={`${imageBaseUrl}${occasion.image}`}
                  alt={occasion.name}
                  width={133}
                  height={74}
                  sizes="133px"
                  className="h-[74px] w-full object-cover rounded-lg"
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
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-50 font-medium text-center text-nowrap">
                  {occasion.name}
                </p>
              </div>
            </div>
          );
        })}
      </InfiniteScroll>
    </section>
  );
}
