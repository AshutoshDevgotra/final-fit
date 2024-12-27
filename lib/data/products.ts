import { Product } from '@/lib/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Dumbbell Set',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c',
    category: 'equipment',
    description: 'Professional-grade adjustable dumbbell set'
  },
  {
    id: '2',
    name: 'Resistance Bands Pack',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1598632640487-6ea4a5e8d6c0',
    category: 'accessories',
    description: 'Set of 5 resistance bands with different strengths'
  },
  {
    id: '3',
    name: 'Performance Training Shirt',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820',
    category: 'clothing',
    description: 'Moisture-wicking athletic shirt for maximum comfort'
  },
  {
    id: '4',
    name: 'Whey Protein Powder',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f',
    category: 'nutrition',
    description: 'Premium whey protein for muscle recovery'
  }
];