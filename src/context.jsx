"use client";
import React from "react";
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userObjectId:null,
    username: "",
    photoURL: "",
    email: "",
    bio: "",
    numOfRatingsGiven: 0,
    numOfRatingsReceived: 0,
    overallRating: 0,
    ratingCount: 0,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};



