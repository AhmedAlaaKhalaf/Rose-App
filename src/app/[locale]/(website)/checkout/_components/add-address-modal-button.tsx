"use client";

import AddressMapPicker from "@/components/shared/address-map-picker";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils/tailwind-merge";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { TUserAddressFormFields } from "@/lib/types/user-address";
import { Progress } from "@/components/ui/progress";
import useAddUserAddress from "../_hooks/use-add-address";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "@/components/ui/phone-input";
import { useTranslations } from "next-intl";
import { userAddressSchema } from "@/lib/schemas/user-address.schema";
import { Input } from "@/components/ui/input";

type AddAddressModalButtonProps = {
  triggerClassName?: string;
};

export function AddAddressModalButton({ triggerClassName }: AddAddressModalButtonProps) {
  // Translation
  const t = useTranslations("user-address.modal.mutate-address");
  const tZod = useTranslations("user-address.validation");

  // States
  const [currentStep, setCurrentStep] = useState(0);
  const [modalState, setModalState] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState({
    lat: 30.0444,
    lng: 31.2357,
  });
  //Hooks
  const { mutateAsync: AddUserAddress, isPending } = useAddUserAddress();

  // Variables
  const steps = [
    {
      fields: ["title", "city", "street", "phone"] as const,
    },
    {
      fields: [] as const,
    },
  ];
  const isLastStep = currentStep === steps.length - 1;

  // Form & validation
  const form = useForm<TUserAddressFormFields>({
    defaultValues: {
      title: "",
      city: "",
      street: "",
      phone: "",
    },
    resolver: zodResolver(userAddressSchema(tZod)),
    // mode: "onChange",
  });

  // Functions
  const onSubmit: SubmitHandler<TUserAddressFormFields> = async (values) => {
    try {
      await AddUserAddress({
        ...values,
        latitude: selectedPosition.lat,
        longitude: selectedPosition.lng,
      });

      setModalState(false);

      setCurrentStep(0);
    } catch (error) {
      console.log(error);
    }
  };
  const renderCurrentStepContent = () => {
    switch (currentStep) {
      case 0: {
        return (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label>{t("title.title")}</Label>
                  <FormControl>
                    <Input
                      aria-invalid={!!form.formState.errors.title}
                      {...field}
                      placeholder={t("title.placeholder")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*  City  */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <Label> {t("city.title")}</Label>

                  {/* Input */}
                  <FormControl>
                    <Input
                      aria-invalid={!!form.formState.errors.city}
                      {...field}
                      placeholder={t("city.placeholder")}
                    />
                  </FormControl>

                  {/* Validation Message  */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address  */}
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <Label> {t("address.title")}</Label>

                  {/* Input Field */}
                  <FormControl>
                    <Textarea
                      aria-invalid={!!form.formState.errors.street}
                      {...field}
                      placeholder={t("address.placeholder")}
                    />
                  </FormControl>

                  {/* Validation Message  */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone  */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <Label>{t("phone.title")}</Label>

                  {/* Input Field */}
                  <FormControl>
                    <div className="relative">
                      <PhoneInput
                        {...field}
                        aria-invalid={!!form.formState.errors.phone}
                        value={field.value}
                        onChange={field.onChange}
                        className="peer"
                        // defaultCountry="EG"
                        initialValueFormat="national"
                        international={false}
                      />
                      {/* Custom placeholder  */}
                      <span
                        className={cn(
                          "top-4 left-1/3 absolute text-zinc-500 text-sm",
                          field.value ? "hidden" : "block"
                        )}
                      >
                        {t("phone.placeholder")}
                      </span>
                    </div>
                  </FormControl>

                  {/* Validation Message  */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      }

      case 1: {
        return (
          <AddressMapPicker
            position={selectedPosition}
            onPositionChange={setSelectedPosition}
          />
        );
      }

      default: {
        return null;
      }
    }
  };
  // Handlers
  const handleNextButton = async () => {
    const isValid = currentStep === 0 ? await form.trigger(steps[0].fields) : true;

    if (isValid && !isLastStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBackButton = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <Dialog open={modalState} onOpenChange={setModalState}>
      <DialogTrigger asChild>
        <Button variant="secondary" className={triggerClassName}>{t("form-title.add")}</Button>
      </DialogTrigger>
      <DialogContent aria-describedby="" className="gap-6">
        {/* Title */}
        <DialogTitle>{t("form-title.add")}</DialogTitle>

        {/* Progress Bar */}
        <Progress value={((currentStep + 1) / 3) * 100} />

        {/* Content  */}
        <section className="flex flex-col gap-4">
          {/* Title  */}
          <header className="flex items-center gap-4 border-b border-zinc-200 pb-3 font-medium text-2xl leading-none text-maroon-600">
            {isLastStep && (
              <Button type="button" className="size-9 rounded-full" onClick={handleBackButton}>
                <ArrowLeft strokeWidth={1.46} />
              </Button>
            )}
            {isLastStep ? t("description-steps.second") : t("description-steps.first")}
          </header>

          {/* Form */}

          {/* Fields */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              id="add-address-form"
              className="space-y-4"
            >
              {/* Render Step */}
              {renderCurrentStepContent()}

              {/* Button  */}
              <footer>
                {/* {error && <SubmittingErrorForm errorMsg={error.message} />} */}
                {!isLastStep && (
                  <Button
                    type="button"
                    onClick={handleNextButton}
                    className="rounded-xl mt-9 w-full"
                  >
                    {t("button-steps.first")}
                  </Button>
                )}

                {isLastStep && (
                  <Button type="submit" className="rounded-xl mt-9 w-full" disabled={isPending}>
                    {t("button-steps.second.add")}
                  </Button>
                )}
              </footer>
            </form>
          </Form>
        </section>
      </DialogContent>
    </Dialog>
  );
}
