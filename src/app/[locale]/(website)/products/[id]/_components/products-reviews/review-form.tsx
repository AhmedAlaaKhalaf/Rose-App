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
import { reviewSchema } from "@/lib/schemes/reviews.schema";
import { TReviewFields } from "@/lib/types/reviews";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import useAddReview from "../../_hooks/use-add-review";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import LoginNeed from "./login-need";
import { cn } from "@/lib/utils/tailwind-merge";

export default function ReviewForm({ id }: { id: string }) {
  // Translation
  const t = useTranslations("product-reviews");

  // Session
  const session = useSession();

  // Mutation
  const { addReview, error, isPending } = useAddReview();

  // React Hook Form
  const form = useForm<TReviewFields>({
    defaultValues: {
      rating: 0,
      title: "",
      comment: "",
    },
    resolver: zodResolver(reviewSchema(t)),
  });

  // Functions
  const onSubmit: SubmitHandler<TReviewFields> = (values) => {
    addReview(
      { ...values, productId: id },
      {
        onSuccess: () => {
          toast.success(t("add-review-toast"));
        },
      }
    );
  };

  return (
    <div className="relative flex flex-col items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            "space-y-3 ps-3 pt-2 w-full",
            session.status !== "unauthenticated" ? "blur-none" : "blur-sm"
          )}
        >
          {/* Rating */}
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                {/* Lable */}
                <FormLabel>{t("form-rate-label")}</FormLabel>

                {/* Field */}
                <FormControl>
                  {/* <Rating value={rate}  /> */}
                  <Rating value={field.value} variant="yellow" onValueChange={field.onChange} />
                </FormControl>

                {/* Validation Message */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Review Title*/}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-1">
                {/* Lable */}
                <FormLabel>{t("title-field-label")}</FormLabel>

                {/* Field */}
                <FormControl>
                  <Input {...field} type="text" placeholder={t("title-field-placholder")} />
                </FormControl>

                {/* Validation Message */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Review Comment */}
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="space-y-1">
                {/* Lable */}
                <FormLabel>{t("review-comment")}</FormLabel>

                {/* Field */}
                <FormControl>
                  <Textarea {...field} placeholder={t("text-area-placholder")} />
                </FormControl>

                {/* Validation Message */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* FeedBack */}
          {error && (
            <p className="mt-1 border border-red-600 w-full text-red-600 text-center">
              {error.message}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={
              isPending ||
              (!form.formState.isValid && form.formState.isSubmitted) ||
              session.status === "unauthenticated"
            }
          >
            {t("review-form-button")}
          </Button>
        </form>
      </Form>

      {session.status === "unauthenticated" && <LoginNeed />}
    </div>
  );
}
