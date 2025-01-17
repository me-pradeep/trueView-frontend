"use client";
import React from "react";
import Rating from "@/components/rating";
import Profile from "@/components/Profile";
import { useContext } from "react";
import { UserContext } from "@/context";

function page() {
  const { user}=useContext(UserContext);
  const {username}=user
  return (
    <>
      <Profile username={username} />
      <Rating />
    </>
  );
}

export default page;
