"use client"
import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";
import { usePathname,useRouter } from "next/navigation";
import InsightsIcon from "@mui/icons-material/Insights";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import StarRateIcon from "@mui/icons-material/StarRate";
import CommentIcon from "@mui/icons-material/Comment";
import CompareIcon from "@mui/icons-material/Compare";

function NavigationBox() {
  const pathname=usePathname();
  const router=useRouter();
  const [value, setValue] = useState(pathname);
  return (
    <div className="w-[80%] max-lg:w-[80%] max-md:w-[100%] border-y-2 overflow-x-hidden bg-white max-md:overflow-x-auto">
      <Box sx={{ width:"100%",marginX:1}}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            router.push(newValue);
          }}
        >
          <BottomNavigationAction value="/" label="Rating" icon={<StarRateIcon />} />
          <BottomNavigationAction value="/insights" label="Insights" icon={<InsightsIcon />} />
          <BottomNavigationAction value="/leaderboard"
            label="Leaderboard"
            icon={<LeaderboardIcon />}
          />
          <BottomNavigationAction value="/comments" label="Comments" icon={<CommentIcon />} />
          <BottomNavigationAction value="/comparison" label="Comparison" icon={<CompareIcon />} />
        </BottomNavigation>
      </Box>
    </div>
  );
}

export default NavigationBox;
