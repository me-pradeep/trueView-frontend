import React from "react";
import Profile from "@/components/Profile";
import NavigationBox from "@/components/NavigationBox";

async function Layout({ params,children }) {
  const { username } = await params;
  const decodedString = decodeURIComponent(username);
  return (
    <>
      <Profile username={decodedString}/>
      <NavigationBox/>
      {children}
    </>
  );
}

export default Layout;
