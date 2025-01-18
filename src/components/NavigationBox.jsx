import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";
import InsightsIcon from "@mui/icons-material/Insights";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import StarRateIcon from "@mui/icons-material/StarRate";
import CommentIcon from "@mui/icons-material/Comment";
import CompareIcon from "@mui/icons-material/Compare";

function NavigationBox() {
  const [value, setValue] = useState();
  return (
    <div className="w-[80%] max-lg:w-[80%] max-md:w-[100%] border-y-2">
      <Box sx={{ width:"100%"}}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            console.log(value);
          }}
        >
          <BottomNavigationAction label="Rating" icon={<StarRateIcon />} />
          <BottomNavigationAction label="Insights" icon={<InsightsIcon />} />
          <BottomNavigationAction
            label="Leaderboard"
            icon={<LeaderboardIcon />}
          />
          <BottomNavigationAction label="Comments" icon={<CommentIcon />} />
          <BottomNavigationAction label="Comparison" icon={<CompareIcon />} />
        </BottomNavigation>
      </Box>
    </div>
  );
}

export default NavigationBox;
