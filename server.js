const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const movie_model = require("./movie_model");

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
