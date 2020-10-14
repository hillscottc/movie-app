import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";
import MovieAdd from "./MovieAdd";
import "./App.css";
import marvelLogo from "./images/marvel-logo.png";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/" className="brand">
            <img className="logo" src={marvelLogo} />
            <span>Movie App</span>
          </Link>

          <div className="menu">
            <Link to="/" className="button">
              Home
            </Link>
            <Link to="/add" className="button">
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
            <MovieList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
