import React, { useState, useEffect } from "react";
import { useRequest } from "./utils";
import { getMovieListUrl, deleteMovie } from "./MovieApi";
import {MovieTable, MovieSearch} from "./MovieTable";
import loadingImg from "./images/loading.gif";

export default function MovieList() {
  const { data: movies, loading, error } = useRequest(getMovieListUrl());
  const [favlist, setFavlist] = useState([0]);
  const [searchParams, setSearchParams] = useState('');
  const [matchedIds, setMatchedIds] = useState([]);

  useEffect(() => {
    setFavlistFromLocal()
  }, [])

  useEffect(() => {
    updateSearchResults()
  }, [searchParams])

  const updateSearchResults = () => {
    if (searchParams && movies) {
      const matchedMovies = movies.filter(movie => movie.title.includes(searchParams))
      setMatchedIds(matchedMovies.map(movie => movie.id))
    } else if (movies && movies.length > 0){
      setMatchedIds(movies.map(movie => movie.id))
    } else {
      setMatchedIds([])
    }
  }

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
    const newWatchlist = isAdd ? [...favlist, id] : favlist.filter(x => x !== id);
    if (newWatchlist) {
      setFavlist(newWatchlist)
      localStorage.setItem("favlist", JSON.stringify(newWatchlist));
    }
  }

  const doFavlistClick = async (id) => {
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
      <section style={{marginBottom: '30px'}}>
        <MovieSearch {...{searchParams, setSearchParams}}/>
      </section>
      <section>
        <MovieTable {...{movies, doDelete, doFavlistClick, favlist, matchedIds}} />
      </section>
    </main>
  );
}

