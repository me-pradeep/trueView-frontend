"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .post("/api/verifyToken")
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        router.push("/login");
      });
  }, []);

  if (isLoading) {
    return <div className="h-screen w-screen flex items-center justify-center">
      <CircularProgress size={80} />
    </div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
