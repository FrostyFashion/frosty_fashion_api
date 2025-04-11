import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const productImageUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "frosty_fashion/product-pictures",
      // format: async (req, file) => "png", // supports promises as well
      // public_id: (req, file) => file.originalname,
    },
  }),
});