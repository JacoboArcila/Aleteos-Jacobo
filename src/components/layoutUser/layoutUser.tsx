import React from "react";
import User from "./user/User";
import Cart from "./cart/Cart";

function layoutUser() {
  return (
    <div className="flex items-center justify-center gap-4">
      <User />
      <Cart />
    </div>
  );
}

export default layoutUser;
