import CartItem from "./cart-item";
import { TUserCart } from "@/lib/types/cart";
import { cn } from "@/lib/utils/tailwind-merge";
import { ShoppingCart } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { use } from "react";

type CartItemsListProps = {
  getUserCart: () => Promise<SuccessfulResponse<TUserCart>>;
};

export default function CartItemsList({ getUserCart }: CartItemsListProps) {
  // Translations
  const t = useTranslations("cart.empty-cart");

  // Hooks
  const locale = useLocale();

  // Services
  const payload = use(getUserCart());

  return !payload.cart.cartItems.length ? (
    <div
      className={cn(
        locale === "ar" && "font-tajawal",
        "flex flex-col justify-center items-center gap-3 col-span-4 py-20 font-medium text-zinc-500 text-sm capitalize leading-none"
      )}
    >
      <ShoppingCart className="size-12 text-zinc-500" strokeWidth={1.75} />
      {t("title")}
      <span>{t("description")}</span>
    </div>
  ) : (
    <div className="space-y-5 p-5 border border-border rounded-md max-h-256 overflow-y-scroll scrollbar-primary">
     {payload.cart.cartItems.map((item) => (
        <CartItem key={item._id} item={item} />
      ))}
    </div>
  );
}
