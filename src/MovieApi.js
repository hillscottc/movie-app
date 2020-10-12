export async function getMovieList() {
  const response = await fetch("/api/movies");
  const movies = await response.json();
  return movies;
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
