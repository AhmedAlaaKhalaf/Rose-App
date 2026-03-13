"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { SearchIcon, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function DbSearch() {
  // Translation
  const t = useTranslations("db-occasions");

  // React hook form
  const form = useForm({
    defaultValues: {
      keyword: "",
    },
  });

  const { watch } = form;

  const searchTerm = watch("keyword");

  // Hooks
  const queryClient = useQueryClient();

  // Effects
  useEffect(() => {
    queryClient.setQueryData(["occasionsSearchTerm"], searchTerm);
  }, [queryClient, searchTerm]);

  // Return Search input & Modal UI
  return (
    <div className="relative bg-white p-0 w-full">
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
                    className="ps-7 placeholder:ps-1 focus:rounded-t-3xl focus:rounded-b-none w-full"
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
