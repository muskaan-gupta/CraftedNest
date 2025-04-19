//We will assume that the files are already stored temporarily on our server. We are following the next steps.

import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; //file system

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadonCloudinary = async (files) => {
  try {
    if (!files || !Array.isArray(files)) return [];

    // Map through each file and upload to Cloudinary
    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto", public_id: file.originalname },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        // Pipe the file buffer into the upload stream
        uploadStream.end(file.buffer);
      });
    });

    // Wait for all files to be uploaded
    const responses = await Promise.all(uploadPromises);
    console.log("Files uploaded successfully", responses);

    return responses[0]; // Return the first file's response (URL)
  } catch (error) {
    console.error("Error uploading files to Cloudinary:", error);
    return null;
  }
};

export { uploadonCloudinary };