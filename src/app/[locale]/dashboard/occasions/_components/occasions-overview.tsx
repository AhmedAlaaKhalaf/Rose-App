"use client";

import { CustomPagination } from "@/components/shared/custom-pagination";
import OccasionHead from "./occasion-header";
import DbSearch from "./db-search";
import OccasionList from "./occasions-list";
import { useState } from "react";
import OccasionListSkeleton from "../../_skeletons/table-list.skeleton";
import useGetOccasions from "../_Hooks/use-get-occasions";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
// import { useDebounce } from "@/hooks/search/use-debounce";
// import { useQuery } from "@tanstack/react-query";

export default function Occasions() {
  // Translations
  const t = useTranslations("db-occasions");

  // States
  const [pageNumber, setPageNumber] = useState(1);

  // Hooks
  // All commented code for search but the endpoint not supported the search tech.

  // const { data: searchTerm = "" } = useQuery({
  //   queryKey: ["occasionsSearchTerm"],
  //   queryFn: () => "",
  //   initialData: "",
  //   staleTime: Infinity,
  // });

  // const debounceSearchTirm = useDebounce(searchTerm, 200);

  const { data, error, isLoading, refetch } = useGetOccasions(pageNumber);

  // const { data, error, isLoading, refetch } = useGetOccasions({
  //   page: pageNumber,
  //   keyword: debounceSearchTirm,
  // });

  // Variables
  const occasions = data?.pages.flatMap((page) => page.occasions) ?? [];
  const totalPages = data?.pages?.[0]?.metadata?.totalPages ?? 1;

  // Functions
  const handlePage = (page: number) => {
    setPageNumber(page);
  };

  return (
    <>
      <div className="space-y-4 bg-white p-5 pb-3 rounded-lg">
        {/* Section Head */}
        <OccasionHead />

        {/* Search Input */}
        <DbSearch />

        {/* Display Data In Table */}
        <table className="border rounded-lg divide-y divide-zinc-200 min-w-full overflow-hidden">
          <thead className="bg-zinc-50 font-medium text-[0.82rem] text-zinc-900">
            <tr>
              <th scope="col" className="px-6 py-3 w-56 text-start">
                {t("occasion-name")}
              </th>
              <th scope="col" className="px-6 py-3 text-start">
                {t("table-head-QTY")}
              </th>
              <th scope="col" className="sr-only px-6 py-3 text-end">
                Actions
              </th>
            </tr>
          </thead>
          {error ? (
            <p className="flex flex-col justify-center items-center w-full min-h-96 font-bold text-maroon-500 text-lg">
              {error?.message}{" "}
              <Button
                variant="outline"
                type="button"
                className="bg-transparent hover:bg-transparent text-maroon-500 text-sm"
                onClick={() => refetch()}
              >
                Try again
              </Button>
            </p>
          ) : (
            <tbody className="bg-white divide-y divide-zinc-200 text-zinc-800 text-sm">
              {isLoading
                ? Array.from({ length: 6 }).map((_, idx) => <OccasionListSkeleton key={idx} />)
                : occasions.map((occasion) => (
                    <OccasionList occasion={occasion} key={occasion._id} />
                  ))}
            </tbody>
          )}
        </table>
      </div>

      {/* Pagination */}
      <CustomPagination
        currentPage={pageNumber}
        totalPages={totalPages}
        onPageChange={handlePage}
      />
    </>
  );
}
