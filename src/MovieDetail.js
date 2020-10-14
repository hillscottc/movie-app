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

      <h2 className="flex">
        <span className="label">Title</span>
        <span className="label">Year</span>
        <span className="label">Stars</span>
        <span className="label">IMDB</span>
      </h2>
      <h2 className="flex">
        <span>{movie && movie.title}</span>
        <span>{movie && movie.year}</span>
        <span>{movie && movie.imdb_stars}</span>
        <span>{movie && movie.imdb && <a href={movie.imdb}>IMDB</a>}</span>
      </h2>

      <h2>
        <span className="label">Trailer</span>
      </h2>
      <div style={{width: "50%", margin: "0 auto"}} >{movie && <ReactPlayer url={movie.videourl} />}</div>
    </main>
  );
}
