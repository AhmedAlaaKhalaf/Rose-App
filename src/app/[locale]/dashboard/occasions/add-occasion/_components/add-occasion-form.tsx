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
import { addOccasionSchema } from "@/lib/schemes/occasions-dashboard.schema";
import { TAddOccasionFields } from "@/lib/types/dashboard/occasions-db";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import useAddOccasion from "../../_Hooks/use-add-occasion";
import { Upload } from "lucide-react";
import { useRef } from "react";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";

export default function AddOccasionForm() {
  // Translation
  const t = useTranslations("db-occasions");

  // Navigation
  const router = useRouter();

  // Refs
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Hooks
  const { addOccasion, error, isPending } = useAddOccasion();

  // React hook form
  const form = useForm<TAddOccasionFields>({
    defaultValues: {
      name: "",
      image: "",
    },
    resolver: zodResolver(addOccasionSchema(t)),
  });

  const onSubmit: SubmitHandler<TAddOccasionFields> = (values) => {
    console.log(values);

    addOccasion(values, {
      onSuccess: () => {
        router.replace("/dashboard/occasions");
        toast.success(t("add-occasion"));
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-32 bg-white p-6 rounded-lg">
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

          {/* Occasion Image Field */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("image-field")} <span className="text-red-600">*</span>
                </FormLabel>

                <FormControl>
                  <div className="relative w-186">
                    <Input
                      {...field}
                      type="file"
                      accept="image/*"
                      ref={(el) => {
                        field.ref(el);
                        fileInputRef.current = el;
                      }}
                      className="file:hidden w-186"
                    />
                    <Button
                      variant="ghost"
                      type="button"
                      className="top-0.5 absolute bg-transparent hover:bg-transparent text-maroon-500 text-sm end-1"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload size={18} /> {t("upload-button")}
                    </Button>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* FeedBack */}
          {error && (
            <p className="w-186 font-semibold text-maroon-500 text-center">{error.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          className="w-186"
          disabled={isPending || (!form.formState.isValid && form.formState.isSubmitted)}
        >
          {t("add-button")}
        </Button>
      </form>
    </Form>
  );
}
