import React, { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { Link } from "react-router-dom";
import * as XDate from "xdate";
import { getMovieList } from "./MovieApi";

const getFormattedDate = (date) => {
  if (!date) return null;
  const dateObj = new XDate(date);
  return dateObj.toString("M/d/yy h(:mm)TT");
};

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   getMovieList().then((data) => setMovies(data));
  // }, []);

  // Better performance?
  useMemo(() => {
    getMovieList().then((data) => setMovies(data));
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Year",
        accessor: "year",
      },
      {
        accessor: "accessor",
        Header: "Detail",
        Cell: ({ row: { original } }) => (
          <Link to={`/detail?id=${original.id}`}>Detail</Link>
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

  // Cap rows at 100
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
