import React from "react";
import Image from "next/image";

function Profile() {
  const photoURL = localStorage.getItem("photoURL");
  const username = localStorage.getItem("username");
  return (
    <div className="w-[60%] max-lg:w-[80%] max-md:w-[100%] bg-white rounded-lg">
      <div className="flex m-4 gap-4">
        <Image
          src={photoURL}
          height={90}
          width={90}
          alt="userImage"
          className="rounded-full border-4 border-white shadow-lg"
        />
        <div className="font-bold text-xl text-center text-slate-600">
          {username}
        </div>
      </div>
    </div>
  );
}

export default Profile;
