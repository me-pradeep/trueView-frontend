"use client";
import React, { useContext } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/lib/firebaseconfig";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserContext } from "@/context";

export default function Google() {
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  async function handleGoogleAuth() {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const token = await user.getIdToken();
      await axios.post("/api/storeToken", { accessToken: token });

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/checkuser`,
        { email: user.email }
      );

      if (res.data.success) {
        router.push("/");
      } else {
        setUser({ email: user.email, photoURL: user.photoURL });
        router.push("/getusernameandbio");
      }
    } catch (error) {
      console.error("Error during Google Authentication:", error);
    }
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
