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

// function getAlbumsByArtist(artist) {
//   fetch(`${HOST_URL}/albums?artist=${artist}`)
//     .then((response) => response.json())
//     .then((data) => setAlbums(data));
// }

// function createAlbum(data) {
//   fetch(`${HOST_URL}/albums`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => {
//       return response.text();
//     })
//     .then((data) => {
//       alert(data);
//       getAlbums();
//     });
// }

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
