import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(request) {
  try {
    const { cipherText } = await request.json();
    const secretKey = process.env.CRYPTO_SECRET_KEY;
    const decryptData = (cipherText) => {
      const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    };

    const decryptedData = decryptData(cipherText);

    return NextResponse.json({ decryptedData, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "aaja du tujhe decryptedData, bhag saale", success: false},
      { status: 400 }
    );
  }
}
