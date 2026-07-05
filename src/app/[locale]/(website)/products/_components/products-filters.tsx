"use client";

import ErrorBoundary from "@/components/shared/error-boundary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getOccasions } from "@/lib/apis/occasions.api";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import ClearButton from "./clear-button";

const OCCASION_PARAM = "occasionId";
const ALL_OCCASIONS = "all";

export default function ProductsFilters() {
  const t = useTranslations("Products");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeOccasionId = searchParams.get(OCCASION_PARAM) ?? undefined;
  const minPrice = searchParams.get("minPrice") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";

  const [priceOpen, setPriceOpen] = useState(false);
  const [draftMin, setDraftMin] = useState(minPrice);
  const [draftMax, setDraftMax] = useState(maxPrice);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["occasions-filter"],
    queryFn: () => getOccasions({ limit: 50 }),
  });

  const occasions = data?.occasions ?? [];

  const hasActiveFilters = Boolean(activeOccasionId || minPrice || maxPrice);

  const priceLabel = useMemo(() => {
    if (minPrice && maxPrice) return `${minPrice} – ${maxPrice}`;
    if (minPrice) return `${t("from")} ${minPrice}`;
    if (maxPrice) return `${t("to")} ${maxPrice}`;
    return t("select-price");
  }, [maxPrice, minPrice, t]);

  const replaceParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        params.delete(key);
        if (value) params.set(key, value);
      });

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const handleOccasionChange = (value: string) => {
    replaceParams({ occasionId: value === ALL_OCCASIONS ? undefined : value });
  };

  const handleApplyPrice = () => {
    replaceParams({
      minPrice: draftMin.trim() || undefined,
      maxPrice: draftMax.trim() || undefined,
    });
    setPriceOpen(false);
  };

  const handleClearAll = () => {
    setDraftMin("");
    setDraftMax("");
    replaceParams({
      occasionId: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    });
  };

  const handlePriceOpenChange = (open: boolean) => {
    if (open) {
      setDraftMin(minPrice);
      setDraftMax(maxPrice);
    }
    setPriceOpen(open);
  };

  if (error) return <ErrorBoundary onRetry={refetch} error={error} />;

  return (
    <section className="space-y-3 mb-6">
      <div className="flex items-center gap-2 font-medium text-zinc-700 dark:text-zinc-200 text-sm">
        <SlidersHorizontal className="size-4" />
        {t("filters")}
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
        <Select
          value={activeOccasionId ?? ALL_OCCASIONS}
          onValueChange={handleOccasionChange}
          disabled={isLoading}
        >
          <SelectTrigger className="bg-white dark:bg-zinc-900 w-full sm:w-[min(100%,280px)]">
            <SelectValue placeholder={t("select-occasion")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_OCCASIONS}>{t("all-occasions")}</SelectItem>
            {occasions.map((occasion) => (
              <SelectItem key={occasion.id} value={occasion.id}>
                {occasion.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover open={priceOpen} onOpenChange={handlePriceOpenChange}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="justify-between bg-white dark:bg-zinc-900 px-3 border-zinc-300 dark:border-zinc-600 w-full sm:w-[min(100%,280px)] h-12 font-normal"
            >
              <span className="truncate">{priceLabel}</span>
              <ChevronDown className="opacity-50 size-4 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="space-y-4 w-[min(100vw-2rem,20rem)]">
            <p className="font-medium text-sm">{t("price")}</p>
            <div className="gap-3 grid grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="filter-min-price" className="lowercase">
                  {t("from")}
                </Label>
                <Input
                  id="filter-min-price"
                  type="number"
                  min={0}
                  placeholder="0"
                  value={draftMin}
                  onChange={(event) => setDraftMin(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="filter-max-price" className="lowercase">
                  {t("to")}
                </Label>
                <Input
                  id="filter-max-price"
                  type="number"
                  min={0}
                  placeholder="1000000"
                  value={draftMax}
                  onChange={(event) => setDraftMax(event.target.value)}
                />
              </div>
            </div>
            <Button type="button" className="w-full" onClick={handleApplyPrice}>
              {t("apply")}
            </Button>
          </PopoverContent>
        </Popover>

        {hasActiveFilters && (
          <ClearButton onClick={handleClearAll} label={t("clear-filters")} className="self-start" />
        )}
      </div>
    </section>
  );
}
