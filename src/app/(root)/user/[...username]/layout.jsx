import React from "react";
import Profile from "@/components/Profile";

async function Layout({ params }) {
  const { username } = await params;
  const decodedString = decodeURIComponent(username);
  return <Profile username={decodedString} />;
}

export default Layout;
