"use client";

import React, { useState, useContext, useEffect } from "react";
import RatingComponent from "@/components/rating";
import { Button } from "@mui/material";
import axios from "axios";
import { SelectedUserContext, UserContext } from "@/context";
import Switch from "@mui/material/Switch";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Page() {
  const [checked, setChecked] = useState(false);
  const { selectedUser, setSelectedUser } = useContext(SelectedUserContext);
  const { user } = useContext(UserContext);
  const { userObjectId } = user;
  const { userObjectId: SelectedUserObjectId } = selectedUser;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
    const fetchRatingData = async () => {
      try {
        const res1=await axios.post("/api/getToken");
        const accessToken=res1.data.accessToken;
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rating/getratings`,
          { ratedUser: SelectedUserObjectId},{
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        const ratings = res.data.ratingData.ratings;
        setRatings({
          Appearance: ratings.Appearance,
          Intelligence: ratings.Intelligence,
          Humour: ratings.Humour,
          ContributionToSociety: ratings.ContributionToSociety,
          Ambitious: ratings.Ambitious,
          Sporty: ratings.Sporty,
          Helpfulness: ratings.Helpfulness,
          CommunicationSkills: ratings.CommunicationSkills,
          Hardworking: ratings.Hardworking,
          Creative: ratings.Creative,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchRatingData();
  }, [SelectedUserObjectId, userObjectId]);

  const checkIfAnyParameterIsEmpty = () => {
    const hasZeroOrNullRating = Object.values(ratings).some(
      (rating) => rating === 0 || rating === null
    );
    return hasZeroOrNullRating;
  };

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
    const isAnyParameterEmpty = checkIfAnyParameterIsEmpty();
    if (isAnyParameterEmpty) {
      setSnackbarMessage("All parameter must have some rating!!");
      setOpenSnackbar(true);
    } else {
      try {
        const ratedUserId = SelectedUserObjectId;
        const givenByUserId = userObjectId;

        const res1=await axios.post("/api/getToken");
        const accessToken=res1.data.accessToken;
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rating/ratinguser`,
          {
            ratedUser: ratedUserId,
            ratings,
          },{
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setSnackbarMessage("Rating submitted successfully!");
          setSelectedUser((prevState) => ({
            ...prevState,
            numOfRatingsReceived: prevState.numOfRatingsReceived + 1,
          }));

          setOpenSnackbar(true);
          setChecked(false);
        }
      } catch (error) {
        console.error("Error submitting rating:", error);
        setSnackbarMessage("Error submitting rating. Please try again.");
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <div className="w-[80%] max-xl:w-full flex items-center flex-col bg-white gap-y-5 border-blue-400 border-x-2 pb-3 rounded-lg">
      <div className="p-3 text-blue-700 font-bold text-center">
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
        <Button variant="contained" onClick={handleSubmit} disabled={!checked}>
          Submit Rating
        </Button>
      </div>
      <div className="flex flex-wrap gap-10 items-center justify-center max-lg:gap-5 p-4">
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={checkIfAnyParameterIsEmpty() ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Page;
