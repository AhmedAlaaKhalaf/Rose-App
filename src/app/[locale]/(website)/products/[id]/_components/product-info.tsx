"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import AddToCartButton from "@/components/features/cart/add-to-cart-button";
import { Rating } from "@/components/ui/star-rating";
import WishlistButton from "@/components/features/wishlist/wishlist-button";
import { Link } from "@/i18n/navigation";
import { TProduct, TProductCard } from "@/lib/types/product";
import { getProductImages } from "@/lib/utils/product-image";
import { cn } from "@/lib/utils/tailwind-merge";
import { ChevronRight, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

type ProductInfoProps = {
  product: TProduct;
};

export default function ProductInfo({ product }: ProductInfoProps) {
  const t = useTranslations("product-details");
  const tBadge = useTranslations("product-listing.badge");
  const locale = useLocale();

  const images = getProductImages(product.cover, product.gallery);
  const [activeImage, setActiveImage] = useState(images[0]);

  const priceAfterDiscount =
    product.discountType === "PERCENT"
      ? +product.price - (+product.price * +product.discountValue) / 100
      : +product.price - +product.discountValue;

  const currency = locale === "ar" ? "ج.م" : "EGP";
  const wishlistProduct: TProductCard = {
    id: product.id,
    title: product.title,
    cover: product.cover,
    createdAt: product.createdAt,
    price: product.price,
    discountType: product.discountType,
    discountValue: product.discountValue,
    stock: product.stock,
    rating: product.rating,
    ratings: product.ratings,
  };

  return (
    <section className="gap-8 lg:gap-12 grid lg:grid-cols-2">
      {/* Images */}
      <div className="space-y-4">
        <div className="relative bg-zinc-50 rounded-3xl w-full aspect-square overflow-hidden">
          <Image
            src={activeImage}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          {!product.stock && (
            <Badge className="top-4 start-4 absolute">{tBadge("sold-out")}</Badge>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {images.map((image) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(image)}
                className={cn(
                  "relative flex-shrink-0 border-2 rounded-xl w-20 h-20 overflow-hidden transition-colors",
                  activeImage === image ? "border-maroon-600" : "border-transparent"
                )}
              >
                <Image src={image} alt={product.title} fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col gap-5">
        <nav className="flex flex-wrap items-center gap-1.5 text-zinc-500 text-sm">
          <Link href="/" className="hover:text-maroon-600 transition-colors">
            {t("breadcrumb-home")}
          </Link>
          <ChevronRight className="size-4 rtl:rotate-180" />
          <Link href="/products" className="hover:text-maroon-600 transition-colors">
            {t("breadcrumb-products")}
          </Link>
          {product.category?.title && (
            <>
              <ChevronRight className="size-4 rtl:rotate-180" />
              <span className="text-zinc-400">{product.category.title}</span>
            </>
          )}
        </nav>

        <div className="flex flex-wrap items-center gap-2">
          {product.category?.title && (
            <Badge variant="secondary" className="rounded-full">
              {product.category.title}
            </Badge>
          )}
          {product.subCategory?.title && (
            <Badge variant="outline" className="rounded-full">
              {product.subCategory.title}
            </Badge>
          )}
        </div>

        <h1
          className={cn(
            "font-bold text-zinc-900 dark:text-zinc-50 text-3xl md:text-4xl leading-tight",
            locale === "ar" && "font-tajawal"
          )}
        >
          {product.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <Rating
            value={product.rating}
            size={20}
            variant="yellow"
            Icon={<Star strokeWidth={0} />}
          />
          <span className="font-medium text-zinc-600 text-sm">
            {product.rating.toFixed(1)} · {t("reviews-count", { count: product.ratings })}
          </span>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <p className="font-bold text-maroon-700 dark:text-softPink-200 text-3xl md:text-4xl">
            {priceAfterDiscount.toFixed(2)} {currency}
          </p>
          {product.discountValue && +product.discountValue > 0 && (
            <>
              <p className="pb-1 font-medium text-zinc-400 line-through text-lg">
                {Number(product.price).toFixed(2)} {currency}
              </p>
              <Badge className="mb-1">{t("discount-badge", { value: product.discountValue })}</Badge>
            </>
          )}
        </div>

        <p className="text-zinc-600 dark:text-zinc-300 text-base leading-relaxed">
          {product.description}
        </p>

        <p className="font-medium text-sm">
          {product.stock > 0 ? (
            <span className="text-emerald-600">{t("in-stock", { count: product.stock })}</span>
          ) : (
            <span className="text-red-600">{tBadge("sold-out")}</span>
          )}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <AddToCartButton productId={product.id} stock={product.stock} variant="full" />
          <WishlistButton product={wishlistProduct} />
        </div>
      </div>
    </section>
  );
}
