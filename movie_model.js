const Pool = require("pg").Pool;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const getMovies = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM movies ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const createMovie = (body) => {
  return new Promise((resolve, reject) => {
    const { title, year } = body;
    pool.query(
      "INSERT INTO movies (title, year) VALUES ($1, $2) RETURNING *",
      [title, year],
      (error, results) => {
        if (error) {
          console.log("ERROR!:", error);
          reject(error);
        }
        resolve(`Added movie: ${JSON.stringify(results.rows[0])}`);
      }
    );
  });
};

const deleteMovie = (movieId) => {
  return new Promise((resolve, reject) => {
    const id = parseInt(movieId);

    pool.query("DELETE FROM movies WHERE id = $1", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Movie deleted with ID: ${id}`);
    });
  });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
