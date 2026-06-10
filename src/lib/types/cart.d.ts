export type TCartProduct = {
  id: string;
  title: string;
  description: string;
  rating: number;
  ratings: number;
  stock: number;
  price: string;
  discountType: "PERCENT" | "FIXED";
  discountValue: string;
  cover: string;
  gallery: string;
  categoryId: string;
  quantity: number;
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
export type TCartItem = {
  product: TCartProduct;
  price: number;
  quantity: number;
  _id: string;
};

export type TUserCart = {
  payload: {
    cartItems: TCartProduct[];
  };
};
