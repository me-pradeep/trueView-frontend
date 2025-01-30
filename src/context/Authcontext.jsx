"use client";
import { createContext, useState } from "react";

export const Authcontext = createContext();
export default function AuthcontextProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  return (
    <Authcontext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </Authcontext.Provider>
  );
}
