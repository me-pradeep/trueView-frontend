"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { usePathname, useRouter } from "next/navigation";
import InsightsIcon from "@mui/icons-material/Insights";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import StarRateIcon from "@mui/icons-material/StarRate";
import CommentIcon from "@mui/icons-material/Comment";
import CompareIcon from "@mui/icons-material/Compare";
import PeopleIcon from "@mui/icons-material/People";

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
    <div className="w-full border-y-2 overflow-hidden bg-white max-md:overflow-x-auto sticky bottom-0 pb-4 px-2">
      <div className="w-fit">
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => handleNavigation(newValue)}
          sx={{
            display: "flex",
            overflowX: "auto",
            flexWrap: "nowrap",
            width: "100%",
          }}
        >
          <BottomNavigationAction
            value="/"
            label="Rating"
            icon={<StarRateIcon />}
          />
          <BottomNavigationAction
            value="/users"
            label="Users"
            icon={<PeopleIcon />}
          />
          <BottomNavigationAction
            value="/insights"
            label="Insights"
            icon={<InsightsIcon />}
          />
          <BottomNavigationAction
            value="/leaderboard"
            label="Leaderboard"
            icon={<LeaderboardIcon />}
          />
          <BottomNavigationAction
            value="/comments"
            label="Comments"
            icon={<CommentIcon />}
          />
          <BottomNavigationAction
            value="/comparison"
            label="Comparison"
            icon={<CompareIcon />}
          />
        </BottomNavigation>
      </div>
    </div>
  );
}

export default NavigationBox;
