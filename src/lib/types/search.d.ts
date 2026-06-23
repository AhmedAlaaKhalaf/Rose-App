export type TProduct = {
  id: string;
  title: string;
  cover: string;
  price: number;
  rating: number;
  ratings: number;
};

export type TProductDetails = {
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
    nextPage: number;
  };
  products: TProduct[];
};

export type TRecommendation = {
  _id: string;
  title: string;
  cover: string;
  price: number;
  priceAfterDiscount: number;
  rating: number;
  ratings: number;
  id: string;
};

export type TRecommendationResponse = {
  count: number;
  recommendations: TRecommendation[];
};
