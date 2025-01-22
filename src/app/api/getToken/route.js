import { NextResponse } from "next/server";

export async function POST(request) {
    try {
      const cookie = request.cookies?.get("accessToken");
      const accessToken = cookie?.value;
      return NextResponse.json({ accessToken, success: true }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "No accessToken found", success: false }, { status: 400 });
    }
  }
  