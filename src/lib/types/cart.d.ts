export type TCartProduct = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  discount: number;
  rateAvg: number;
  rateCount: number;
  sold: number;
  quantity: number;
  category: string;
  occasion: string;
  isSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};
export type TCartItem = {
  product: TCartProduct;
  price: number;
  quantity: number;
  _id: string;
};

export type TUserCart = {
  numOfCartItems: number;
  cart: {
    _id: string;
    user: string;
    cartItems: TCartItem[];
    appliedCoupons: string[];
    discount: number;
    totalPrice: number;
    totalPriceAfterDiscount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};
