import type { NextApiRequest, NextApiResponse } from "next";

import Kombucha from "../../../../src/models/kombuchaModel";
import Review from "../../../../src/models/reviewModel";
import connectDB from "../../../../src/lib/connectDB";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  switch (req.method) {
    case "GET":
      await getSingleKombucha(req, res);
      break;
  }
};

const getSingleKombucha = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return;
  }
  try {
    // let id = mongoose.Types.ObjectId(req.query.id);
    const kombuchaData = await Kombucha.findById({
      _id: req.query.id,
    }).populate({ path: "reviews", model: Review });

    res.json(kombuchaData);
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: msg });
  }
};

export default handler;
