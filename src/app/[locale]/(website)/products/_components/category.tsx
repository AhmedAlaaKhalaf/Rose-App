"use client";

import CategorySkeleton from "@/components/skeletons/category.skelton";
import Image from "next/image";
import React from "react";
import { useGetCategories } from "../_hooks/categories/use-get-category";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslations } from "next-intl";
import { useQueryParams } from "../_hooks/categories/use-query-params";
import ClearButton from "./clear-button";
import { cn } from "@/lib/utils/tailwind-merge";

export default function Category() {
  // Translations
  const t = useTranslations("products");

  // hooks
  const { data, isPending, fetchNextPage, hasNextPage } = useGetCategories();
  const { QueryParams, toggleQueryParams, clearQueryParams } = useQueryParams("categoryId");

  // Data variables
  const categoriesData = data?.pages.flatMap((page) => page.payload.data) ?? [];
  const isChoseCatogry = (id: string) => QueryParams == id;
  const sorted = categoriesData.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <section className="space-y-2.5 px-1 pt-2.5 pb-5 w-full">
      {/* Category header */}
      <div aria-labelledby="category-filter-title" className="flex justify-between items-center">
        <h2 id="category-filter-title" className="font-inter font-semibold text-zinc-800 text-lg">
          {t("category")}
        </h2>

        {QueryParams && QueryParams.length > 0 && (
          <ClearButton onClick={clearQueryParams} label={t("reset")} />
        )}
      </div>

      {/* CategorySkeleton */}
      {isPending && <CategorySkeleton />}

      {/* Categories lists */}
      {!isPending && (
        <ul role="group" aria-label="Product categories" className="space-y-2.5 overflow-auto">
          {/* InfiniteScroll data */}
          <InfiniteScroll
            dataLength={categoriesData.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={
              <div className="py-2 w-full text-zinc-500 text-sm text-center">
                {t("loading-more")}
              </div>
            }
            className="space-y-2.5 overflow-auto hide-scroll"
            height={260}
          >
            {/* item of categroies */}
            {sorted.map((categoryData) => (
              <li
                onClick={() => {
                  toggleQueryParams(categoryData.id);
                }}
                key={categoryData.id}
                className={cn(
                  "rounded-sm h-9 cursor-pointer",
                  isChoseCatogry(categoryData.id)
                    ? "bg-maroon-50 hover:bg-maroon-100 dark:bg-pink-100 dark:hover:bg-purple-200"
                    : "bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-800"
                )}
              >
                <button
                  type="button"
                  className="flex items-center gap-2.5"
                  role="checkbox"
                  aria-checked={isChoseCatogry(categoryData.id)}
                >
                  {/* category image */}
                  <div
                    className={` ${isChoseCatogry(categoryData.id) ? "bg-maroon-600 dark:bg-pink-300" : "bg-zinc-500"} w-9 h-9 p-2  rounded-s-sm`}
                  >
                    <Image
                      style={{
                        filter:
                          "invert(100%) sepia(3%) saturate(2%) hue-rotate(307deg) brightness(203%) contrast(100%)",
                      }}
                      src={"/assets/category-placeholder.webp"}
                      width={36}
                      height={36}
                      alt={categoryData.title}
                    />
                  </div>
                  {/* category name */}
                  <span className="font-medium text-sm lead">{categoryData.title}</span>
                </button>
              </li>
            ))}
          </InfiniteScroll>
        </ul>
      )}
    </section>
  );
}
