import { NextResponse } from "next/server";
import { auth } from "@/lib/firebaseAdmin";

export async function POST(request) {
    try {
        const cookie = request.cookies?.get("accessToken");
        const accessToken = cookie?.value;

        if (!accessToken) {
            return NextResponse.json({ message: "No token provided", success: false }, { status: 401 });
        }

        const decodedToken = await auth.verifyIdToken(accessToken);

        if (!decodedToken?.email) {
            throw new Error("Invalid token payload");
        }

        return NextResponse.json({ email: decodedToken.email, success: true }, { status: 200 });
    } catch (error) {
        console.error("Error verifying token:", error.message);
        return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
    }
}
