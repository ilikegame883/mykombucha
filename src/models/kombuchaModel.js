import mongoose from "mongoose";
// import Brewery from "./breweryModel";
// import Review from "./reviewModel";
// import User from "./userModel";

const kombuchaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brewery: {
      type: mongoose.Types.ObjectId,
      ref: "Brewery",
    },
    brewery_name: {
      type: String,
      required: true,
    },
    brewery_slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    product_type: {
      type: String,
      required: true,
    },
    flavor: [String],
    review_count: {
      type: Number,
      default: 0,
    },
    ABV: {
      type: Number,
    },
    served_in: { type: [String] },
    avg: {
      type: Number,
      default: null,
    },
    rating_sum: {
      type: Number,
      default: 0,
    },
    // reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    wish_list_users: { type: [{ username: { type: String }, date: Date }] },
  },
  {
    timestamps: true,
  }
);

let Kombucha =
  mongoose.models.Kombucha || mongoose.model("Kombucha", kombuchaSchema);
//The first argument is the singular name of the collection your model is for.
// ** Mongoose automatically looks for the plural, lowercased version of your model name.
// ** Thus, for the example above, the model Tank is for the tanks collection in the database.
export default Kombucha;
