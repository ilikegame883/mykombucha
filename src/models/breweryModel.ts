import mongoose from "mongoose";

const brewerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
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
    favorite_list: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    favorite_count: {
      type: Number,
    },
    kombucha_type: [String], //Kombucha, Jun, Water Kefir etc...
    //category: Microbrewery, Brewpub, Regional Brewery, Major Brewery, etc...
    brewery_type: {
      type: String,
      required: true,
    },
    search_key: {
      type: String,
      default: "breweries",
    },
    urls: {
      website: { type: String },
      twitter: { type: String },
      instagram: { type: String },
      facebook: { type: String },
    },
    createdAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

let Brewery =
  mongoose.models.Brewery || mongoose.model("Brewery", brewerySchema);
//The first argument is the singular name of the collection your model is for.
// ** Mongoose automatically looks for the plural, lowercased version of your model name.
// ** Thus, for the example above, the model Tank is for the tanks collection in the database.
export default Brewery;
