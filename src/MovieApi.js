export async function getMovieList() {
  const response = await fetch("/api/movies");
  const movies = await response.json();
  return movies;
}

export async function getMovieById(id) {
  const response = await fetch(`/api/movies/${id}`);
  const movies = await response.json();
  if (movies.length > 0) return movies[0];
}

export async function createMovie(data) {
  console.log("Posting data:", data);
  const response = await fetch("/api/movies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const text = await response.text();
  return text;
}

// function deleteAlbum(id) {
//   fetch(`${HOST_URL}/albums/${id}`, {
//     method: "DELETE",
//   })
//     .then((response) => {
//       return response.text();
//     })
//     .then((data) => {
//       alert(data);
//       getAlbums();
//     });
// }
