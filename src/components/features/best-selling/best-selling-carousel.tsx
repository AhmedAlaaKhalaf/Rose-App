import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/shared/product-card";
import { getProducts } from "@/lib/services/product.service";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/tailwind-merge";

export default async function BestSellingCarousel() {
  // Services
  const {
    payload: { data: products },
  } = await getProducts({ limit: "6" });

  // Variables
  const carouselButtonStyle = "bg-maroon-600 rounded-3xl size-10 text-maroon-50";

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {/* Products  */}
        {products.map((product) => (
          <CarouselItem key={product.id} className="sm:basis-1/1 md:basis-1/2 lg:basis-1/3">
            <Link key={product.id} href={`products/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Prev */}
      <CarouselPrevious variant={"destructive"} className={cn("-left-5", carouselButtonStyle)} />

      {/* Next */}
      <CarouselNext variant={"destructive"} className={cn("-right-5", carouselButtonStyle)} />
    </Carousel>
  );
}
