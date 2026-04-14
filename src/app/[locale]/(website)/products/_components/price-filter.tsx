"use client";

import { Input } from "@/components/ui/input";
import ClearButton from "./clear-button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Form } from "@/components/ui/form";

type FormValues = {
  min?: number;
  max?: number;
};

export default function PriceFilter() {
  // Translations
  const t = useTranslations("Products");

  // Hooks
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Form
  const form = useForm<FormValues>({
    defaultValues: {
      min: Number(searchParams.get("minPrice")) || undefined,
      max: Number(searchParams.get("maxPrice")) || undefined,
    },
  });

  // Form values
  const { register, handleSubmit, reset, watch } = form;
  const minValue = watch("min");
  const maxValue = watch("max");
  const hasPriceFilter = Boolean(minValue || maxValue);

  const updateUrl = (min?: number, max?: number) => {
    const params = new URLSearchParams(searchParams.toString());

    // remove old values first
    params.delete("minPrice");
    params.delete("maxPrice");

    // set new values
    if (min) params.set("minPrice", String(min));
    if (max) params.set("maxPrice", String(max));

    // build query string
    const query = params.toString().replace(/%5B/g, "[").replace(/%5D/g, "]");

    // push to url
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  // Submit handler
  const onSubmit = (data: FormValues) => updateUrl(data.min, data.max);

  // Clear handler
  const clearPrices = () => {
    // reset form
    reset();
    // update url
    updateUrl();
  };

  return (
    <Form {...form}>
      <div
        className="pt-1 pb-5 border-zinc-100 dark:border-zinc-700 border-b"
        onBlur={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          {/* filter title */}
          <h3 className="ps-[5px] font-medium text-zinc-800 dark:text-zinc-50 text-lg">
            {t("price")}
          </h3>
          {hasPriceFilter && <ClearButton onClick={clearPrices} label={t("reset")} />}
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse ps-1 pt-1">
          <div className="flex flex-col gap-2 w-1/2">
            {/* from label */}
            <Label htmlFor="min-price" className="lowercase">
              {t("from")}
            </Label>
            <Input
              id="min-price"
              type="number"
              placeholder="0"
              {...register("min", { valueAsNumber: true })}
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            {/* from label */}
            <Label htmlFor="max-price" className="lowercase">
              {t("to")}
            </Label>
            <Input
              id="max-price"
              type="number"
              placeholder="1000000"
              {...register("max", { valueAsNumber: true })}
            />
          </div>
        </div>
      </div>
    </Form>
  );
}
