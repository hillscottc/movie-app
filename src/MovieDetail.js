import React from "react";
import { useLocation } from "react-router-dom";

/** For access of queryString params */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function MovieDetail() {
  const query = useQuery();
  const id = query.get("id");

  return (
    <div>
      <h2>DETAIL </h2>
      id: {id}
    </div>
  );
}
