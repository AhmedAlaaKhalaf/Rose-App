import { getProducts } from "@/lib/services/product.service";
// import { getProductsYouMayLike } from "@/lib/services/products-you-may-like.service";
import { useQuery } from "@tanstack/react-query";

type TSearchParams = {
  status: string;
};

export function useProductsYouMayLike({ status }: TSearchParams) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["mayLike", status],
    queryFn: async () => {
      if (status === "unauthenticated") {
        return await getProducts({
          limit: "6",
        });
      } else {
        // return getProductsYouMayLike();
        return await getProducts({
          limit: "6",
        });
      }
    },
    staleTime: 60 * 1000,
  });

  return { youLike: data?.payload.data, youLikeError: error, youLikeLoading: isLoading };
}
