import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/shared/product-card";
import { getProducts } from "@/lib/services/product.service";
import { cn } from "@/lib/utils/tailwind-merge";

export default async function BestSellingCarousel() {
  const {
    payload: { data: products },
  } = await getProducts({ limit: "6" });

  const carouselButtonStyle = "bg-maroon-600 rounded-3xl size-10 text-maroon-50";

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="mx-auto max-w-[20.25rem] sm:max-w-full"
    >
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3"
          >
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious
        variant={"destructive"}
        className={cn("left-1 lg:-left-5", carouselButtonStyle)}
      />

      <CarouselNext
        variant={"destructive"}
        className={cn("right-1 lg:-right-5", carouselButtonStyle)}
      />
    </Carousel>
  );
}
