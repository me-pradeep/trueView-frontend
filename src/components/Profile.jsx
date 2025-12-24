"use client";

import React, { useEffect, useState,useContext} from "react";
import Image from "next/image";
import axios from "axios";
import { Skeleton } from "@mui/material";
import EditProfile from "./EditProfile";
import { SelectedUserContext } from "../context/Usercontext";

function Profile({ username }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [loggedInUserprofileUpdated,setProfileUpdated]=useState(false);
  const {selectedUser}=useContext(SelectedUserContext);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res1 = await axios.post("/api/getToken");
        const accessToken = res1.data.accessToken;
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/getUserInfo`,
          { username },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        const userData = res.data.user;

        setUser({
          userObjectId: userData._id,
          bio: userData.bio,
          username: userData.username,
          photoURL: userData.photoURL,
          numOfRatingsGiven: userData.numOfRatingsGiven,
          numOfRatingsReceived: userData.numOfRatingsReceived,
          overallRating: userData.overallRating,
          ratingCount: userData.ratingCount,
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username,loggedInUserprofileUpdated,selectedUser]);//selectedUser is here becuase when rating changes then profile component re-renders

  if (loading) {
    return (
      <div className="w-[80%] bg-blue-500 rounded-lg flex justify-around gap-4 p-4 max-xl:flex-col max-xl:w-full">
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
        <div className=" w-[50%] flex max-xl:w-full justify-center gap-4 border-l-2 max-xl:border-l-0 max-xl:border-t-2 max-xl:pt-2 pl-4 max-md:pl-2 border-white items-center max-xl:justify-center">
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
    <>
      <div className="w-[80%] bg-blue-500 rounded-lg flex justify-around gap-4 p-4 max-xl:flex-col max-xl:w-full">
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
          <div className="w-[90%] max-md:w-[70%] flex gap-2 flex-col">
            <div className="font-bold text-xl text-white w-fit gap-x-2 flex items-center flex-wrap">
              {displayUsername}
              <EditProfile setProfileUpdated={setProfileUpdated}/>
            </div>
            <div className="text-white break-words m-1">{bio}</div>
          </div>
        </div>
        <div className="flex max-lg:w-full text-white justify-center gap-4 border-l-2 max-xl:border-l-0 max-xl:border-t-2 max-xl:pt-2 pl-4 max-md:pl-2 border-white items-center max-lg:justify-center">
          <div className="flex flex-col items-center font-semibold">
            {numOfRatingsGiven}
            <div className="text-center text-sm">Ratings Given</div>
          </div>
          <div className="flex flex-col items-center font-semibold">
            {numOfRatingsReceived}
            <div className="text-center text-sm">Ratings Received</div>
          </div>
          <div className="flex flex-col items-center font-semibold">
            {overallRating}/10
            <div className="text-center text-sm">Average Rating</div>
          </div>
          <div className="flex flex-col items-center font-semibold">
            {ratingCount}
            <div className="text-center text-sm">Rating Count</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
