import React from "react";
import RatingComponent from "@/components/rating";

function page() {
  return (
    <div className="w-[80%] max-lg:w-full flex items-center flex-col bg-white gap-y-5 border-blue-400 border-x-2 pb-3 rounded-lg">
      <div className="text-blue-700 font-bold p-4 text-center">
        You can't rate yourself 😔,
        but share your <span className="text-red-700">username</span> to others so that they can rate you 😀
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
