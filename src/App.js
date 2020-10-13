import React, { useState, useEffect } from "react";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";
import MovieAdd from "./MovieAdd";
import { getMovieList } from "./MovieApi";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import marvelLogo from "./images/marvel-logo.png";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/" class="brand">
            <img class="logo" src={marvelLogo} />
            <span>Movie App</span>
          </Link>

          <div class="menu">
            <Link to="/" class="button">
              Home
            </Link>
            <Link to="/add" class="button">
              Add a Movie
            </Link>
          </div>
        </nav>

        <Switch>
          <Route path="/add">
            <MovieAdd />
          </Route>
          <Route path="/detail">
            <MovieDetail />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((data) => setMovies(data));
  }, []);

  return (
    <main>
      <h1>Marvel Movies</h1>
      <MovieList movies={movies} />
    </main>
  );
}
