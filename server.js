const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary");

const fs = require('fs');

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

// FILE POST!!
// app.post("/api/movies/form", upload.single("poster"), (req, res) => {
//   console.log("SERVER GOT FORM:", req.body);
//   console.log("SERVER GOT FILE:", req.file);
// });


app.post('/api/movies/form', function(req, res, next) {
  const stream = cloudinary.uploader.upload_stream((result) => {
    console.log(result);
    res.send('Done:<br/> <img src="' + result.url + '"/><br/>' +
             cloudinary.image(result.public_id, { format: "png", width: 100, height: 130, crop: "fill" }));
  }, { public_id: req.body.title } );
  fs.createReadStream(req.files.image.path, {encoding: 'binary'}).on('data', stream.write).on('end', stream.end);
});




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
