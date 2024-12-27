import { RAZORPAY_CONFIG } from '@/lib/config/razorpay';
import { convertToSmallestUnit } from '@/lib/utils/payment';

interface PaymentOptions {
  amount: number;
  currency?: string;
  orderId: string;
  name: string;
  description: string;
  email: string;
}

export const createPayment = async ({
  amount,
  currency = 'INR',
  orderId,
  name,
  description,
  email
}: PaymentOptions): Promise<void> => {
  const options = {
    key: RAZORPAY_CONFIG.key_id,
    amount: convertToSmallestUnit(amount),
    currency,
    name,
    description,
    order_id: orderId,
    prefill: { email },
    handler: (response: any) => {
      console.log('Payment successful:', response);
      // Handle successful payment
    },
    modal: {
      ondismiss: () => {
        console.log('Payment modal closed');
      }
    }
  };

  const razorpay = new (window as any).Razorpay(options);
  razorpay.open();
};