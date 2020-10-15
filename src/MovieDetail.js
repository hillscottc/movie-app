import React from "react";
import ReactPlayer from "react-player/youtube";
import { useRequest, getUrlParamsObj } from "./utils";
import { getMovieByIdUrl } from "./MovieApi";
import loadingImg from "./images/loading.gif";

export default function MovieDetail() {
  const urlParamsObj = getUrlParamsObj();
  const id = urlParamsObj.get("id");

  const { data: movies, loading, error } = useRequest(getMovieByIdUrl(id));
  const movie = movies[0];
  return (
    <main>
      <h1>DETAIL </h1>

      {loading && <img src={loadingImg} />}

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
      <div style={{ width: "50%", margin: "0 auto" }}>
        {movie && <ReactPlayer url={movie.videourl} />}
      </div>
    </main>
  );
}
