export type TWishlistItem = {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  product: {
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
  };
};

export type TLocaleWishlistItem = {
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
};

export type TWishlist = {
  wishlistItems: TWishlistItem[];
};
