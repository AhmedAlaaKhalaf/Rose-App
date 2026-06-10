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
  // Translation
  const t = useTranslations("testimonials");

  //variables
  const format = useFormatter();

  // Functions
  const formatDate = (created: string, updated: string): string => {
    const createdAt = new Date(created);
    const updateAT = new Date(updated);

    if (updateAT > createdAt) {
      return format.dateTime(updateAT, "short");
    }

    return format.dateTime(createdAt, "short");
  };

  return (
    <CarouselItem className="flex justify-center items-center px-7 lg:basis-1/3 md:basis-1/2">
      <Card className="relative flex flex-col justify-center items-center gap-3 dark:bg-white m-w-[21.9rem] p-5 pt-14 rounded-3xl w-full h-[17rem]">
        <Avatar className="bottom-56 absolute border-4 border-white w-[7.5rem] h-[7.5rem]">
          <AvatarImage src={"https://placehold.net/avatar-4.svg"} className="object-cover" />
          {/* <AvatarFallback>CN</AvatarFallback> */}
        </Avatar>

        <CardHeader>
          <CardTitle className="font-semibold text-zinc-800 capitalize">
            {t("testimonial-user-name", {
              name: `${item?.name}`,
            })}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 px-0">
          <RatingStars avgRate={item?.rating} />

          <p className="font-medium text-zinc-800 capitalize line-clamp-3">
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
