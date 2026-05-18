"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { SearchIcon, X } from "lucide-react";
import { useDebounce } from "@/hooks/search/use-debounce";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";

export default function DashboardProductSearch() {
  // Translations
  const t = useTranslations("dashboard.products");

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
  const router = useRouter();
  const searchParams = useSearchParams();

  // Effects
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debounceSearchTrim) {
      params.set("keyword", debounceSearchTrim);
    } else {
      params.delete("keyword");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [debounceSearchTrim, router, searchParams]);

  return (
    <div className="relative bg-white p-0 rounded-lg w-full">
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
                    placeholder={t("search-placeholder")}
                    className="ps-7 placeholder:ps-1 w-full"
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
    </div>
  );
}
