import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRequest } from "./utils";
import { getMovieListUrl, deleteMovie } from "./MovieApi";
import loadingImg from "./images/loading.gif";

export default function MovieList() {
  const { data: movies, loading, error } = useRequest(getMovieListUrl());

  const [watchlist, setWatchlist] = useState([0]);

  useEffect(() => {
    setWatchlistFromLocal()
  }, [])

  const setWatchlistFromLocal = () => {
    const localList = localStorage.getItem("watchlist");
    try {
      console.log("Loading watchlist list from local")
      setWatchlist(JSON.parse(localList));
    } catch (e) {
      console.warn("Failed to parse localStorage localList:", localList)
    }
  }

  const doDelete = async (id) => {
    const results = await deleteMovie(id);
    console.log("Deleted:", results);
    window.location.reload();
  };

  const watchlistUpdate = async (id, isAdd=true) => {
    let newWatchlist = null
    if (isAdd) {
      console.log("ADD IT!")
      newWatchlist = [...watchlist, id];
    } else {
      console.log("REMOVE IT!")
      newWatchlist = watchlist.filter(x => x !== id);
    }

    if (newWatchlist) {
      console.log("UPDATE BOTH TO ", newWatchlist)
      setWatchlist(newWatchlist)
      localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
    }
  }

  const doWatchlistClick = async (id) => {
    const index = watchlist.indexOf(id);
    console.log("doWatchlistClick handling", {watchlist, id, index})

    // if its already there, remove it, otherwise add it
    if (index > -1) await watchlistUpdate(id, false);
    else await watchlistUpdate(id);
  };

  return (
    <main>
      <h1>Movies</h1>
      {loading && <img src={loadingImg} />}
      <MovieTable {...{movies, doDelete, doWatchlistClick}} />
    </main>
  );
}


function MovieTable({movies, doDelete, doWatchlistClick}) {
  return (
    <table>
      <thead>
      <tr>
        <th>title</th>
        <th>year</th>
        <th>stars</th>
        <th>imdb</th>
        <th>delete</th>
        <th>watchlist</th>
      </tr>
      </thead>
      <tbody>
      {movies.length > 0 && movies.map((movie) => (
        <tr key={movie.id}>
          <td><Link to={`/detail?id=${movie.id}`}>{movie.title}</Link></td>
          <td>{movie.year}</td>
          <td>{movie.imdb_stars}</td>
          <td><a href={movie.imdb} target="_blank">
            link
          </a></td>
          <td>
            <button
            {...{
              disabled: movie.locked,
              ...(movie.locked && {"data-tooltip": "locked records can't be deleted"}),
              onClick: () => doDelete(movie.id),
            }}
            >
              delete
            </button>
          </td>
          <td>
            <button onClick={() => doWatchlistClick(movie.id)}>WATCHLIST</button>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}