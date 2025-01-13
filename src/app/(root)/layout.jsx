"use client";
import React, { useEffect } from "react";
import ProtectedRoute from "@/components/protectedRoute";
import Image from "next/image";
import Signout from "@/components/Signout";
import Profile from "@/components/Profile";
import { useContext } from "react";
import { UserContext } from "@/context";
import Search from "@/components/Search";

function layout({ children }) {
  const {user}=useContext(UserContext);
  useEffect(() => {
    let {photoURL,username}=user;

    //store in localstorage so that next time when there is no searchParams then also we can access them.
    if (photoURL && username) {
      localStorage.setItem("photoURL", photoURL);
      localStorage.setItem("username", username);
    }
  }, []);
  return (
    <ProtectedRoute>
      <div className="w-full h-screen overflow-hidden bg-slate-200 flex flex-col items-center">
        <header className="flex items-center justify-center w-full border-b-2 bg-white">
          <nav className="flex w-[60%] justify-between items-center m-3 max-lg:w-[80%] max-md:[w-95%]">
            <div className="flex items-center text-3xl playwrite-in-custom text-[#6C1992] gap-1">
              <Image
                width={50}
                height={50}
                src="/trueView-removebg.png"
                alt="TrueView"
              />
              TrueView
            </div>
            <Search/>
            <Signout />
          </nav>
        </header>
        <Profile/>
      </div>
    </ProtectedRoute>
  );
}

export default layout;
