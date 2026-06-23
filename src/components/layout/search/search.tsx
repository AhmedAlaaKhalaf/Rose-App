"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import SearchCard from "./search-card";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchResult } from "@/hooks/search/use-search-result";
import SearchCardSkeleton from "@/components/skeletons/search-card-skeleton";
import { fields } from "@/lib/constants/header-nav.constant";
import { Button } from "@/components/ui/button";
import { SearchIcon, X } from "lucide-react";
import { useDebounce } from "@/hooks/search/use-debounce";
import { useProductsYouMayLike } from "@/hooks/product-you-may-like/use-products-you-may-like";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function Search() {
  // Translation
  const t = useTranslations("search-input");

  // State
  const [open, setOpen] = useState(false);

  // Session
  const session = useSession();

  // Refs
  const refSearch = useRef<HTMLDivElement>(null);

  // React hook form
  const form = useForm({
    defaultValues: {
      keyword: "",
    },
  });

  const { watch } = form;

  const searchTrim = watch("keyword");

  // Hooks
  const debounceSearchTrim = useDebounce(searchTrim, 200);

  const { youLike, youLikeError, youLikeLoading } = useProductsYouMayLike({
    status: session.status,
  });

  const { result, error, fetchNextPage, hasNextPage, isFetching, isLoading } = useSearchResult({
    keyword: debounceSearchTrim,
    limit: 6,
    fields: fields,
    open: form.formState.isDirty && !!debounceSearchTrim,
  });

  // Variables
  const productSearch = result?.pages.flatMap((page) => page.products) ?? [];

  // Functions
  const handleCloseClick = (e: MouseEvent) => {
    if (e.target && refSearch.current && !refSearch.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  // Effects
  useEffect(() => {
    document.addEventListener("mousedown", handleCloseClick);

    return () => {
      document.removeEventListener("mousedown", handleCloseClick);
    };
  }, [open]);

  // Return Search input & Modal UI
  return (
    <div className="relative bg-white p-0 rounded-lg w-full" ref={refSearch}>
      {/* Search Input */}
      <Form {...form}>
        <form>
          {/* Input Field */}
          <FormField
            control={form.control}
            name="keyword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder={t("placeholder")}
                    className="ps-7 placeholder:ps-1 focus:rounded-t-3xl focus:rounded-b-none w-full"
                    onFocus={() => {
                      setOpen(true);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* Search Icon */}
          {!form.formState.isDirty && (
            <SearchIcon className="top-4 absolute text-zinc-400 start-2" width={18} height={18} />
          )}

          {/* Clear Button */}
          {form.formState.isDirty && (
            <Button
              variant={"subtle"}
              onClick={() => {
                form.reset();
              }}
              className="top-0.5 absolute bg-transparent hover:bg-none border-none end-0.5"
            >
              <X />
            </Button>
          )}
        </form>
      </Form>

      {/* Search Modal */}
      {open && (
        <div
          className="z-40 absolute bg-white border rounded-b-xl w-full h-[34.6rem] overflow-y-auto hide-scroll"
          id="search-area"
        >
          {/* Error */}
          {(error || youLikeError) && (
            <p>
              {error?.message} || {youLikeError?.message}
            </p>
          )}

          {/* Products you may like */}
          {open && !form.formState.isDirty && (
            <>
              <h1 className="p-2 border-zinc-200 border-b w-full font-semibold text-maroon-700">
                {t("like-head")}
              </h1>
              {youLikeLoading
                ? Array.from({ length: 6 }).map((_, idx) => <SearchCardSkeleton key={idx} />)
                : session.status === "unauthenticated"
                  ? youLike?.data.map((product) => (
                      <SearchCard key={product.id} product={product} setOpen={setOpen} />
                    ))
                  : // : youLike?.recommendations.map((product) => (
                    //     <SearchCard key={product._id} product={product} setOpen={setOpen} />
                    //   ))}
                    youLike?.data.map((product) => (
                      <SearchCard key={product.id} product={product} setOpen={setOpen} />
                    ))}
            </>
          )}

          {/* Filtered search results */}
          {form.formState.isDirty && (
            <InfiniteScroll
              dataLength={productSearch.length}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              scrollableTarget="search-area"
              loader={hasNextPage && isFetching && <SearchCardSkeleton />}
            >
              {isLoading ? (
                Array.from({ length: 6 }).map((_, idx) => <SearchCardSkeleton key={idx} />)
              ) : productSearch.length === 0 ? (
                <p className="w-full font-semibold text-zinc-600 text-lg text-center">
                  No Match found
                </p>
              ) : (
                productSearch.map((product) => (
                  <SearchCard
                    key={product.id}
                    product={product}
                    setOpen={setOpen}
                    searchTerm={searchTrim}
                  />
                ))
              )}
            </InfiniteScroll>
          )}
        </div>
      )}
    </div>
  );
}
