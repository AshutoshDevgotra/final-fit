export interface PaymentDetails {
  amount: number;
  currency: string;
  orderId: string;
  description: string;
  customerEmail: string;
  customerName: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}