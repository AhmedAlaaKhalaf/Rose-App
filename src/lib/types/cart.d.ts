import type { TProduct } from "./product";

export type TCartItem = {
  product: TProduct;
  price: number;
  quantity: number;
  _id: string;
};

export type TUserCart = {
  message: string;
  numOfCartItems: number;
  cart: {
    _id: string;
    user: string;
    cartItems: TCartItem[];
    appliedCoupons: string[];
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};