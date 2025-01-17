"use client"
import Image from "next/image";
import React from "react";
import Google from "@/components/google";
import Link from "next/link";
import axios from "axios";
import { useEffect,useState } from "react";

function page() {

  const [isAuthenticated,setIsAuthenticated]=useState(false);

  useEffect(() => {
    axios
      .post("/api/verifyToken")
      .then(() => {
        setIsAuthenticated(true)
      })
      .catch((err) => {
        setIsAuthenticated(false)
      });
  }, []);
  return (
    <>
      <Image
        src="/rating.svg"
        height={400}
        width={400}
        alt="rating"
        className="max-md:w-72 max-md:h-auto"
        priority
      />
      <div className="text-center text-4xl font-bold w-[50%] max-xl:w-[70%] max-lg:w-[80%] max-lg:text-3xl max-md:w-[90%] max-md:text-2xl">
        Discover, <span className="text-red-400">Review</span>, and{" "}
        <span className="text-red-400">Rate</span> People <span className="text-red-400">Anonymously</span>, at Any
        Time.
      </div>
      <Google />

      <Link className="bg-red-400 p-3 text-white rounded-xl font-bold" href="/">Go to Home Page</Link>
      <div>{isAuthenticated?"You are now authenticated Please click Go to Home page":"Please click login"}</div>
    </>
  );
}

export default page;
