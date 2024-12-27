import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dumbbell, Heart, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-emerald-900 to-emerald-700 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Transform Your Fitness Journey</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Premium equipment for those who demand excellence in their workout
          </p>
          <Button size="lg" className="bg-white text-emerald-900 hover:bg-gray-100">
            Shop Now
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Dumbbell className="h-12 w-12 mb-4 text-emerald-600" />
              <h3 className="text-xl font-semibold mb-2">Premium Equipment</h3>
              <p className="text-gray-600">
                Professional-grade fitness equipment designed for performance
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Heart className="h-12 w-12 mb-4 text-emerald-600" />
              <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
              <p className="text-gray-600">
                Personalized support from certified fitness professionals
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Zap className="h-12 w-12 mb-4 text-emerald-600" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable shipping to your doorstep
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Products</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden group">
                <div className="aspect-square relative bg-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Premium Fitness Product</h3>
                  <p className="text-gray-600 mb-4">$299.99</p>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}