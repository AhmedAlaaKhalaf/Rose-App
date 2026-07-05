import z from "zod";
import { reviewSchema } from "../schemes/reviews.schema";

export type TReview = {
  id: string;
  userId: string;
  productId: string;
  headline: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    photo?: string;
  };
  product: {
    id: string;
    title: string;
  };
};

export type TReviews = {
  reviews: TReview[];
};

export type TReviewFields = z.infer<ReturnType<typeof reviewSchema>>;
