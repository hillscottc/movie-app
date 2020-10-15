import React, { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { Link } from "react-router-dom";
import { getMovieList } from "./MovieApi";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   getMovieList().then((data) => setMovies(data));
  // }, []);

  // Better performance than useEffect?
  useMemo(() => {
    getMovieList().then((data) => setMovies(data));
  }, []);

  const doDelete = (id) => {
    console.log("DELETE ID:", id);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
        Cell: ({ row: { original } }) => (
          <Link to={`/detail?id=${original.id}`}>{original.title}</Link>
        ),
      },
      { Header: "Year", accessor: "year" },
      { Header: "Stars", accessor: "imdb_stars" },
      {
        Header: "IMDB",
        accessor: "imdb",
        Cell: ({ row: { original } }) => (
          <a href={original.imdb} target="_blank">
            link
          </a>
        ),
      },
      {
        Header: "Delete",
        accessor: "locked",
        Cell: ({ row: { original } }) => (
          <button onClick={() => doDelete(original.id)}>delete</button>
        ),
      },
    ],
    []
  );

  return (
    <main>
      <h1>Movies</h1>
      <Table columns={columns} data={movies} />
    </main>
  );
}

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  // Cap number of rows
  const firstPageRows = rows.slice(0, 100);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div>Showing the first 100 results of {rows.length} rows</div>
    </>
  );
}
