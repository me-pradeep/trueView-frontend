import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true }, { status: 200 });

  response.cookies.set("accessToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/", 
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    expires: new Date(0),
  });

  return response;
}
