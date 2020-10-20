const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary");

const fs = require("fs");

const movie_model = require("./movie_model");

const upload = multer({ dest: "uploads/" });

const port = process.env.PORT || 8080;
const app = express();

// For handling post of json data
const jsonParser = bodyParser.json();

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));

// web root
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

// app.use(bodyParser.urlencoded({ extended: true }));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// FILE POST!!
app.post("/api/movies/form", upload.single("poster"), (req, res) => {
  console.log("SERVER GOT FORM:", req.body);
  console.log("SERVER GOT FILE:", req.file);

  // const data = { image: req.file, };
  // const data = { image: JSON.stringify(req.file) };
  const data = { image: req.body.poster };

  // upload image here
  cloudinary.uploader
    .upload(data)
    .then((result) => {
      response.status(200).send({
        message: "success",
        result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "failure",
        error,
      });
    });
});

// app.post("/api/movies/form", function (req, res, next) {
//   const data = {
//     image: req.body.poster,
//   };

//   // upload image here
//   cloudinary.uploader
//     .upload(data.image)
//     .then((result) => {
//       response.status(200).send({
//         message: "success",
//         result,
//       });
//     })
//     .catch((error) => {
//       response.status(500).send({
//         message: "failure",
//         error,
//       });
//     });
// });

// movie list
app.get("/api/movies", (req, res) => {
  movie_model
    .getMovies()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// movie by id
app.get("/api/movies/:id", (req, res) => {
  movie_model
    .getMovieById(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// insert movie with json data
app.post("/api/movies", jsonParser, (req, res) => {
  console.log("Server got:", req.body);
  movie_model
    .createMovie(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// delete a movie
app.delete("/api/movies/:id", (req, res) => {
  movie_model
    .deleteMovie(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// insert movie with  FORM DATA
// const urlencodedParser = bodyParser.urlencoded({ extended: false });
// app.post("/api/movies/form", urlencodedParser, function (req, res) {
//   console.log("SERVER GOT FORM:", req.body);
// });

app.listen(port);
