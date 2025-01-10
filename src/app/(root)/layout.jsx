import React from "react";
import ProtectedRoute from "@/components/protectedRoute";

function layout({ children }) {
  return (
    <ProtectedRoute>
      <div>layout for root {children}</div>
    </ProtectedRoute>
  );
}

export default layout;
