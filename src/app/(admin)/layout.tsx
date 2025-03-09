import React from "react";
import Link from "next/link";
import User from "@/components/layoutUser/user/User";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body>
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight">
              Butterfly Boutique
            </span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm items-center">
            <Link href="/admin" className="font-medium">
              Home
            </Link>
            <Link
              href="/admin/products"
              className="font-medium text-muted-foreground hover:text-primary">
              Products
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <User />
          </div>
        </div>
      </header>
      {children}
    </body>
  );
};

export default layout;
