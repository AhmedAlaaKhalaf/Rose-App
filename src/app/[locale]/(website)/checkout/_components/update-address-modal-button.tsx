"use client";

import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils/tailwind-merge";
import { ArrowLeft, PenLine } from "lucide-react";
import { useState } from "react";
import { TUserAddress, TUserAddressFormFields } from "@/lib/types/user-address";
import { Progress } from "@/components/ui/progress";
import useUpdateUserAddress from "../_hooks/use-update-address";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "@/components/ui/phone-input";
import { useTranslations } from "next-intl";
import { userAddressSchema } from "@/lib/schemas/user-address.schema";
import { Input } from "@/components/ui/input";

export function UpdateAddressModalButton({ userAddress }: { userAddress: TUserAddress }) {
  // Translation
  const t = useTranslations("user-address.modal.mutate-address");
  const tZod = useTranslations("user-address.validation");

  // States
  const [currentStep, setCurrentStep] = useState(0);
  const [modalState, setModalState] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState({
    lat: Number(userAddress.lat) || 30.0444,
    lng: Number(userAddress.long) || 31.2357,
  });
  //Hooks
  const { mutateAsync: updateUserAddress, isPending, error } = useUpdateUserAddress();

  // Variables
  const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { city, street, phone, username, _id } = userAddress;
  const steps = [
    {
      fields: ["city", "street", "phone"],
    },
    {
      fields: ["lat", "lng"],
    },
  ];
  // const currentForm = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  // Form & validation
  const form = useForm<TUserAddressFormFields>({
    defaultValues: {
      city,
      street,
      phone,
    },
    resolver: zodResolver(userAddressSchema(tZod)),
    // mode: "onChange",
  });

  // Functions
  const onSubmit: SubmitHandler<TUserAddressFormFields> = async (values) => {
    try {
      await updateUserAddress({
        ...values,
        lat: `${selectedPosition.lat}`,
        long: `${selectedPosition.lng}`,
        username,
        _id,
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
                        defaultCountry="EG"
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
          // Google map
          <section className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg">
            <APIProvider apiKey={googleMapApiKey as string}>
              <Map
                defaultCenter={selectedPosition}
                defaultZoom={13}
                // Required for Advanced Markers
                mapId="YOUR_MAP_ID"
                gestureHandling={"greedy"}
                disableDefaultUI={false}
                onClick={(e) => {
                  if (!e.detail.latLng) return;

                  const newLat = e.detail.latLng.lat;
                  const newLng = e.detail.latLng.lng;

                  setSelectedPosition({
                    lat: newLat,
                    lng: newLng,
                  });
                }}
              >
                <AdvancedMarker position={selectedPosition}>
                  <Pin background={"#fbbf24"} glyphColor={"#000"} borderColor={"#000"} />
                </AdvancedMarker>
              </Map>
            </APIProvider>
          </section>
        );
      }

      default: {
        return null;
      }
    }
  };
  // Handlers
  const handleNextButton = async () => {
    const currentFields = steps[currentStep].fields;

    const isValid = await form.trigger(currentFields);

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
        <Button variant={"subtle"} className="rounded-full size-9">
          <PenLine className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="" className="gap-6">
        {/* Title */}
        <DialogTitle>{t("form-title.edit")}</DialogTitle>

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
              id="update-address-form"
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
                    {t("button-steps.second.update")}
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
