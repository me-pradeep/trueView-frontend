"use client";

import React from "react";
import { useParams } from "next/navigation";

const UserPage = () => {
  const { username } = useParams();

  return <div>Username: {username}</div>;
};

export default UserPage;
