'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart';
import { products } from '@/lib/data/products';
import type { Product } from '@/lib/types/product';

export function ProductGrid() {
  const addItem = useCartStore((state) => state.addItem);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
            <p className="text-lg font-bold mt-2">${product.price}</p>
            <Button
              className="w-full mt-4"
              onClick={() => addItem(product)}
            >
              Add to Cart
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}