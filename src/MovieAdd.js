import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createMovie, createMovieFromForm } from "./MovieApi";

export default function MovieAdd() {
  // const [movie, setMovie] = useState(null);

  const { handleSubmit, register, errors } = useForm();

  // with json..
  // const submit = (values) => {
  //   createMovie(values).then((text) => console.log("Results:", text));
  // };

  const submit = async (data) => {
    const formData = new FormData();

    const { title, year, imdb_stars } = data;
    const poster = data.poster[0];

    formData.append("poster", poster);
    formData.append("title", title);
    formData.append("year", year);
    formData.append("imdb_stars", imdb_stars);

    // console.log("POSTING FORMDATA...", formData);
    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    const results = createMovieFromForm(formData).then((json) => {
      console.log("UPLOAD RESULTS:", json);
    });
  };

  return (
    <main>
      <h1>ADD</h1>
      <form onSubmit={handleSubmit(submit)} style={{ width: "75%" }}>
        <input ref={register} type="file" name="picture" />

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
