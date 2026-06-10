export type   TProductCard = {
  id: string;
  title: string;
  cover: string;
  createdAt: string;
  price: string;
  discountType: string;
  discountValue: string;
  stock: number;
  rating: number;
  ratings: number;
};

export type TProduct = {
  id: string;
  title: string;
  description: string;
  rating: number;
  ratings: number;
  stock: number;
  price: string;
  discountType: string;
  discountValue: string;
  cover: string;
  gallery: string;
  categoryId: string;
  subCategoryId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    title: string;
  };
  subCategory: {
    id: string;
    title: string;
  };
  occasions: string[];
  _count: {
    reviews: number;
    cartItems: number;
    wishlistItems: number;
  };
};

export type TProductDetails = {
  payload: {
    product: TProduct;
  };
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
