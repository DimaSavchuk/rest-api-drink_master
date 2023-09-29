const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    console.log("UPLOAD !!!!");
    let folder;
    if (file.fieldname === "avatar") {
      folder = "avatars";
    } else if (file.fieldname === "cocktail") {
      folder = "cocktails";
    } else {
      folder = "others";
    }
    return {
      folder: folder,
      allowed_formats: ["jpg", "png"],
      public_id: file.originalname,
      transformation: [
        { width: 350, height: 350 },
        { width: 700, height: 700 },
      ],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
