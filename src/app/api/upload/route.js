import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided",success:false }, { status: 400 });
    }

    //  // Check the MIME type of the uploaded file to ensure it is an image
    //  const mimeType = file.type;

    //  if (!mimeType.startsWith("image/")) {
    //    return NextResponse.json({ message: "Only image files are allowed",success:false }, { status: 400 });
    //  }

    // Convert file into a buffer
    const bytes = await file.arrayBuffer();
    const base64String = Buffer.from(bytes).toString("base64");
    const dataUri = `data:${file.type};base64,${base64String}`;

    // Upload to Cloudinary with face detection crop
    const result = await cloudinary.v2.uploader.upload(dataUri, {
      folder: "user_profiles",
      transformation: [
        {
          width: 300,       
          height: 300,       
          crop: "fill",      // Crop to fill the container, keeping aspect ratio
          gravity: "face",   // Automatically center the crop around the face
          face_detection: true, // Enable face detection
        }
      ]
    });

    return NextResponse.json({ url: result.secure_url,success:true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message,success:false }, { status: 500 });
  }
}
