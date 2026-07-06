export type TPayCreditResponse = {
  message: string;
  orderId: string;
  checkoutUrl?: string;
  clientSecret?: string;
  publishableKey?: string;
  paymentIntentId?: string;
};
