"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Rating } from "@/components/ui/star-rating";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@/i18n/navigation";
import { reviewSchema } from "@/lib/schemes/reviews.schema";
import { TReviewFields } from "@/lib/types/reviews";
import { cn } from "@/lib/utils/tailwind-merge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useAddReview from "../../_hooks/use-add-review";

export default function ReviewForm({ id }: { id: string }) {
  const t = useTranslations("product-reviews");
  const session = useSession();
  const { addReview, error, isPending } = useAddReview();
  const isGuest = session.status === "unauthenticated";

  const form = useForm<TReviewFields>({
    defaultValues: {
      rating: 0,
      title: "",
      comment: "",
    },
    resolver: zodResolver(reviewSchema(t)),
  });

  const onSubmit: SubmitHandler<TReviewFields> = (values) => {
    addReview(
      { ...values, productId: id },
      {
        onSuccess: () => {
          toast.success(t("add-review-toast"));
          form.reset();
        },
      }
    );
  };

  return (
    <div className="top-24 lg:sticky bg-white dark:bg-zinc-900/30 p-5 md:p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl">
      <h3 className="mb-5 font-semibold text-zinc-900 dark:text-zinc-50 text-lg">
        {t("write-review")}
      </h3>

      <div className="relative">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("space-y-4", isGuest && "pointer-events-none opacity-40 blur-[2px]")}
          >
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form-rate-label")}</FormLabel>
                  <FormControl>
                    <Rating value={field.value} variant="yellow" onValueChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("title-field-label")}</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder={t("title-field-placholder")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("review-comment")}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t("text-area-placholder")}
                      className="min-h-28 resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <p className="px-3 py-2 border border-red-200 rounded-lg text-red-600 text-sm text-center">
                {error.message}
              </p>
            )}

            <Button type="submit" className="rounded-full w-full" disabled={isPending || isGuest}>
              {t("review-form-button")}
            </Button>
          </form>
        </Form>

        {isGuest && (
          <div className="absolute inset-0 flex justify-center items-center px-4">
            <div className="space-y-3 bg-white/90 dark:bg-zinc-900/90 shadow-lg backdrop-blur-sm p-5 border border-zinc-200 dark:border-zinc-700 rounded-xl max-w-xs text-center">
              <p className="font-medium text-zinc-800 dark:text-zinc-100 text-sm">{t("login-need")}</p>
              <Button asChild size="sm" className="rounded-full">
                <Link href="/login">{t("login-button")}</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
