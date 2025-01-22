import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        const cookie = request.cookies?.get("codedAccessToken");
        const codedAccessToken = cookie?.value;

        if (!codedAccessToken) {
            return NextResponse.json({ message: "No codedAccessToken found", success: false }, { status: 400 });
        }

        let decodedJwt;
        try {
            decodedJwt = jwt.verify(codedAccessToken, process.env.JWT_SECRET_KEY);
        } catch (error) {
            return NextResponse.json({ message: "Invalid codedAccessToken", success: false }, { status: 401 });
        }
        const { token: accessToken } = decodedJwt;

        return NextResponse.json({ accessToken, success: true }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Error retrieving accessToken", success: false }, { status: 500 });
    }
}
