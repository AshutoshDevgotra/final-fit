import { RAZORPAY_CONFIG } from '@/lib/config/razorpay';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

export const convertToSmallestUnit = (amount: number): number => {
  return Math.round(amount * 100); // Convert to paise for Razorpay
};