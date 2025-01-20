"use client";

import React, { useState, useContext, useEffect } from "react";
import RatingComponent from "@/components/rating";
import { Button } from "@mui/material";
import axios from "axios";
import { SelectedUserContext, UserContext } from "@/context";
import Switch from "@mui/material/Switch";

function Page() {
  const [checked, setChecked] = useState(false);
  const { selectedUser } = useContext(SelectedUserContext);
  const { user } = useContext(UserContext);
  const { userObjectId } = user;
  const { userObjectId: SelectedUserObjectId } = selectedUser;
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const [ratings, setRatings] = useState({
    Appearance: 0,
    Intelligence: 0,
    Humour: 0,
    ContributionToSociety: 0,
    Ambitious: 0,
    Sporty: 0,
    Helpfulness: 0,
    CommunicationSkills: 0,
    Hardworking: 0,
    Creative: 0,
  });

  useEffect(() => {
    const hasZeroRating = Object.values(ratings).some((rating) => rating === 0);//here .some() functions will return true if any of the rating is 0.
    setIsSubmitDisabled(!checked || hasZeroRating);
  }, [checked, ratings]);

  const handleEditingOnOff = (event) => {
    setChecked(event.target.checked);
  };

  const handleRatingChange = (parameter, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [parameter]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const ratedUserId = SelectedUserObjectId;
      const givenByUserId = userObjectId;

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rating/ratinguser`,
        {
          ratedUser: ratedUserId,
          givenBy: givenByUserId,
          ratings,
        }
      );

      if (response.status === 200) {
        alert("Rating submitted successfully!");
        setChecked(false);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Error submitting rating. Please try again.");
    }
  };

  return (
    <div className="w-[80%] max-lg:w-full flex items-center flex-col bg-white gap-y-5 border-blue-400 border-x-2 pb-3 rounded-lg">
      <div className="pt-3 text-blue-700 font-bold text-center">
        Please be honest while rating 🥹. And yes, no one will know 🤫 the
        ratings you give.
      </div>
      <div className="flex justify-between w-[90%]">
        <div className="flex items-center">
          <Switch
            id="ratingOnOff"
            checked={checked}
            onChange={handleEditingOnOff}
          />
          <p className="text-red-500 font-bold">
            {checked ? "Rating ON" : "Rating OFF"}
          </p>
        </div>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          Submit Rating
        </Button>
      </div>
      <div className="flex flex-wrap gap-10 items-center justify-center max-lg:gap-5">
        {[
          "Appearance",
          "Intelligence",
          "Humour",
          "ContributionToSociety",
          "Ambitious",
          "Sporty",
          "Helpfulness",
          "CommunicationSkills",
          "Hardworking",
          "Creative",
        ].map((param) => (
          <RatingComponent
            key={param}
            parameterName={param}
            value={ratings[param]}
            onRatingChange={handleRatingChange}
            isDisabled={!checked}
          />
        ))}
      </div>
    </div>
  );
}

export default Page;
