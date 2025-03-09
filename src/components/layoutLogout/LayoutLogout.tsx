"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
function LayoutLogout() {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <div>
      {!user && (
        <Button size="lg" onClick={() => router.push("/login")}>
          Login
        </Button>
      )}
    </div>
  );
}

export default LayoutLogout;
