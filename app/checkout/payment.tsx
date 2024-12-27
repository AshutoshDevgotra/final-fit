'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { processPayment } from '@/lib/services/payment';
import { useAuth } from '@/lib/hooks/useAuth';
import { useCartStore } from '@/store/cart';

// Define specific error types
class PaymentError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'PaymentError';
  }
}

// Define proper types for the payment process
interface PaymentDetails {
  amount: number;
  currency: string;
  orderId: string;
  description: string;
  customerEmail: string;
  customerName: string;
}

interface PaymentResult {
  success: boolean;
  error?: string;
  transactionId?: string;
}

interface ShippingInfo {
  fullName: string;
  // Add other required shipping fields
  address?: string;
  phone?: string;
}

interface PaymentButtonProps {
  amount: number;
  orderId: string;
  shippingInfo: ShippingInfo;
}

export function PaymentButton({ amount, orderId, shippingInfo }: PaymentButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const clearCart = useCartStore((state) => state.clearCart);

  // Validate payment amount
  const validateAmount = (amount: number): boolean => {
    return amount > 0 && amount < 1000000; // Example validation
  };

  const handlePayment = async () => {
    // Check for authentication loading state
    if (isAuthLoading) {
      toast({
        title: "Please wait",
        description: "Checking authentication status...",
      });
      return;
    }

    // Check for user authentication
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to complete your purchase",
        variant: "destructive"
      });
      router.push('/login'); // Redirect to login page
      return;
    }

    // Validate amount before processing
    if (!validateAmount(amount)) {
      toast({
        title: "Invalid Amount",
        description: "The payment amount is invalid",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Ensure required fields are present
      if (!user.email || !shippingInfo.fullName) {
        throw new PaymentError("Missing required customer information");
      }

      const paymentDetails: PaymentDetails = {
        amount,
        currency: 'INR',
        orderId,
        description: `Order #${orderId}`,
        customerEmail: user.email,
        customerName: shippingInfo.fullName
      };

      const result: PaymentResult = await processPayment(paymentDetails);

      if (result.success) {
        clearCart();
        toast({
          title: "Payment Successful",
          description: `Order #${orderId} has been placed successfully`
        });
        router.push('/order-success');
      } else {
        throw new PaymentError(result.error || "Payment processing failed");
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      
      if (error instanceof PaymentError) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast({
        title: "Payment Error",
        description: errorMessage,
        variant: "destructive"
      });

      // Log error for debugging
      console.error('Payment Error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      className="w-full mt-6"
      onClick={handlePayment}
      disabled={isProcessing || isAuthLoading}
    >
      {isProcessing ? 'Processing...' : isAuthLoading ? 'Loading...' : 'Pay Now'}
    </Button>
  );
}
