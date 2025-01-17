"use client";
import React from "react";
import ProtectedRoute from "@/components/protectedRoute";
import Image from "next/image";
import Signout from "@/components/Signout";
import Search from "@/components/Search";
import { useContext } from "react";
import { UserContext } from "@/context";
import { useEffect } from "react";
import axios from "axios";

function layout({ children }) {
  const {setUser} = useContext(UserContext);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.post("/api/verifyToken");
        const email = res.data.email;
        const res2 = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/getUserInfo`,
          { email }
        );
        const userData = res2.data.user;

        const {
          bio,
          username,
          photoURL,
          numOfRatingsGiven,
          numOfRatingsReceived,
          overallRating,
          email: userEmail, // Renaming while destructuring to avoid shadowing
          ratingCount,
        } = userData;

        setUser({
          bio,
          username,
          photoURL,
          numOfRatingsGiven,
          numOfRatingsReceived,
          overallRating,
          email: userEmail,
          ratingCount,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);
  
  return (
    <ProtectedRoute>
      <div className="w-full h-screen overflow-hidden bg-slate-200 flex flex-col items-center">
        <header className="flex items-center justify-center w-full border-b-2 bg-white">
          <nav className="flex w-[80%] items-center m-3 max-lg:w-[80%] max-md:w-[95%] justify-between">
            <div className="flex items-center text-3xl playwrite-in-custom text-[#6C1992] gap-1">
              <Image
                width={50}
                height={50}
                src="/trueView-removebg.png"
                alt="TrueView"
                style={{ width: "auto", height: "auto" }}
              />
              TrueView
            </div>
            <div className="flex gap-4 items-center">
              <Search />
              <Signout />
            </div>
          </nav>
        </header>
        {children}
      </div>
    </ProtectedRoute>
  );
}

export default layout;
