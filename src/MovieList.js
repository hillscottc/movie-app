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

  const columns = useMemo(
    () => [
      { Header: "Title", accessor: "title" },
      { Header: "Year", accessor: "year" },
      { Header: "Stars", accessor: "imdb_stars" },
      { Header: "IMDB", accessor: "imdb" },
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
  /** Get custom cells for some columns */
  const getCell = (value, column, original) => {
    let cell;
    switch (column.id) {
      case "title":
        cell = <Link to={`/detail?id=${original.id}`}>{original.title}</Link>;
        break;
      case "imdb":
        cell = (
          <a href={original.imdb} target="_blank">
            link
          </a>
        );
        break;
      default:
        cell = value;
    }
    return cell;
  };

  const DefaultCell = ({ cell: { value, column }, row: { original } }) => (
    <span style={{ whiteSpace: "pre-wrap" }}>
      {getCell(value, column, original)}
    </span>
  );

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 5,
      width: 150,
      maxWidth: 400,
      Cell: DefaultCell,
    }),
    []
  );

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
      defaultColumn,
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
