import mongoose from "mongoose";

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
    review_author: {
      data: { type: mongoose.Types.ObjectId, ref: "User" },
    },
    review_user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    kombucha: {
      data: {
        type: mongoose.Types.ObjectId,
        ref: "Kombucha",
      },
      brewery_name: { type: String },
      brewery_slug: { type: String },
    },

    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }], //default: undefined,??
    like_count: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
    },
  },
  {
    timestamps: true, //createdAt, updatedAt automatically added to document
  }
);

let Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);
//The first argument is the singular name of the collection your model is for.
// ** Mongoose automatically looks for the plural, lowercased version of your model name.
// ** Thus, for the example above, the model Tank is for the tanks collection in the database.
export default Review;
