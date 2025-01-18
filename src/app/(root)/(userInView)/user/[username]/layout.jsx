import React from "react";
import Profile from "@/components/Profile";

async function Layout({ params, children }) {
  const { username } = await params;
  const decodedString = decodeURIComponent(username);
  return (
    <div className="w-full h-full flex flex-col overflow-y-auto items-center">
      <Profile username={decodedString} />
      {children}
    </div>
  );
}

export default Layout;
