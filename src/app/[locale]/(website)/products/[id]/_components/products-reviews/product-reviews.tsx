import { TProductDetails } from "@/lib/types/product";
import Reviews from "./reviews";
import ReviewsHeader from "./reviews-header";
import ReviewForm from "./review-form";

type ReviewsProps = {
  productDetails: SuccessfulResponse<TProductDetails>;
};

export default async function ProductReviews({ productDetails }: ReviewsProps) {
  const {
    payload: { product },
  } = productDetails;

  return (
    <section className="space-y-8">
      <ReviewsHeader rateAvg={product.rating} rateCount={product.ratings} />

      <div className="gap-8 lg:gap-10 grid lg:grid-cols-[minmax(0,1fr)_380px] items-start">
        <Reviews productId={product.id} />
        <ReviewForm id={product.id} />
      </div>
    </section>
  );
}
