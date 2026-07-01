"use client";

import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import ClearButton from "./clear-button";
import { useQueryParams } from "../_hooks/categories/use-query-params";

export default function RatingFilter() {
  // Translations
  const t = useTranslations("products");
  //hooks
  const { QueryParams, toggleQueryParams, clearQueryParams } = useQueryParams("minRating");

  return (
    <section className="space-y-2.5 px-1 pt-2.5 pb-5 w-full">
      {/* head of components */}
      <div aria-labelledby="Rating-title" className="flex justify-between items-center">
        {/* title */}
        <h2 id="Rating-title" className="font-inter font-semibold text-zinc-800 text-lg">
          {t("rating")}
        </h2>

        {/* reset rating */}
        {QueryParams && QueryParams.length > 0 && (
          <ClearButton onClick={clearQueryParams} label={t("reset")} />
        )}
      </div>

      {/* list of stars */}
      <ul className="flex gap-2 text-yellow-500">
        {Array.from({ length: 5 }).map((_, index) => (
          <li
            onClick={() => toggleQueryParams(String(index + 1))}
            className={`cursor-pointer `}
            key={index}
          >
            <Star
              className={` ${Number(QueryParams) >= index + 1 ? "fill-yellow-500" : ""} text-yellow-500  `}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
