export type TProductCard = {
  _id: string;
  title: string;
  imgCover: string;
  createdAt: string;
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  sold: number;
  rateAvg: number;
  rateCount: number;
};

export type TProduct = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  sold: number;
  category: string;
  occasion: string;
  rateAvg: number;
  rateCount: number;
  isSuperAdmin: boolean;
  isInWishlist: boolean;
  favoriteId: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TProductDetails = {
  product: TProduct;
};

export type TAllProducts = {
  message: string;
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
    nextPage?: number;
  };
  products: TProductCard[];
};
