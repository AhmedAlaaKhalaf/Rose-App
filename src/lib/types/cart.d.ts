export type TCartProduct = {
  id: string;
  title: string;
  cover: string;
  price: string;
};

export type TCartItem = {
  id: string;
  product: TCartProduct;
  price: number;
  quantity: number;
};

export type TUserCart = {
  message: string;
  numOfCartItems: number;
  cart: {
    id: string;
    userId: string;
    cartItems: TCartItem[];
    appliedCoupons: string[];
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
  };
};
