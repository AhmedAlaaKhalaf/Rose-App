import { Button } from "@/components/ui/button";
import { BrushCleaning } from "lucide-react";
import { SectionHead } from "@/components/ui/section-header";
import RelatedCarousel from "../products/[id]/_components/related-products/related-carousel";
import CartItemsList from "./_components/cart-items-list";
import { Suspense } from "react";
import { CartItemsListSkeleton } from "./_skeletons/cart-items-list.skeleton";
import { getUserCart } from "@/lib/services/user-cart.service";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import ClearUserCartButton from "./_components/clean-user-cart-button";

type CartPageProps = {
  params: { locale: string };
};

export default async function CartPage({ params: { locale } }: CartPageProps) {
  // Translations
  const t = await getTranslations("search-input");
  const tCart = await getTranslations("cart");

  // Services
  const {
    payload: { cartItems },
  } = await getUserCart();

  return (
    <main className="space-y-12 pb-40">
      {/* Cart products section  */}
      <div className="gap-10 grid grid-cols-12 grid-rows-12">
        {/* Cart section  */}
        <section className="space-y-6 col-span-12 lg:col-span-8 row-span-8 lg:row-span-12">
          {/* Cart wrapper  */}
          <div className="flex justify-between items-end">
            {/* Cart title  */}
            <p className="font-bold text-secondary-foreground text-5xl capitalize">
              {tCart("title")}
              {/* Cart items count  */}
              <span className="ps-2 font-medium text-muted-foreground text-base">
                {cartItems.length} {tCart("products")}
              </span>
            </p>
            {/* Cart clear button   */}

            {cartItems.length ? (
              <ClearUserCartButton>
                {/* Cart clear button icon   */}
                <BrushCleaning className="size-5" />
                {/* Cart clear button title   */}
                {tCart("buttons.clear")}
              </ClearUserCartButton>
            ) : null}
          </div>

          {/* Cart items  */}
          <Suspense fallback={<CartItemsListSkeleton />}>
            <CartItemsList locale={locale} />
          </Suspense>

          {/* Continue shopping button */}
          <Link href={"/products"} className="block w-fit">
            <Button> {tCart("buttons.continue-shopping")}</Button>
          </Link>
        </section>

        {/* Summary section  */}
        <section className="col-span-full lg:col-span-4 row-span-4 lg:row-span-12 bg-black min-h-[50vh]">
          Summary section
        </section>
      </div>

      {/* Products you may like section  */}
      <>
        {/* Section Header */}
        <SectionHead size={"sm"}> {t("like-head")}</SectionHead>

        {/* Section Content */}
        <RelatedCarousel id={"69d988704461df0f939b57cc"} />
      </>
    </main>
  );
}
