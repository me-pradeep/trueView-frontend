"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Skeleton } from "@mui/material";

function Profile({ username }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/getUserInfo`,
          { username }
        );
        const userData = res.data.user;

        setUser({
          bio: userData.bio,
          username: userData.username,
          photoURL: userData.photoURL,
          numOfRatingsGiven: userData.numOfRatingsGiven,
          numOfRatingsReceived: userData.numOfRatingsReceived,
          overallRating: userData.overallRating,
          email: userData.email,
          ratingCount:userData.ratingCount,
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);
  
  if (loading) {
    return (
      <div className="w-[80%] max-lg:w-[80%] max-md:w-[100%] bg-white rounded-lg flex m-4 gap-4 p-4">
        <Skeleton
          variant="circular"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="w-[40%] max-md:w-[80%] flex gap-2 flex-col">
          <Skeleton variant="text" width="40%" height={32} />
          <Skeleton variant="text" width="80%" height={40} />
        </div>
      </div>
    );
  }

  if (!user) {
    return <div>No user found!</div>;
  }

  const {
    bio,
    username: displayUsername,
    photoURL,
    numOfRatingsGiven,
    numOfRatingsReceived,
    overallRating,
    ratingCount,
  } = user;

  return (
    <div className="w-[80%] bg-white rounded-lg flex m-4 gap-4 p-4 max-lg:flex-col max-lg:w-full">
      <div className="flex gap-4 max-md:w-full">
        <div>
          <Image
            priority
            src={photoURL}
            height={100}
            width={100}
            alt="userImage"
            className="rounded-full border-4 border-white shadow-lg"
          />
        </div>
        <div className="w-[90%] flex gap-2 flex-col">
          <div className="font-bold text-xl text-slate-400 w-fit">
            {displayUsername}
          </div>
          <div className="text-slate-500">{bio}</div>
        </div>
      </div>
      <div className=" flex max-lg:w-full justify-center gap-4 border-l-2 max-lg:border-l-0 max-lg:border-t-2 max-lg:pt-2 pl-2 border-slate-400 items-center max-lg:justify-center">
        <div className="flex flex-col items-center text-slate-400 font-semibold">
          {numOfRatingsGiven}
          <div className="text-center">Total Ratings Given</div>
        </div>
        <div className="flex flex-col items-center text-slate-400 font-semibold">
          {numOfRatingsReceived}
          <div className="text-center">Total Ratings Received</div>
        </div>
        <div className="flex flex-col items-center text-slate-400 font-semibold">
          {overallRating}/10
          <div className="text-center">Your Average Rating</div>
        </div>
        <div className="flex flex-col items-center text-slate-400 font-semibold">
          {ratingCount}
          <div className="text-center">Your Rating Count</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
