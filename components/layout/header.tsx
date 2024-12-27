'use client';

import { useState } from 'react';
import { MapPin, Search, ShoppingCart, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { LoginDialog } from '@/components/auth/login-dialog';
import { useAuth } from '@/lib/hooks/useAuth';
import { signOutUser } from '@/lib/services/auth';
import Link from 'next/link';

export default function Header() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { user } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <nav className="flex flex-col space-y-4">
              <Button variant="ghost" className="justify-start">
                Strength Equipment
              </Button>
              <Button variant="ghost" className="justify-start">
                Cardio Machines
              </Button>
              <Button variant="ghost" className="justify-start">
                Accessories
              </Button>
              <Button variant="ghost" className="justify-start">
                Nutrition
              </Button>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center space-x-4 lg:space-x-6">
          <Button variant="ghost" className="hidden md:flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">New York, NY</span>
          </Button>
          
          <div className={cn(
            "flex-1 transition-all duration-200 ease-in-out",
            isSearchFocused ? "md:w-[400px]" : "md:w-[300px]"
          )}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="w-full pl-9 pr-4"
                placeholder="Search for products or categories"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="outline" onClick={signOutUser}>
                Sign Out
              </Button>
            </div>
          ) : (
            <LoginDialog />
          )}
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}