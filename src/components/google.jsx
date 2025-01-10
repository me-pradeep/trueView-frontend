"use client";
import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/lib/firebaseconfig";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Google() {
  const router=useRouter();
  function handleGoogleAuth() {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        user.getIdToken().then((token)=>{
          axios.post("/api/storeToken",{accessToken:token});
        })
        router.push("/")
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        alert(errorMessage)
      });
  }
  return (
    <button
      onClick={handleGoogleAuth}
      className="flex justify-center items-center rounded-lg gap-x-4 w-[400px] p-2 border-2 hover:opacity-80 max-lg:w-[340px]"
    >
      <Image src="/google-icon.svg" height={40} width={40} alt="google-icon" />
      <div className="text-2xl font-bold text-blue-500">Login With Google</div>
    </button>
  );
}
