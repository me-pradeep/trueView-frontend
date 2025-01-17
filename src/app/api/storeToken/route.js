import { NextResponse } from "next/server";

export async function POST(request) {
  const { accessToken } = await request.json();
  const response = NextResponse.json({ success: true }, { status: 200 });

  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure:true,
    maxAge: 60 * 60 * 24 * 7, // 1 week,
    path:"/"
  });

  return response;
}
