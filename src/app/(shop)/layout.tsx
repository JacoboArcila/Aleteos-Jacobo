import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body>
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight">
              Butterfly Boutique
            </span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/" className="font-medium">
              Home
            </Link>
            <Link
              href="/products"
              className="font-medium text-muted-foreground hover:text-primary">
              Shop
            </Link>
            <Link
              href="/about"
              className="font-medium text-muted-foreground hover:text-primary">
              About
            </Link>
            <Link
              href="/contact"
              className="font-medium text-muted-foreground hover:text-primary">
              Contact
            </Link>
            <Link
              href="/login"
              className="font-medium text-muted-foreground hover:text-primary">
              Login
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  3
                </span>
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>
      {children}
    </body>
  );
};

export default layout;
