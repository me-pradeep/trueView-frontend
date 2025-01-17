import React from "react";
import Profile from "@/components/Profile";

async function Layout({ params,children }) {
  const { username } = await params;
  const decodedString = decodeURIComponent(username);
  return (
    <>
      <Profile username={decodedString}/>
      {children}
    </>
  );
}

export default Layout;
