import React from "react";
import RatingComponent from "@/components/rating";

function page() {
  return (
    <div className="">
      <RatingComponent parameterName="Appearance" />
      <RatingComponent parameterName="Intelligence" />
      <RatingComponent parameterName="Humuor" />
      <RatingComponent parameterName="Contribution to Society" />
      <RatingComponent parameterName="Abmitious" />
      <RatingComponent parameterName="Sporty" />
      <RatingComponent parameterName="Helping Nature" />
      <RatingComponent parameterName="Communication Skills" />
      <RatingComponent parameterName="Hardworking" />
      <RatingComponent parameterName="Creative" />{" "}
    </div>
  );
}

export default page;
