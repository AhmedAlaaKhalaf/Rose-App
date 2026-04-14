import { setRequestLocale } from "next-intl/server";

import { productDetailsServices } from "@/lib/services/product-details.service";
import ProductReviews from "./_components/products-reviews/product-reviews";
import RelatedProducts from "./_components/related-products/related-products";

type LocaleProps = {
  params: { locale: string; id: string };
};

export default async function Page({ params: { locale, id } }: LocaleProps) {
  // Enable static rendering
  setRequestLocale(locale);

  // Fetch product details
  const productDetails = await productDetailsServices(id);

  return (
    <main className="space-y-12 mx-auto container">
      <ProductReviews productDetails={productDetails} />
      <RelatedProducts id={productDetails.payload.product.category.id} />
    </main>
  );
}
