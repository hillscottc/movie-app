import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRequest } from "./utils";
import { getMovieListUrl, deleteMovie } from "./MovieApi";
import loadingImg from "./images/loading.gif";

export default function MovieList() {
  const { data: movies, loading, error } = useRequest(getMovieListUrl());

  const [favlist, setFavlist] = useState([0]);

  useEffect(() => {
    setFavlistFromLocal()
  }, [])

  const setFavlistFromLocal = () => {
    const localList = localStorage.getItem("favlist");
    try {
      if (localList) {
        console.log("Loading favlist list from local, setting to: ", localList)
        setFavlist(JSON.parse(localList))
      }
    } catch (e) {
      console.warn("Failed to parse localStorage localList:", localList)
    }
  }

  const doDelete = async (id) => {
    const results = await deleteMovie(id);
    console.log("Deleted:", results);
    window.location.reload();
  };

  const favlistUpdate = async (id, isAdd=true) => {
    let newWatchlist = null
    if (isAdd) {
      console.log("ADD IT!")
      newWatchlist = [...favlist, id];
    } else {
      console.log("REMOVE IT!")
      newWatchlist = favlist.filter(x => x !== id);
    }

    if (newWatchlist) {
      console.log("UPDATE BOTH TO ", newWatchlist)
      setFavlist(newWatchlist)
      localStorage.setItem("favlist", JSON.stringify(newWatchlist));
    }
  }

  const doFavlistClick = async (id) => {
    console.log("doWatchlistClick handling", {favlist, id})



    const index = favlist.indexOf(id);
    console.log("index", index)

    // if its already there, remove it, otherwise add it
    if (index > -1) await favlistUpdate(id, false);
    else await favlistUpdate(id);
  };

  return (
    <main>
      <h1>Movies</h1>
      {loading && <img src={loadingImg} />}
      <MovieTable {...{movies, doDelete, doFavlistClick, favlist}} />
    </main>
  );
}


function MovieTable({movies, doDelete, doFavlistClick, favlist}) {
  return (
    <table>
      <thead>
      <tr>
        <th>id</th>
        <th>title</th>
        <th>year</th>
        <th>stars</th>
        <th>imdb</th>
        <th>delete</th>
        <th>favlist</th>
      </tr>
      </thead>
      <tbody>
      {movies.length > 0 && movies.map((movie) => (
        <tr key={movie.id}>
          <td>{movie.id}</td>
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
            {favlist.includes(movie.id) && <button style={{backgroundColor: 'green'}} onClick={() => doFavlistClick(movie.id)}> - </button>}
            {! favlist.includes(movie.id) && <button style={{backgroundColor: 'red'}} onClick={() => doFavlistClick(movie.id)}> + </button>}
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}