import { TProduct } from "@/lib/types/product";
export type TAddToCartResponse = {
  message: string;
  numOfCartItems: number;
  cart: Cart;
};

export type TCart = {
  _id: string;
  user: string;
  cartItems: CartItem[];
  appliedCoupons: any[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
};

export type TCartItem = {
  _id: string;
  quantity: number;
  price: number;
  product: TProduct;
};

export type TAddToCartPayload = {
  product: string;
  quantity: number;
};
