import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface OrderData {
  userId: string;
  items: any[];
  total: number;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
  };
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
}

export const createOrder = async (orderData: OrderData) => {
  try {
    const ordersRef = collection(db, 'orders');
    const order = await addDoc(ordersRef, {
      ...orderData,
      createdAt: serverTimestamp(),
    });
    return order.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};