const mongoose = require("mongoose");

const MoviesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    fullname: { type: String, default: "" },
    rating: { type: Number, required: true },
    image: { type: String, required: true },
    descrip: { type: String, required: true },
    trailer: { type: String, required: true },
  },
  { collection: "movies", versionKey: false }
);
const movieModel = mongoose.model("movies", MoviesSchema);
module.exports = { movieModel };
