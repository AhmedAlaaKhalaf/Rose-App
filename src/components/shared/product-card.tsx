"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TProductCard } from "@/lib/types/product";
import AddToCartButton from "@/components/features/cart/add-to-cart-button";
import WishlistButton from "../features/wishlist/wishlist-button";
import { Link } from "@/i18n/navigation";
import { resolveProductCover } from "@/lib/utils/product-image";
import { cn } from "@/lib/utils/tailwind-merge";
import { useLocale, useTranslations } from "next-intl";

type ProductCardProps = { product: TProductCard };

export default function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("product-listing.badge");
  const locale = useLocale();

  const { cover, title, rating, price, discountValue, discountType, createdAt, stock } = product;
  const productHref = `/products/${product.id}`;
  const productLifeTime =
    (new Date().getTime() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24);
  const isNewProduct = productLifeTime < 7;
  const sold = 0;
  const isHotProduct = sold > 150;
  const priceAfterDiscount =
    discountType === "PERCENT" ? +price - (+price * +discountValue) / 100 : +price - +discountValue;

  return (
    <section className="flex flex-col justify-between min-h-[20rem] sm:h-[22.75rem]">
      <div className="relative h-[14rem] sm:h-[17rem]">
        <header
          className={cn(
            locale === "ar" && "font-tajawal",
            "top-3 z-20 absolute flex justify-between px-3 w-full pointer-events-none"
          )}
        >
          <div className="pointer-events-auto">
            <WishlistButton product={product} />
          </div>

          <div className="flex gap-2">
            {isNewProduct && <Badge variant="subtle">{t("new")}</Badge>}
            {!stock && <Badge>{t("sold-out")}</Badge>}
            {isHotProduct && <Badge variant="secondary">{t("hot")}</Badge>}
          </div>
        </header>

        <Link
          href={productHref}
          className="block relative z-0 rounded-3xl w-full h-full overflow-hidden"
          aria-label={title}
        >
          <Image
            src={resolveProductCover(cover)}
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
      </div>

      <footer className="font-semibold text-maroon-700 dark:text-softPink-200 text-lg leading-none">
        <Link href={productHref} className="block hover:opacity-90 transition-opacity line-clamp-2">
          {title}
        </Link>

        <div className="flex justify-between items-center pt-3 gap-3">
          <Link href={productHref} className="dark:text-softPink-200 flex-1 min-w-0">
            <div className="flex gap-1 pb-3">
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
            </div>

            {`${priceAfterDiscount?.toFixed(2)} ${locale === "ar" ? "ج.م" : "EGP"}`}

            {price && (
              <span className="ps-2 font-medium text-zinc-400 dark:text-zinc-500 line-through">
                {`${Number(price)?.toFixed(2)} ${locale === "ar" ? "ج.م" : "EGP"}`}
              </span>
            )}
          </Link>

          <AddToCartButton productId={product.id} stock={stock} variant="icon" />
        </div>
      </footer>
    </section>
  );
}
