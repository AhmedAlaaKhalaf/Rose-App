import { getProductReviews } from "@/lib/apis/product-reviews";
import { useQuery } from "@tanstack/react-query";

export function useProductReviews(productId: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["productReviews"],
    queryFn: () => getProductReviews(productId),
    staleTime: 120 * 1000,
  });

  return { reviewsOfProduct: data, isLoading, error, refetch };
}
 