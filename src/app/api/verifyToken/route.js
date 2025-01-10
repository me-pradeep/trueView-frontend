import { NextResponse } from "next/server";
import { auth } from "@/lib/firebaseAdmin";

export async function POST(request) {
    const cookie = request.cookies.get("accessToken");
    const accessToken = cookie?.value;

    if (!accessToken) {
        return NextResponse.json({ message: "No token provided", success: false }, { status: 401 });
    }

    try {
        const decodedToken = await auth.verifyIdToken(accessToken);
        return NextResponse.json({ uid: decodedToken.uid, success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
    }
}
