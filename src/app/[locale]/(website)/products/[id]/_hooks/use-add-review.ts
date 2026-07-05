import { addReviewAction } from "@/lib/actions/reviews.action";
import { TReviewFields } from "@/lib/types/reviews";
import { formatApiError } from "@/lib/utils/api-error";
import { checkToken } from "@/lib/utils/check-token";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddReview() {
  const queryClient = useQueryClient();

  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: TReviewFields & { productId: string }) => {
      const token = checkToken();

      const payload = await addReviewAction(
        {
          productId: fields.productId,
          rating: fields.rating,
          headline: fields.title.trim(),
          content: fields.comment.trim(),
        },
        token
      );

      if (payload?.status === false || payload?.error) {
        throw new Error(
          formatApiError(payload, String(payload?.error ?? payload?.message ?? "Failed to add review"))
        );
      }

      return payload;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["productReviews", variables.productId] });
    },
  });

  return { isPending, error, addReview: mutate };
}
