"use client";

import React, { useEffect, useState } from "react";
import Profile from "@/components/Profile";
import { UserContext } from "@/context";
import { useContext } from "react";
import { useRouter} from "next/navigation";
import { useParams } from "next/navigation";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";

function Layout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const tokenResponse = await axios.post("/api/verifyToken");
        const email = tokenResponse.data.email;

        const userResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/getUserInfo`,
          { email }
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

        const { username } = params;
        const decodedUsername = decodeURIComponent(username);
        if (userData.username === decodedUsername) {
          router.push("/");
          setTimeout(() => {
            setIsLoading(false);
          }, 800); //I putted timeout so that /user/[username] output don't show on screen and directly / route output comes.
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error initializing user:", error);
        setIsLoading(false);
      }
    };

    initializeUser();
  }, [params, router, setUser]);

  const { username } = params;
  const decodedUsername = decodeURIComponent(username);

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
