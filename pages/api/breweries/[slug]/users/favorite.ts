import type { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";
import Brewery from "../../../../../src/models/breweryModel";
import connectDB from "../../../../../src/lib/connectDB";
import { getServerSession } from "../../../../../src/utils/getServerSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  switch (req.method) {
    case "GET":
      await getBreweryFavoriteUsers(req, res);
      break;
    case "PATCH":
      await updateBreweryFavoriteUsers(req, res);
      break;
  }
};
const getBreweryFavoriteUsers = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { slug } = req.query;
    const [breweryFavoriteUsers] = await Brewery.find(
      { slug },
      { favorite_list: 1, _id: 0 }
    );
    res.json(breweryFavoriteUsers);
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: msg });
  }
};

const updateBreweryFavoriteUsers = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    //protect API route
    if (!getServerSession(req, res)) {
      res.status(401).json({ msg: "Not authenticated!" });
      return;
    }

    const { slug } = req.query;
    const { user_id } = req.body;

    const userObjectId = new mongoose.Types.ObjectId(user_id);

    //add or remove users who click to favorite a brewery
    await Brewery.updateOne({ slug }, [
      {
        $set: {
          favorite_list: {
            $cond: [
              {
                $in: [userObjectId, "$favorite_list"],
              },
              {
                $setDifference: ["$favorite_list", [userObjectId]],
              },
              {
                $concatArrays: ["$favorite_list", [userObjectId]],
              },
            ],
          },
          favorite_count: {
            $cond: [
              {
                //check if userId is in favorite_list array
                //returns boolean
                $in: [userObjectId, "$favorite_list"],
              },
              {
                //true-case
                //decrease favorite_count if user already favorited review (user found in favorite_list array)
                $add: ["$favorite_count", -1],
              },
              {
                //false-case
                //vice versa
                $add: ["$favorite_count", 1],
              },
            ],
          },
        },
      },
    ]);

    return res.json({ msg: "Brewery Updated!" });
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: msg });
  }
};

export default handler;
