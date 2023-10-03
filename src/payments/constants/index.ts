export enum PaymentStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export type PaymentCheckoutType = {
  checkoutId: string;
  userId: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  adminId: string;
  quantity: number;
  status: PaymentStatus;
};
