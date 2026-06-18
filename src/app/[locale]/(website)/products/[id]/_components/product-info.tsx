import { TProduct } from "@/lib/types/product";
import { Package, Star } from "lucide-react";
import AddToWishlist from "./add-to-wishlist";
import { useTranslations } from "next-intl";
import AddToCartButton from "./add-to-cart";
import { Link } from "@/i18n/navigation";

export default function ProductInfo(prodcut: TProduct) {
  // Translation
  const t = useTranslations("product-page");

  // Variables
  const {
    id,
    title,
    description,
    rating,
    ratings,
    stock,
    price,
    discountValue,
    discountType,
    _count: { wishlistItems },
  } = prodcut;
  const leftInStock = (stock ?? 0) - (ratings ?? 0);
  const outOfStock = (stock ?? 0) - (ratings ?? 0) === 0;
  const priceAfterDiscount =
    discountType === "PERCENT" ? +price - (+price * +discountValue) / 100 : +price - +discountValue;
  const isInWishlist = !!wishlistItems;

  return (
    <div className="flex flex-col justify-between h-full scroll-smooth">
      {/* Wrapper  */}
      <>
        {/*  Product title  */}
        <h1 className="mb-2 font-semibold text-zinc-800 dark:text-zinc-50 text-xl lg:text-3xl capitalize">
          {title}
        </h1>
        <div className="flex items-center gap-4">
          {/*  Product price details  */}
          <span className="flex items-center gap-1">
            {/*  Product price  */}
            {price && (
              <del className="font-bold text-zinc-300 dark:text-zinc-500 text-xl md:text-3xl leading-none">
                {Number(price)}
              </del>
            )}
            {/* Final Product price  */}
            <span className="font-semibold text-zinc-800 dark:text-zinc-50 text-xl md:text-3xl leading-none">
              {/* Product After discount  */}
              {`${Number(priceAfterDiscount)?.toFixed(2)}`}
              {/* Product currency  */}
              <span className="font-medium text-xl leading-none"> {t("EGP")}</span>
            </span>
          </span>
          <div className="flex justify-center items-center bg-zinc-100 dark:bg-zinc-700 px-4 py-2 rounded-full">
            {/* Product stock count  */}
            <span className="flex items-center gap-2">
              {leftInStock > 0 ? (
                <>
                  <Package size={20} className="text-zinc-500 dark:text-zinc-300" />
                  <span className="font-medium text-zinc-800 dark:text-zinc-50 text-xs md:text-sm">
                    {leftInStock} {t("left-in-stock")}
                  </span>
                </>
              ) : (
                <>
                  {/* Package Icon  */}
                  <Package size={20} className="text-red-600" />
                  {/* Out of stock bagde  */}
                  <span className="font-medium text-red-600 dark:text-red-600 text-sm">
                    {t("out-of-stock")}
                  </span>
                </>
              )}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-8 text-xs sm:text-base">
          {/* Star Icon  */}
          <Star size={20} className="fill-[#FFA508] border-none text-[#FFA508]" />
          {/* Package Rating  */}
          {rating > 0 ? (
            <div className="flex items-center gap-1">
              <span className="text-black">
                {t("rating")}: <span className="font-normal">{rating}/5</span>
              </span>

              {/* Product rating  */}
              <Link
                href={`/products/${id}#reviews`}
                className="font-medium text-blue-600 dark:text-blue-400"
              >
                ({ratings} {t("ratings")})
              </Link>
            </div>
          ) : (
            // No rating case
            <span className="font-medium text-zinc-800 dark:text-zinc-50">
              {t("No-ratings-yet")}
            </span>
          )}
        </div>
        {/* Product description*/}
        <p className="mt-8 h-44 lg:h-72 overflow-y-auto text-zinc-600 dark:text-zinc-400 text-xs sm:text-base leading-none hide-scroll">
          {description}
        </p>
      </>
      {/* Products buttons */}
      <div className="flex items-center gap-2 mt-4">
        {/* Add to wishlist button */}
        <AddToWishlist wishlist={isInWishlist} />
        {/* Add to cart button */}
        <AddToCartButton outOfStock={outOfStock} product={id} />
      </div>
    </div>
  );
}
