"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import RatingStars from "./rating-stars";
import { TTestimonial } from "@/lib/types/testimonials";
import { useFormatter, useTranslations } from "next-intl";

type TPageProps = {
  item: TTestimonial;
};

export default function TestimonialCard({ item }: TPageProps) {
  const t = useTranslations("testimonials");
  const format = useFormatter();

  const formatDate = (created: string, updated: string): string => {
    const createdAt = new Date(created);
    const updateAT = new Date(updated);

    if (updateAT > createdAt) {
      return format.dateTime(updateAT, "short");
    }

    return format.dateTime(createdAt, "short");
  };

  return (
    <CarouselItem className="flex justify-center items-center px-3 sm:px-5 lg:px-7 basis-full md:basis-1/2 lg:basis-1/3">
      <Card className="relative flex flex-col justify-center items-center gap-2 sm:gap-3 lg:gap-3 dark:bg-white mx-auto mt-10 sm:mt-12 lg:mt-0 p-4 sm:p-5 lg:p-5 pt-12 sm:pt-14 lg:pt-14 rounded-3xl w-full max-w-[21.9rem] min-h-[15rem] lg:min-h-0 lg:h-[17rem]">
        <Avatar className="top-0 left-1/2 absolute border-4 border-white size-20 sm:size-24 lg:w-[7.5rem] lg:h-[7.5rem] -translate-x-1/2 -translate-y-1/2 lg:bottom-56 lg:top-auto lg:translate-y-0">
          <AvatarImage src={"https://prd.place/100?id=12"} className="object-cover" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <CardHeader>
          <CardTitle className="font-semibold text-zinc-800">
            {t("testimonial-user-name", {
              name: `${item?.name}`,
            })}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 px-0">
          <RatingStars avgRate={item?.rating} />

          <p className="font-medium text-zinc-800 line-clamp-3 lg:line-clamp-none">
            {t("testimonials-card-content", {
              content: `${item?.content}`,
            })}
          </p>
        </CardContent>

        <CardFooter>
          <p className="font-medium text-zinc-400 text-xs">
            {formatDate(item?.createdAt, item?.updatedAt)}
          </p>
        </CardFooter>
      </Card>
    </CarouselItem>
  );
}
