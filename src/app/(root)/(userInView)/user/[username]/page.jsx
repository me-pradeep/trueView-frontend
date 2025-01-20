import React from "react";
import RatingComponent from "@/components/rating";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function page() {
  return (
    <div className="w-[80%] max-lg:w-full flex items-center flex-col bg-white gap-y-5 border-blue-400 border-x-2 pb-3 rounded-lg">
      <div className="pt-3 text-blue-700 font-bold">Please be honest while rating 🥹</div>
      <div className="gap-4 flex">
        <Button className="gap-4" variant="contained"><EditIcon/> Edit</Button>
        <Button variant="contained">Submit Rating</Button>
      </div>
      <div className="flex flex-wrap gap-10 items-center justify-center max-lg:gap-5">
        <RatingComponent parameterName="Appearance" />
        <RatingComponent parameterName="Intelligence" />
        <RatingComponent parameterName="Humuor" />
        <RatingComponent parameterName="ContributionToSociety" />
        <RatingComponent parameterName="Ambitious" />
        <RatingComponent parameterName="Sporty" />
        <RatingComponent parameterName="Helpfullness" />
        <RatingComponent parameterName="CommunicationSkills" />
        <RatingComponent parameterName="Hardworking" />
        <RatingComponent parameterName="Creative" />
      </div>
      
    </div>
  );
}

export default page;
