'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { createPayment } from '@/lib/services/payment';  // Changed this line to match your service
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

    if (!user.email) {
      toast({
        title: "Email Required",
        description: "Your account must have an email to process payment",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      await createPayment({
        amount,
        orderId,
        name: "Final Fit", // Your store name
        description: `Order #${orderId}`,
        email: user.email,
      });
      
      // Success handling will be done in the Razorpay handler

    } catch (error) {
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      });
      console.error('Payment Error:', error);
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
