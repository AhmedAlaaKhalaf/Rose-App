import { Star, Trash2 } from "lucide-react";
import CartItemQuantityPicker from "./cart-item-quantity-picker";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { TCartItem } from "@/lib/types/cart";
import RemoveCartItemButton from "./remove-cart-item-button";

type CartItemProp = {
  item: TCartItem;
};

export default function CartItem({ item: { product, price, quantity } }: CartItemProp) {
  // Translations
  const tCart = useTranslations("cart");

  return (
    <div className="flex gap-4 pb-5 border-border dark:border-zinc-700 border-b">
      {/* Cart image */}
      <Image
        className="rounded-md max-h-[8.75rem]"
        src={product.imgCover}
        alt={product.title}
        width={117}
        height={140}
      />

      {/* Cart details */}
      <div className="flex lg:flex-row flex-col flex-1 justify-between gap-4 lg:gap-0">
        {/* Cart detail */}
        <div className="flex flex-col h-full">
          {/* Cart detail wrapper */}
          <div className="space-y-2">
            {/* item name */}
            <p className="font-semibold text-primary text-lg capitalize leading-none">
              {product.title}
            </p>

            {/* Cart title */}
            <span className="flex items-center gap-2 capitalize">
              {/* Item star icon */}
              <Star strokeWidth={1.46} fill="#FFA508" color="#FFA508" />
              {/* Item rating */}
              {tCart("item.rating")}:{" "}
              <span className="text-black dark:text-zinc-50"> {product.rateAvg}/5</span>
              {/* Item ratings count */}
              <span className="font-medium text-blue-600">
                ({product.rateCount} {tCart("item.ratings-count")})
              </span>
            </span>
          </div>
          {/* Cart price */}
          <p className="mt-auto font-medium text-primary text-sm">
            {/* Item quantity */}
            (× {quantity}){""}
            {/* Item price */}
            <span className="mt-auto px-1 font-bold text-zinc-800 text-2xl leading-none">
              {product.discount > 0 ? product.priceAfterDiscount : price}
            </span>
            {/* Item currency */}
            <span className="font-medium text-zinc-800"> {tCart("item.currency")}</span>
          </p>{" "}
        </div>

        {/* Cart actions */}
        <div className="flex flex-col gap-4 lg:gap-0">
          {/* Item delete button */}
          <RemoveCartItemButton itemId={product._id}>
            {/* Button title */}
            {tCart("buttons.remove")}

            {/* Button icon */}
            <Trash2 className="size-5" strokeWidth={1.46} />
          </RemoveCartItemButton>

          {/* Item increase/decrease count button */}
          <CartItemQuantityPicker quantity={quantity} productId={product._id} />
        </div>
      </div>
    </div>
  );
}
