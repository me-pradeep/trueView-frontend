import { NextResponse } from "next/server";

export async function POST(request) {
  const response = NextResponse.json({ success: true }, { status: 200 });

  response.cookies.set("accessToken", "", {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "None",
    expires: new Date(0),
  });

  return response;
}
