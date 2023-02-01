import mongoose from "mongoose";

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
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    kombucha_type: {
      type: String,
      required: true,
    },
    search_key: {
      type: String,
      default: "kombucha",
    },
    flavor: [String],
    ABV: {
      type: Number,
    },
    served_in: [String],
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    review_count: {
      type: Number,
      default: 0,
    },
    rating_avg: {
      type: Number,
      default: 0,
    },
    rating_sum: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
    },
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
