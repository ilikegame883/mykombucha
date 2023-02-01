import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../src/lib/connectDB";
import User from "../../../../src/models/userModel";
import { getServerSession } from "../../../../src/utils/getServerSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  switch (req.method) {
    case "GET":
      await getUserData(req, res);
      break;
    case "PATCH":
      await updateUserData(req, res);
      break;
  }
};

const getUserData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const userData = await User.findById({ _id: id });
    if (!userData)
      return res.status(400).json({ err: "This user does not exist." });
    res.json(userData);
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: "Error on '/api/users/[id]" + msg });
  }
};

//TODO: add wish_list item to user's wish_list - wish_list: [{kombucha_id: Object_id, add_date}]
const updateUserData = async (req: NextApiRequest, res: NextApiResponse) => {
  //protect API route
  if (!getServerSession(req, res)) {
    res.status(401).json({ msg: "Not authenticated!" });
    return;
  }

  try {
    const { id } = req.query;
    const { bio, username, image, image_id, city, country } = req.body;
    let update = {};

    const validateField = (field: {} | undefined) => {
      if (field === "" || field === null) return true;
      if (!field) return false;
      return true;
    };

    if (username) {
      //username is created only when user signs up
      update = { username };
      if (await User.findOne({ username })) {
        return res.status(400).json({ err: "This username already exists." });
      }
    } else {
      update = {
        ...(validateField(image)
          ? {
              $set: { "profile.image": image, "profile.image_id": image_id },
            }
          : {
              $set: {
                "profile.city": city,
                "profile.country": country,
                "profile.bio": bio,
              },
            }),
      };
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      update,
      { new: true } //if new: true, return the modified document rather than the original
    );
    if (!updatedUser)
      return res.status(400).json({ err: "This user does not exist." });

    res.json({ msg: "Changes Saved!" });
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: msg });
  }
};

export default handler;
