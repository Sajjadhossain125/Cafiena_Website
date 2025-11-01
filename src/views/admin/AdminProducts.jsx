import React from "react";
import { Outlet } from "react-router-dom";

export default function AdminProducts() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Products</h2>
      <Outlet />
    </div>
  );
}
