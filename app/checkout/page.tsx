'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/hooks/useAuth';
import { createOrder } from '@/lib/services/orders';
import { PaymentButton } from './payment';

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
  });
  
  const { items } = useCartStore();
  const { user } = useAuth();
  const router = useRouter();
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCreateOrder = async () => {
    try {
      setIsProcessing(true);
      
      const orderId = await createOrder({
        userId: user?.uid || 'guest',
        items,
        total,
        shippingAddress: shippingInfo,
        status: 'pending',
      });

      return orderId;
    } catch (error) {
      console.error('Order creation error:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user) {
    router.push('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="space-y-4">
              <Input 
                placeholder="Full Name"
                value={shippingInfo.fullName}
                onChange={(e) => setShippingInfo(prev => ({
                  ...prev,
                  fullName: e.target.value
                }))}
              />
              <Input 
                placeholder="Address"
                value={shippingInfo.address}
                onChange={(e) => setShippingInfo(prev => ({
                  ...prev,
                  address: e.target.value
                }))}
              />
              <Input 
                placeholder="City"
                value={shippingInfo.city}
                onChange={(e) => setShippingInfo(prev => ({
                  ...prev,
                  city: e.target.value
                }))}
              />
              <Input 
                placeholder="Postal Code"
                value={shippingInfo.postalCode}
                onChange={(e) => setShippingInfo(prev => ({
                  ...prev,
                  postalCode: e.target.value
                }))}
              />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <PaymentButton
            amount={total}
            orderId="temp-order-id" // This will be replaced with actual order ID
            shippingInfo={shippingInfo}
          />
        </div>
      </div>
    </div>
  );
}