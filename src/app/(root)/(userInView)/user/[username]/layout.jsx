"use client";

import React, { useEffect, useState } from "react";
import Profile from "@/components/Profile";
import { UserContext } from "@/context";
import { useContext } from "react";
import { useRouter, useParams } from "next/navigation";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import { SelectedUserContext } from "@/context";

function Layout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const { setUser } = useContext(UserContext);
  const { setSelectedUser } = useContext(SelectedUserContext);

  const decodedUsername = decodeURIComponent(params.username);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        // Fetch the logged-in user
        const tokenResponse = await axios.post("/api/verifyToken");
        const email = tokenResponse.data.email;
        const res1=await axios.post("/api/getToken");
        const accessToken=res1.data.accessToken;
        const userResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/getUserInfo`,
          { email },{
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        const userData = userResponse.data.user;

        setUser({
          userObjectId: userData._id,
          bio: userData.bio,
          username: userData.username,
          photoURL: userData.photoURL,
          numOfRatingsGiven: userData.numOfRatingsGiven,
          numOfRatingsReceived: userData.numOfRatingsReceived,
          overallRating: userData.overallRating,
          email: userData.email,
          ratingCount: userData.ratingCount,
        });

        if (userData.username === decodedUsername) {
          router.push("/");
        } else {
          // Fetch the selected user's data
          const res1=await axios.post("/api/getToken");
          const accessToken=res1.data.accessToken;
          const selectedUserResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/getUserInfo`,
            { username: decodedUsername },{
              headers: {
                'Authorization': `Bearer ${accessToken}`,
              },
              withCredentials: true,
            }
          );
          const selectedUserData = selectedUserResponse.data.user;

          setSelectedUser({
            userObjectId: selectedUserData._id,
            bio: selectedUserData.bio,
            username: selectedUserData.username,
            photoURL: selectedUserData.photoURL,
            numOfRatingsGiven: selectedUserData.numOfRatingsGiven,
            numOfRatingsReceived: selectedUserData.numOfRatingsReceived,
            overallRating: selectedUserData.overallRating,
            email: selectedUserData.email,
            ratingCount: selectedUserData.ratingCount,
          });
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing user:", error.message);
        alert("An error occurred while fetching user details.");
        setIsLoading(false);
      }
    };

    initializeUser();
  }, [decodedUsername, router, setUser, setSelectedUser]);

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto items-center">
      {isLoading ? (
        <div className="w-full h-full">
          <LinearProgress color="primary" />
        </div>
      ) : (
        <>
          <Profile username={decodedUsername} />
          {children}
        </>
      )}
    </div>
  );
}

export default Layout;
