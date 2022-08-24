const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  //next api catch all route [...name.js] will return req.query as an array
  //e.g. if query paramater public_id  = "foldername/image id"
  // req.query.public_id will return ["foldername", "image id"]
  const public_id = req.query.public_id.join("/");

  try {
    //public_id cloudinary requires "foldername/image id"
    return cloudinary.uploader.destroy(public_id, function (error, result) {
      res.status(200).json(result);
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
}
