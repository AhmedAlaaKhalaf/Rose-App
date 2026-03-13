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
import { TAddOccasionFields, TOccasionDetailsResponse } from "@/lib/types/dashboard/occasions-db";
import { Image as Photo } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import useUpdateOccasion from "../../_Hooks/use-update-occasion";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateOccasionSchema } from "@/lib/schemes/occasions-dashboard.schema";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type PageParams = {
  occasionData: SuccessfulResponse<TOccasionDetailsResponse>;
};

export default function UpdateOccasionForm({ occasionData }: PageParams) {
  // Translations
  const t = useTranslations("db-occasions");

  // Navigation
  const router = useRouter();

  // Hooks
  const { isPending, error, updateOccasion } = useUpdateOccasion(occasionData.occasion._id);

  // React hook form
  const form = useForm<Pick<TAddOccasionFields, "name">>({
    defaultValues: {
      name: occasionData.occasion.name,
    },
    resolver: zodResolver(updateOccasionSchema()),
  });

  const onSubmit: SubmitHandler<Pick<TAddOccasionFields, "name">> = (values) => {
    updateOccasion(
      { ...values, image: occasionData.occasion.image },
      {
        onSuccess: () => {
          router.replace("/dashboard/occasions");
          toast.success(t("update-toast"));
        },
      }
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-32 w-186">
          <div className="space-y-5">
            {/* Occasion Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("occasion-name")} <span className="text-red-600">*</span>
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter occasion name"
                      className="w-186"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* FeedBack */}
            {error && (
              <p className="w-186 font-semibold text-maroon-500 text-center">{error.message}</p>
            )}

            {/* Occasion Image Field */}
            <Button
              type="button"
              variant="outline"
              className="flex justify-end items-center place-self-end gap-2 hover:bg-blue-50 border border-zinc-200 text-blue-600"
            >
              <Photo size={18} />
              {t("view-occasion-image-button")}
            </Button>
          </div>

          {/* Submit Button */}
          <Button
            disabled={isPending || (!form.formState.isValid && form.formState.isSubmitted)}
            className="w-186"
          >
            {t("update-occasion-button")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
