import React from "react";
import Link from "next/link";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body>
      <header className="border-b mx-auto">
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
              href="/signup"
              className="font-medium text-muted-foreground hover:text-primary">
              Sign up
            </Link>
            <Link
              href="/login"
              className="font-medium text-muted-foreground hover:text-primary">
              Login
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t mx-auto">
        <div className="container flex flex-col gap-2 py-4 md:py-6 px-4 md:px-6 mx-auto">
          <p className="text-xs text-center text-muted-foreground">
            © 2025 Butterfly Boutique. All rights reserved.
          </p>
        </div>
      </footer>
    </body>
  );
};

export default layout;
