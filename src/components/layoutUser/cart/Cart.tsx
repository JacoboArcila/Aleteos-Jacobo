"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/context/AuthContext";

function Cart() {
  const { user } = useAuth();
  return (
    <>
      {user && (
        <Link href="/cart">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              3
            </span>
            <span className="sr-only">Cart</span>
          </Button>
        </Link>
      )}
    </>
  );
}

export default Cart;
