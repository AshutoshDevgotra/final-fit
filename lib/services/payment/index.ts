'use client';

import { PaymentDetails, PaymentResult } from '@/lib/types/payment';
import { processRazorpayPayment } from './razorpay';

export const processPayment = async (details: PaymentDetails): Promise<PaymentResult> => {
  try {
    const result = await processRazorpayPayment(details);
    return result;
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Payment processing failed'
    };
  }
}