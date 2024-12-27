'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { processPayment } from '@/lib/services/payment';
import { useAuth } from '@/lib/hooks/useAuth';
import { useCartStore } from '@/store/cart';

interface PaymentButtonProps {
  amount: number;
  orderId: string;
  shippingInfo: {
    fullName: string;
  };
}

export function PaymentButton({ amount, orderId, shippingInfo }: PaymentButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const clearCart = useCartStore((state) => state.clearCart);

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to complete your purchase",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      const result = await processPayment({
        amount,
        currency: 'INR',
        orderId,
        description: `Order #${orderId}`,
        customerEmail: user.email || '',
        customerName: shippingInfo.fullName
      });

      if (result.success) {
        clearCart();
        toast({
          title: "Payment Successful",
          description: "Your order has been placed successfully"
        });
        router.push('/order-success');
      } else {
        toast({
          title: "Payment Failed",
          description: result.error || "Please try again",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      className="w-full mt-6"
      onClick={handlePayment}
      disabled={isProcessing}
    >
      {isProcessing ? 'Processing...' : 'Pay Now'}
    </Button>
  );
}