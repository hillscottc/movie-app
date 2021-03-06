import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createMovie, createMovieFromForm } from "./MovieApi";

export default function MovieAdd() {
  // const [movie, setMovie] = useState(null);

  const { handleSubmit, register, errors } = useForm();

  // with json..
  const submit = (values) => {
    createMovie(values).then((text) => console.log("Results:", text));
  };

  return (
    <main>
      <h1>ADD</h1>
      <form onSubmit={handleSubmit(submit)} style={{ width: "75%" }}>
        <input ref={register} type="file" name="poster" />

        <div>
          Title:
          <input name="title" ref={register({ required: "Required" })} />
          {errors.title && errors.title.message}
        </div>
        <div>
          Year:
          <input
            name="year"
            ref={register({
              required: "Required",
              pattern: {
                value: /^[0-9]+$/i,
                message: "invalid year",
              },
            })}
          />
          {errors.year && errors.year.message}
        </div>
        <div>
          IMDB Stars:
          <input
            name="imdb_stars"
            ref={register({
              required: "Required",
              pattern: {
                value: /^[0-9]+$/i,
                message: "invalid stars",
              },
            })}
          />
          {errors.imdb_stars && errors.imdb_stars.message}
        </div>
        <div>
          IMDB Url: <input name="imdb" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
