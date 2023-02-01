import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "../../../../../src/utils/getServerSession";

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  //protect API route
  if (!getServerSession(req, res)) {
    res.status(401).json({ msg: "Not authenticated!" });
    return;
  }

  if (req.method !== "POST") {
    return;
  }

  //next api catch all route returns req.query as an array
  //public_id is returned from cloudinary
  // req.query.public_id will return ["foldername", "image id"]
  const id = req.query.public_id as string[];
  const public_id = id.join("/");
  try {
    return cloudinary.uploader.destroy(public_id, function (error, result) {
      res.status(200).json(result);
    });
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: msg });
  }
}
