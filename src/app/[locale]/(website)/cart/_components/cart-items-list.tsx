import { getUserCart } from "@/lib/services/user-cart.service";
import CartItem from "./cart-item";
import { TUserCart } from "@/lib/types/cart";
import { cn } from "@/lib/utils/tailwind-merge";
import { ShoppingCart } from "lucide-react";
import { useLocale  } from "next-intl";
import { getTranslations } from "next-intl/server";



export default async function CartItemsList({locale}:{locale:string}) {
  // Translations
  const t = await getTranslations("cart.empty-cart");



  // Services
  const payload = await getUserCart();

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
