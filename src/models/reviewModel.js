import mongoose from "mongoose";
import Brewery from "./breweryModel";
import Kombucha from "./kombuchaModel";

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      required: true,
    },
    served_in: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
      required: true,
    },
    userAvatar: {
      type: String,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Kombucha",
    },

    brewery_slug: {
      type: String,
      required: true,
    },
    brewery: {
      type: String,
      required: true,
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    like_count: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

let Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);
//The first argument is the singular name of the collection your model is for.
// ** Mongoose automatically looks for the plural, lowercased version of your model name.
// ** Thus, for the example above, the model Tank is for the tanks collection in the database.
export default Review;
