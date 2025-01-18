"use client";
import React from "react";
import ProtectedRoute from "@/components/protectedRoute";
import Image from "next/image";
import Signout from "@/components/Signout";
import Search from "@/components/Search";
import NavigationBox from "@/components/NavigationBox";

function layout({ children }) {
  return (
    <ProtectedRoute>
      <div className="w-full h-full overflow-hidden bg-slate-200 flex flex-col items-center">
        <header className="flex items-center justify-center w-full border-b-2 bg-white sticky top-0">
          <nav className="flex w-[80%] items-center m-3 max-lg:w-[80%] max-md:w-[95%] justify-between">
            <div className="flex items-center text-3xl playwrite-in-custom text-[#6C1992] gap-1">
              <Image
                priority
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
        <NavigationBox/>
      </div>
    </ProtectedRoute>
  );
}

export default layout;
