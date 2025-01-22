import { NextResponse } from "next/server";
import { auth } from "@/lib/firebaseAdmin";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const cookie = request.cookies?.get("codedAccessToken");
    const codedAccessToken = cookie?.value;

    if (!codedAccessToken) {
      return NextResponse.json({ message: "No token provided", success: false }, { status: 401 });
    }

    let decodedJwt;
    try {
      decodedJwt = jwt.verify(codedAccessToken, process.env.JWT_SECRET_KEY);
    } catch (jwtError) {
      console.error("JWT verification failed:", jwtError.message);
      return NextResponse.json({ message: "Invalid token", success: false }, { status: 401 });
    }

    const { token: accessToken } = decodedJwt;

    const decodedToken = await auth.verifyIdToken(accessToken);

    if (!decodedToken?.email) {
      throw new Error("Invalid Firebase token payload");
    }

    return NextResponse.json({ email: decodedToken.email, success: true }, { status: 200 });
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
  }
}
