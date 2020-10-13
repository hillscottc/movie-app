import React from "react";
import * as XDate from "xdate";
import { useTable, useSortBy } from "react-table";
import { Link } from "react-router-dom";

const getFormattedDate = (date) => {
  if (!date) return null;
  const dateObj = new XDate(date);
  return dateObj.toString("M/d/yy h(:mm)TT");
};

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
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
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

function MovieList({ movies }) {
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

  // This might not be correct usage of useMemo
  const data = React.useMemo(() => movies, [movies]);
  // const data = movies;

  return (
    // <Styles>
    //   <Table columns={columns} data={data} />
    // </Styles>
    <Table columns={columns} data={data} />
  );
}

export default MovieList;
