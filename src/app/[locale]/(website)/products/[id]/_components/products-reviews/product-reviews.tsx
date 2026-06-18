import { TProductDetails } from "@/lib/types/product";
import Reviews from "./reviews";
import ReviewsHeader from "./reviews-header";
import ReviewForm from "./review-form";

type ReviewsProps = {
  productDetails: SuccessfulResponse<TProductDetails>;
};

export default async function ProductReviews({ productDetails }: ReviewsProps) {
  // Variables
  const {
    payload: { product },
  } = productDetails;

  return (
    <>
      {/* Section Header */}
      <ReviewsHeader rateAvg={product?.rating} rateCount={product?.ratings} />

      {/* Section Content */}
      <div className="lg:grid lg:grid-cols-12 lg:grid-cols-12">
        {/* Product reviews */}
        <Reviews productId={product?.id} />

        {/* Review form  */}
        <ReviewForm id={product?.id} />
      </div>
    </>
  );
}
