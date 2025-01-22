"use client";
import React, { useContext, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/lib/firebaseconfig";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserContext} from "@/context";
import LinearProgress from "@mui/material/LinearProgress";

export default function Google() {
  const { setUser } = useContext(UserContext);
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(false);

  async function handleGoogleAuth() {
    try {
      setAuthLoading(true);
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const token = await user.getIdToken();
      await axios.post("/api/storeToken", { accessToken: token });

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/checkuser`,
        { email: user.email },{
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setAuthLoading(false);
        router.push("/");
      } else {
        setUser({ email: user.email, photoURL: user.photoURL });
        setAuthLoading(false);
        router.push("/getusernameandbio");
      }
    } catch (error) {
      setAuthLoading(false);
      console.error("Error during Google Authentication:", error);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={handleGoogleAuth}
        disabled={authLoading}
        className={`flex justify-center items-center rounded-lg gap-x-4 w-[400px] p-2 border-2 hover:opacity-80 max-lg:w-[340px] ${
          authLoading ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        <Image
          src="/google-icon.svg"
          height={40}
          width={40}
          alt="google-icon"
        />
        <div className="text-2xl font-bold text-blue-500">
          {authLoading ? "Logging In..." : "Login With Google"}
        </div>
      </button>
      {authLoading && (
        <div className="absolute bottom-[-8px] w-full">
          <LinearProgress color="secondary" />
        </div>
      )}
    </div>
  );
}
