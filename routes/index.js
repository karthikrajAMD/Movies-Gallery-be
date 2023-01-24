var express = require("express");
var router = express.Router();
const { default: mongoose } = require("mongoose");
const { dbUrl } = require("../config/dbConfig");
const { movieModel } = require("../Schema/MoviesSchema");

mongoose.set("strictQuery", false);
mongoose.connect(dbUrl);
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/movies", async (req, res) => {
  try {
    let movies = await movieModel.find();
    res.send({ status: 200, movies });
  } catch (err) {
    res.send({ status: 500, message: "Internal server in error" });
  }
});
router.get("/movies/:id", async (req, res) => {
  try {
    let movieExist = await movieModel.findOne({ _id: req.params.id });
    if (movieExist) {
      res.send({ status: 200, movieExist });
    } else {
      res.send({ status: 202, message: "Id mismatch" });
    }
  } catch (error) {
    res.send({ status: 400, message: "Please try again" });
  }
});
router.post("/movies", async (req, res) => {
  try {
    let newMovie = await movieModel.create(req.body);
    res.send({ status: 200, message: "Movie data added successfully" });
  } catch (err) {
    console.log(err);
    res.send({ status: 500, message: "Internal server error" });
  }
});
router.put("/movies/:id", async (req, res) => {
  try {
    let movieExist = await movieModel.findOne({ _id: req.params.id });
    if (movieExist) {
      console.log(req.body);
      let updateValues = await movieModel.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        rating: req.body.rating,
        image: req.body.image,
        descrip: req.body.descrip,
        trailer: req.body.trailer,
      });
      res.send({ status: 200, message: "Updated" });
    } else {
      res.send({ status: 202, message: "Id mismatch" });
    }
  } catch (error) {
    res.send({ status: 400, message: "Please try again" });
  }
});
router.delete("/movies/:id", async (req, res) => {
  try {
    let deleteUser = await movieModel.deleteOne({
      _id: req.params.id,
    });
    res.send({
      status: 200,
      message: "Movie data Deleted Successfully!",
    });
  } catch (error) {
    res.send({ status: 500, message: "Internal error" });
    console.log(error);
  }
});
module.exports = router;
