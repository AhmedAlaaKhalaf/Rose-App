import { setRequestLocale } from "next-intl/server";

import { productDetailsServices } from "@/lib/services/product-details.service";
import ProductInfo from "./_components/product-info";
import ProductReviews from "./_components/products-reviews/product-reviews";
import RelatedProducts from "./_components/related-products/related-products";

type LocaleProps = {
  params: { locale: string; id: string };
};

export default async function Page({ params: { locale, id } }: LocaleProps) {
  setRequestLocale(locale);

  const productDetails = await productDetailsServices(id);
  const { product } = productDetails.payload;

  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 mt-24 md:mt-28 mb-16 md:mb-24 max-w-7xl">
      <div className="space-y-14 md:space-y-20">
        <ProductInfo product={product} />

        <div className="pt-10 md:pt-14 border-zinc-100 dark:border-zinc-800 border-t">
          <ProductReviews productDetails={productDetails} />
        </div>

        <div className="pt-10 md:pt-14 border-zinc-100 dark:border-zinc-800 border-t">
          <RelatedProducts id={product.category.id} />
        </div>
      </div>
    </main>
  );
}
