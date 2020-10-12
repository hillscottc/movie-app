import React, { useState, useEffect } from "react";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";
import { getMovieList } from "./MovieApi";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/detail">Detail</Link>
            </li>
          </ul>
        </nav>
        <Switch>
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
    <div>
      <h1>Movies</h1>
      <section>
        <a href="/api/movies">/api/movies</a>
      </section>
      <MovieList movies={movies} />
    </div>
  );
}
