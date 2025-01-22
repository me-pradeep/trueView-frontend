import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const { accessToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "Access token is required" },
        { status: 400 }
      );
    }

    const codedAccessToken = jwt.sign({ token: accessToken }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set("codedAccessToken", codedAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return response;
  } catch (error) {
    console.error("Error in POST handler:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
