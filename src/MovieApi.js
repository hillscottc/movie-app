export function getMovieListUrl() {
  return "/api/movies";
}

export function getMovieByIdUrl(id) {
  return `/api/movies/${id}`;
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

export async function createMovieFromForm(formData) {
  const response = await fetch("/api/movies/form", {
    method: "POST",
    body: formData,
  });
  const json = await response.json();
  return json;
}

export async function deleteMovie(id) {
  console.log("Trying to delete ", id);
  const response = await fetch(`/api/movies/${id}`, { method: "DELETE" });
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
