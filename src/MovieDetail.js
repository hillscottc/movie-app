import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { useLocation } from "react-router-dom";
import { getMovieById } from "./MovieApi";

/** For access of queryString params */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function MovieDetail() {
  const query = useQuery();
  const id = query.get("id");

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieById(id).then((data) => setMovie(data));
  }, []);

  return (
    <main>
      <h1>DETAIL </h1>
      <dl>
        <dt>Title</dt>
        <dd>{movie && movie.title}</dd>

        <dt>Year</dt>
        <dd>{movie && movie.year}</dd>

        <dt>Trailer</dt>
        <dd>{movie && <ReactPlayer url={movie.videourl} />}</dd>
      </dl>
    </main>
  );
}
