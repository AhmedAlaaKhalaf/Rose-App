"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { updateCartItemAction } from "../_actions/user-cart.action";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils/tailwind-merge";
import { useLocale, useTranslations } from "next-intl";

type CartItemQuantityPickerProps = {
  quantity: number;
  productId: string;
};

export default function CartItemQuantityPicker({
  quantity,
  productId,
}: CartItemQuantityPickerProps) {
  // Translations
  const t = useTranslations("cart.toast-messages");

  // Hooks
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();

  //  Forms
  const form = useForm({
    defaultValues: {
      quantity: quantity ?? 1,
    },
  });

  const { getValues } = form;
  // Variables

  const quantityTrim = getValues("quantity");

  // Functions
  const handleIncreaseQuantity = () => {
    startTransition(async () => {
      try {
        await updateCartItemAction(productId, quantityTrim + 1);
      } catch (error) {
        void error;
        toast.error(t("fail.edit"), {
          className: cn(
            locale === "ar" ? "font-tajawal" : "font-inter",
            "font-semibold text-sm text-zinc-800 capitalize"
          ),
        });
      }
    });
  };

  const handleDecreaseQuantity = () => {
    startTransition(async () => {
      try {
        await updateCartItemAction(productId, quantityTrim - 1);
      } catch (error) {
        void error;
        toast.error(t("fail.edit"), {
          className: cn(
            locale === "ar" ? "font-tajawal" : "font-inter",
            "font-semibold text-sm text-zinc-800 capitalize"
          ),
        });
      }
    });
  };
  return (
    <ButtonGroup className="gap-2 lg:mt-auto w-full">
      <Button
        className="rounded-md h-full"
        disabled={quantityTrim === 0 || isPending}
        onClick={() => {
          form.setValue("quantity", quantityTrim - 1);

          handleDecreaseQuantity();
        }}
        variant={"secondary"}
      >
        <MinusIcon className="size-5" strokeWidth={1.46} />
      </Button>

      {/* Quantity Input */}
      <Form {...form}>
        <form className="w-full">
          {/* Input Field */}
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    readOnly
                    {...field}
                    type="number"
                    className="bg-transparent border border-border dark:border-zinc-600 rounded-md w-full lg:min-w-24 font-inter font-normal text-sm text-center"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Button
        disabled={isPending}
        onClick={() => {
          form.setValue("quantity", quantityTrim + 1);

          handleIncreaseQuantity();
        }}
        variant={"secondary"}
        className="rounded-md h-full"
      >
        <PlusIcon className="size-5" strokeWidth={1.46} />
      </Button>
    </ButtonGroup>
  );
}
