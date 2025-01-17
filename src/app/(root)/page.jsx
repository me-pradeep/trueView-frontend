"use client"
import React from 'react'
import Profile from '@/components/Profile';
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "@/context";

function page() {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.post("/api/verifyToken");
        const email = res.data.email;
        const res2 = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/getUserInfo`,
          { email }
        );
        const userData = res2.data.user;

        const {
          bio,
          username,
          photoURL,
          numOfRatingsGiven,
          numOfRatingsReceived,
          overallRating,
          email: userEmail, // Renaming while destructuring to avoid shadowing
          ratingCount,
        } = userData;

        setUser({
          bio,
          username,
          photoURL,
          numOfRatingsGiven,
          numOfRatingsReceived,
          overallRating,
          email: userEmail,
          ratingCount,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const {username}=user;
  return (
    <Profile username={username}/>
  )
}

export default page;