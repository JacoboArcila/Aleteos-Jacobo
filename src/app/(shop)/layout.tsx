import React from "react";
import Link from "next/link";
import LayoutUser from "@/components/layoutUser/layoutUser";
import LayoutLogout from "@/components/layoutLogout/LayoutLogout";

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
          <nav className="hidden md:flex gap-6 text-sm items-center">
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
          </nav>
          <div className="flex items-center gap-4">
            <LayoutLogout />
            <LayoutUser />
          </div>
        </div>
      </header>
      {children}
    </body>
  );
};

export default layout;
