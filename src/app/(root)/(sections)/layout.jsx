"use client";
import React from "react";
import { useContext } from "react";
import { UserContext } from "@/context";
import { useEffect } from "react";
import axios from "axios";
import Profile from "@/components/Profile";

function layout({ children }) {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.post("/api/verifyToken");
        const email = res.data.email;
        const res1=await axios.post("/api/getToken");
        const accessToken=res1.data.accessToken;
        const res2 = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/getUserInfo`,
          { email },{
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        const userData = res2.data.user;

        const {
          bio,
          username,
          photoURL,
          numOfRatingsGiven,
          numOfRatingsReceived,
          overallRating,
          ratingCount,
        } = userData;

        setUser({
          bio,
          username,
          photoURL,
          numOfRatingsGiven,
          numOfRatingsReceived,
          overallRating,
          ratingCount,
        });
      } catch (error) {
        console.log("unauthorised");
      }
    };

    fetchUserData();
  }, []);

  const { username } = user;
  return (
    <div className="w-full h-full flex flex-col overflow-y-auto items-center">
      <Profile username={username} />
      {children}
    </div>
  );
}

export default layout;
