import { productDetailsServices } from "@/lib/services/product-details.service";
import { setRequestLocale } from "next-intl/server";
import ProductReviews from "./_components/products-reviews/product-reviews";
import RelatedProducts from "./_components/related-products/related-products";
import ProductGallery from "./_components/product-gallery";
import ProductInfo from "./_components/product-info";

type LocaleProps = {
  params: { locale: string; id: string };
};

export default async function ProductPage({ params: { locale, id } }: LocaleProps) {
  // Enable static rendering
  setRequestLocale(locale);

  // Fetch product details
  const productDetails = await productDetailsServices(id);

  return (
    <main className="space-y-12 mx-auto px-3 lg:px-20 lg:pt-16">
      {/* product details */}
      <section className="gap-16 grid grid-cols-1 lg:grid-cols-2 mb-[50px]">
        {/* Product gallery */}
        <ProductGallery
          title={productDetails.payload.product.title}
          imgCover={productDetails.payload.product.cover}
          images={Array(productDetails.payload.product.gallery)}
        />

        {/* Product info */}
        <ProductInfo {...productDetails?.payload.product} />
      </section>
      <section>
        {/* Product reviews  */}
        <ProductReviews productDetails={productDetails} />
        
        {/* Related products  */}
        <RelatedProducts id={productDetails.payload.product.category.id} />
      </section>
    </main>
  );
}
