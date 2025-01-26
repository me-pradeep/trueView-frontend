import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(request) {
  try {
    const { data } = await request.json();
    const secretKey = process.env.CRYPTO_SECRET_KEY;
    const encryptData = (data) => {
      return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    };

    const encryptedData = encryptData(data);

    return NextResponse.json({ encryptedData, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "aaja du tujhe encryptedData, bhag saale", success: false },
      { status: 400 }
    );
  }
}
