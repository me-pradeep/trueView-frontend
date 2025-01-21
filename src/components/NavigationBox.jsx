"use client";

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { usePathname, useRouter } from "next/navigation";
import InsightsIcon from "@mui/icons-material/Insights";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import StarRateIcon from "@mui/icons-material/StarRate";
import CommentIcon from "@mui/icons-material/Comment";
import CompareIcon from "@mui/icons-material/Compare";
import PeopleIcon from "@mui/icons-material/People";
import { Padding } from "@mui/icons-material";

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

  const buttonStyles = (path) => ({
    backgroundColor: value === path ? "#e0e0e0" : "transparent",
    fontWeight: value === path ? "bold" : "normal",
    width: "100%",
    color: value === path ? "#2471ed" : "#757575",
    padding:"16px 0"
  });

  return (
    <div className="w-full border-y-2 flex justify-center overflow-hidden bg-white max-md:overflow-x-auto sticky bottom-0">
      <div className="w-[80%] flex p-4 justify-around max-md:w-full">
        <Button
          onClick={() => handleNavigation("/")}
          startIcon={<StarRateIcon />}
          sx={buttonStyles("/")}
        >
          <div className="max-md:hidden">Rating</div>
        </Button>
        <Button
          onClick={() => handleNavigation("/users")}
          startIcon={<PeopleIcon />}
          sx={buttonStyles("/users")}
        >
          <div className="max-md:hidden">Users</div>
        </Button>
        <Button
          onClick={() => handleNavigation("/insights")}
          startIcon={<InsightsIcon />}
          sx={buttonStyles("/insights")}
        >
          <div className="max-md:hidden">Insights</div>
        </Button>
        <Button
          onClick={() => handleNavigation("/leaderboard")}
          startIcon={<LeaderboardIcon />}
          sx={buttonStyles("/leaderboard")}
        >
          <div className="max-md:hidden">Leaderboard</div>
        </Button>
        <Button
          onClick={() => handleNavigation("/comments")}
          startIcon={<CommentIcon />}
          sx={buttonStyles("/comments")}
        >
          <div className="max-md:hidden">Comments</div>
        </Button>
        <Button
          onClick={() => handleNavigation("/comparison")}
          startIcon={<CompareIcon />}
          sx={buttonStyles("/comparison")}
        >
          <div className="max-md:hidden">Comparison</div>
        </Button>
      </div>
    </div>
  );
}

export default NavigationBox;
