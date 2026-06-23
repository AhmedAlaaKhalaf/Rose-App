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
export type TProductCard = Pick<
  TProduct,
  | "id"
  | "title"
  | "cover"
  | "createdAt"
  | "price"
  | "discountType"
  | "discountValue"
  | "stock"
  | "rating"
  | "ratings"
>;

export type TProductDetails = {
  payload: {
    product: TProduct;
  };
};
