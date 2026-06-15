import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TProductCard } from "@/lib/types/product";
import { Button } from "../ui/button";
import WishlistButton from "../features/wishlist/wishlist-button";
import { cn } from "@/lib/utils/tailwind-merge";
import { useTranslations } from "next-intl";
import { TLocale } from "@/lib/types/global";
import { Link } from "@/i18n/navigation";

type ProductCardProps = { product: TProductCard; locale: TLocale };

export default function ProductCard({ product, locale }: ProductCardProps) {
  // Translations
  const t = useTranslations("product-listing.badge");

  // Variables
  const { title, rating, price, discountValue, discountType, createdAt, stock } = product;
  const productLifeTime =
    (new Date().getTime() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24);
  const isNewProduct = productLifeTime < 7;
  const sold = 0;
  const isHotProduct = sold > 150;
  const priceAfterDiscount =
    discountType === "PERCENT" ? +price - (+price * +discountValue) / 100 : +price - +discountValue;

  return (
    <section className="flex flex-col justify-between h-[22.75rem]">
      {/* Cover  */}
      <section className="relative h-[17rem]">
        {/* Header  */}
        <header
          className={cn(
            locale === "ar" && "font-tajawal",
            "top-3 z-10 absolute flex justify-between px-3 w-full"
          )}
        >
          {/* Add to wishlist */}
          <WishlistButton product={product} />

          {/* New  badge */}
          {isNewProduct && <Badge variant="subtle">{t("new")}</Badge>}

          {/* Sold out badge */}
          {!stock && <Badge>{t("sold-out")}</Badge>}

          {/* Hot badge */}
          {isHotProduct && <Badge variant="secondary">{t("hot")}</Badge>}
        </header>

        {/* Cover  */}
        <Link href={`/products/${product.id}`}>
          <Image
            src={"https://placehold.net/product.svg"}
            alt={title}
            fill
            sizes="auto"
            priority
            className="rounded-3xl"
            style={{
              objectFit: "cover",
            }}
          />
        </Link>
      </section>

      {/* Details */}
      <footer className="font-semibold text-maroon-700 dark:text-softPink-200 text-lg leading-none">
        <Link href={`/products/${product.id}`} className="hover:text-[#FBA707]">
          {title}
        </Link>
        {/* Frame 328  */}
        <div className="flex justify-between items-center pt-3">
          {/* Frame 329 */}
          <div className="dark:text-softPink-200">
            {/* Rating */}

            <Link href={`/products/${product.id}`} className="flex gap-1 pb-3">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className={
                    idx < Math.round(rating)
                      ? "fill-[#FBA707] flex text-[#FBA707] size-4"
                      : "flex text-[#FBA707] size-4"
                  }
                />
              ))}
            </Link>
            {/* PriceAfterDiscount */}
            <Link href={`/products/${product.id}`}>
              {`${priceAfterDiscount?.toFixed(2)} ${locale === "ar" ? "ج.م" : "EGP"}`}
            </Link>
            {/* Price */}
            {price && priceAfterDiscount < +price && (
              <Link
                className="ps-2 font-medium text-zinc-400 dark:text-zinc-500 line-through"
                href={`/products/${product.id}`}
              >
                {`${Number(price)?.toFixed(2)} ${locale === "ar" ? "ج.م" : "EGP"}`}
              </Link>
            )}
          </div>

          {/* Add to cart */}
          <Button className="rounded-full size-10">
            <ShoppingCart className="size-6 text-maroon-50" strokeWidth={1.48} />
          </Button>
        </div>
      </footer>
    </section>
  );
}
