"use client";

import React, { useEffect, useState,useContext} from "react";
import Image from "next/image";
import axios from "axios";
import { Skeleton } from "@mui/material";
import { SelectedUserContext } from "@/context";


function Profile({ username }) {
  const { selectedUser} = useContext(SelectedUserContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/getUserInfo`,
          { username },{withCredentials:true}
        );
        const userData = res.data.user;

        setUser({
          userObjectId:userData._id,
          bio: userData.bio,
          username: userData.username,
          photoURL: userData.photoURL,
          numOfRatingsGiven: userData.numOfRatingsGiven,
          numOfRatingsReceived: userData.numOfRatingsReceived,
          overallRating: userData.overallRating,
          email: userData.email,
          ratingCount: userData.ratingCount,
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username,selectedUser]);

  if (loading) {
    return (
      <div className="w-[80%] bg-blue-500 rounded-lg flex justify-around gap-4 p-4 max-lg:flex-col max-lg:w-full">
        <div className="flex w-[50%] gap-4 max-md:w-full items-center justify-center">
          <Skeleton
            variant="circular"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="w-[60%] max-md:w-[80%] flex gap-2 flex-col">
            <Skeleton variant="text" width="60%" height={32} />
            <Skeleton variant="text" width="90%" height={40} />
          </div>
        </div>
        <div className=" w-[50%] flex max-lg:w-full justify-center gap-4 border-l-2 max-lg:border-l-0 max-lg:border-t-2 max-lg:pt-2 pl-4 max-md:pl-2 border-white items-center max-lg:justify-center">
          <Skeleton variant="text" width="80%" height={60} />
          <Skeleton variant="text" width="80%" height={60} />
          <Skeleton variant="text" width="80%" height={60} />
          <Skeleton variant="text" width="80%" height={60} />
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
    <div className="w-[80%] bg-blue-500 rounded-lg flex justify-around gap-4 p-4 max-lg:flex-col max-lg:w-full">
      <div className="flex gap-4 max-md:w-full items-center">
        <div className="min-h-[90px] min-w-[90px]">
          <Image
            priority
            src={photoURL}
            height={90}
            width={90}
            alt="userImage"
            className="rounded-full border-4 border-white shadow-lg"
          />
        </div>
        <div className="w-[90%] flex gap-2 flex-col">
          <div className="font-bold text-xl text-white w-fit">
            {displayUsername}
          </div>
          <div className="text-white break-words m-1">{bio}</div>
        </div>
      </div>
      <div className="flex max-lg:w-full text-white justify-center gap-4 border-l-2 max-lg:border-l-0 max-lg:border-t-2 max-lg:pt-2 pl-4 max-md:pl-2 border-white items-center max-lg:justify-center">
        <div className="flex flex-col items-center font-semibold">
          {numOfRatingsGiven}
          <div className="text-center ">Ratings Given</div>
        </div>
        <div className="flex flex-col items-center font-semibold">
          {numOfRatingsReceived}
          <div className="text-center">Ratings Received</div>
        </div>
        <div className="flex flex-col items-center font-semibold">
          {overallRating}/10
          <div className="text-center">Average Rating</div>
        </div>
        <div className="flex flex-col items-center font-semibold">
          {ratingCount}
          <div className="text-center">Rating Count</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
