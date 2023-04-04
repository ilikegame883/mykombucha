import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../src/lib/connectDB";
import Kombucha from "../../../src/models/kombuchaModel";

// Connect to the database
connectDB();

// Define the handler function
async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if the request method is GET
    if (req.method === "GET") {
      // Fetch all kombucha data from the database
      const kombuchas = await Kombucha.find({});

      // Return the kombucha data as a JSON response
      res.status(200).json({ success: true, data: kombuchas });
    } else {
      // Return an error if the request method is not supported
      res.status(405).json({ success: false, message: "Method not supported" });
    }
  } catch (error) {
    // Handle any errors that occurred while fetching the data
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred",
        error: error.message,
      });
  }
}

// Export the handler function as the default export
export default handler;
