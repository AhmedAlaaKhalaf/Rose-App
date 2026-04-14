import { TProductDetails } from "@/lib/types/product";
import ReviewForm from "./review-form";
import Reviews from "./reviews";
import ReviewsHeader from "./reviews-header";

type ReviewsProps = {
  productDetails: SuccessfulResponse<TProductDetails>;
};

export default async function ProductReviews({ productDetails }: ReviewsProps) {
  // Variables
  const {
    payload: { product },
  } = productDetails;

  return (
    <section className="space-y-4 grid grid-cols-[50px_minmax(765px,_1fr)_484px]">
      {/* Section Header */}
      <ReviewsHeader rateAvg={product?.rating} rateCount={product?.ratings} />

      {/* Section Content */}
      <Reviews productId={product?.id} />
      <ReviewForm id={product?.id} />
    </section>
  );
}
