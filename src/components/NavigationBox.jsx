"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import InsightsIcon from "@mui/icons-material/Insights";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import StarRateIcon from "@mui/icons-material/StarRate";
import CommentIcon from "@mui/icons-material/Comment";
import CompareIcon from "@mui/icons-material/Compare";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";

function NavigationBox() {
  const pathname = usePathname();
  const router = useRouter();

  const getNavigationValue = (path) => {
    if (path.includes("/insights")) return "/insights";
    if (path.includes("/leaderboard")) return "/leaderboard";
    if (path.includes("/comments")) return "/comments";
    if (path.includes("/comparison")) return "/comparison";
    if (path.includes("/users")) return "/users";
    return "/";
  };

  const [value, setValue] = useState(getNavigationValue(pathname));

  useEffect(() => {
    setValue(getNavigationValue(pathname));
  }, [pathname]);

  const baseRoute = pathname.startsWith("/user/")
    ? pathname.split("/").slice(0, 3).join("/")
    : "";

  const handleNavigation = (newValue) => {
    const targetPath = baseRoute ? `${baseRoute}${newValue}` : newValue;
    router.push(targetPath);
  };

  return (
    <div className="w-full border-t-2 flex justify-center overflow-hidden bg-white max-md:overflow-x-auto sticky bottom-0">
      <div className="w-[80%] flex p-4 justify-around max-xl:w-full items-center max-md:gap-2">
        
        {/* Rating Button */}
        <button
          onClick={() => handleNavigation("/")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md ${value === "/" ? "bg-gray-200 font-bold text-blue-600" : "text-gray-600"} hover:bg-gray-100`}
        >
          <StarRateIcon />
          <span className="max-lg:hidden">Rating</span>
        </button>

        {/* Users Button */}
        <button
          onClick={() => handleNavigation("/users")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md ${value === "/users" ? "bg-gray-200 font-bold text-blue-600" : "text-gray-600"} hover:bg-gray-100`}
        >
          <PeopleIcon />
          <span className="max-lg:hidden">Users</span>
        </button>

        {/* Insights Button */}
        <button
          onClick={() => handleNavigation("/insights")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md ${value === "/insights" ? "bg-gray-200 font-bold text-blue-600" : "text-gray-600"} hover:bg-gray-100`}
        >
          <InsightsIcon />
          <span className="max-lg:hidden">Insights</span>
        </button>

        {/* Home Button */}
        <Link href="/" className="bg-blue-600 rounded-full h-12 w-12 flex items-center justify-center shrink-0 my-1">
          <HomeIcon className="text-white text-3xl" />
        </Link>

        {/* Leaderboard Button */}
        <button
          onClick={() => handleNavigation("/leaderboard")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md ${value === "/leaderboard" ? "bg-gray-200 font-bold text-blue-600" : "text-gray-600"} hover:bg-gray-100`}
        >
          <LeaderboardIcon />
          <span className="max-lg:hidden">Leaderboard</span>
        </button>

        {/* Comments Button */}
        <button
          onClick={() => handleNavigation("/comments")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md ${value === "/comments" ? "bg-gray-200 font-bold text-blue-600" : "text-gray-600"} hover:bg-gray-100`}
        >
          <CommentIcon />
          <span className="max-lg:hidden">Comments</span>
        </button>

        {/* Comparison Button */}
        <button
          onClick={() => handleNavigation("/comparison")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md ${value === "/comparison" ? "bg-gray-200 font-bold text-blue-600" : "text-gray-600"} hover:bg-gray-100`}
        >
          <CompareIcon />
          <span className="max-lg:hidden">Comparison</span>
        </button>

      </div>
    </div>
  );
}

export default NavigationBox;
