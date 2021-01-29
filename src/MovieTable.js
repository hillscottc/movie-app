import React from "react";
import {Link} from "react-router-dom";

export function MovieSearch({searchParams, setSearchParams}) {
  return (
    <div>
      <label>Search by:</label> <input type="text" value={searchParams} onChange={(e) => setSearchParams(e.target.value)} />
    </div>
  )
}

export function MovieTable({movies, doDelete, doFavlistClick, favlist, matchedIds}) {
  return (
    <table>
      <thead>
      <tr>
        <th>id</th>
        <th>title</th>
        <th>year</th>
        <th>stars</th>
        <th>imdb</th>
        <th>delete</th>
        <th>favlist</th>
      </tr>
      </thead>
      <tbody>
      {movies.length > 0 && movies.map((movie) => {
        if ( matchedIds.length == 0 || matchedIds.includes(movie.id)) return (
          <tr key={movie.id}>
            <td>{movie.id}</td>
            <td><Link to={`/detail?id=${movie.id}`}>{movie.title}</Link></td>
            <td>{movie.year}</td>
            <td>{movie.imdb_stars}</td>
            <td><a href={movie.imdb} target="_blank">
              link
            </a></td>
            <td>
              <button
                {...{
                  disabled: movie.locked,
                  ...(movie.locked && {"data-tooltip": "locked records can't be deleted"}),
                  onClick: () => doDelete(movie.id),
                }}
              >
                delete
              </button>
            </td>
            <td>
              {favlist.includes(movie.id) && <button style={{backgroundColor: 'green'}} onClick={() => doFavlistClick(movie.id)}> - </button>}
              {! favlist.includes(movie.id) && <button style={{backgroundColor: 'red'}} onClick={() => doFavlistClick(movie.id)}> + </button>}
            </td>
          </tr>
        )
      })}
      </tbody>
    </table>
  )
}