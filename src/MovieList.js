import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { Link } from "react-router-dom";
import { useRequest } from "./utils";
import { getMovieListUrl, deleteMovie } from "./MovieApi";
import loadingImg from "./images/loading.gif";

export default function MovieList() {
  const { data: movies, loading, error } = useRequest(getMovieListUrl());

  const doDelete = async (id) => {
    const results = await deleteMovie(id);
    console.log("Deleted:", results);
    window.location.reload();
  };

  // Declare the columns with customized cells as necessary
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
          // using spread syntax here to conditionally render tooltip
          <button
            {...{
              disabled: original.locked,
              ...(original.locked && {
                "data-tooltip": "locked records can't be deleted",
              }),
              onClick: () => doDelete(original.id),
            }}
          >
            delete
          </button>
        ),
      },
    ],
    []
  );

  return (
    <main>
      <h1>Movies</h1>
      {loading && <img src={loadingImg} />}
      {movies.length > 0 && <Table columns={columns} data={movies} />}
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
      {/* This is pretty-much boilerplate for a sortable table. */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
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
