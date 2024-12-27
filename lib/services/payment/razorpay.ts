'use client';

import { PaymentDetails, PaymentResult } from '@/lib/types/payment';
import { RAZORPAY_KEY_ID } from '@/lib/config/razorpay';

export const initializeRazorpaySDK = () => {
  return new Promise<boolean>((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const processRazorpayPayment = async (details: PaymentDetails): Promise<PaymentResult> => {
  try {
    const sdkReady = await initializeRazorpaySDK();
    if (!sdkReady) {
      throw new Error('Failed to load Razorpay SDK');
    }

    return new Promise((resolve) => {
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: Math.round(details.amount * 100), // Convert to smallest currency unit
        currency: details.currency,
        name: 'FitElite',
        description: details.description,
        order_id: details.orderId,
        prefill: {
          email: details.customerEmail,
          name: details.customerName,
        },
        handler: function (response: any) {
          resolve({
            success: true,
            transactionId: response.razorpay_payment_id
          });
        },
        modal: {
          ondismiss: function () {
            resolve({
              success: false,
              error: 'Payment cancelled'
            });
          }
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    });
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Payment processing failed'
    };
  }
}