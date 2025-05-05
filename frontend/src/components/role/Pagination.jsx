import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ postsPerPage, totalPosts, paginate, back, next }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const pagStyle = {
    paddingLeft: "604px",
    marginTop: "-39px",
  };

  return (
    <nav>
      <ul className="pagination" style={pagStyle}>
        <Link
          onClick={() => paginate(pageNumbers[0])}
          to="/viewRoles"
          className="page-link"
        >
          <span aria-hidden="true">&laquo;</span>
        </Link>
        <Link onClick={() => back()} to="/viewRoles" className="page-link">
          <span aria-hidden="true">&lsaquo;</span>
        </Link>

        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <Link
              onClick={() => paginate(number)}
              to="/viewRoles"
              className="page-link"
            >
              {number}
            </Link>
          </li>
        ))}
        <Link onClick={() => next()} to="/viewRoles" className="page-link">
          <span aria-hidden="true">&rsaquo;</span>
        </Link>
        <Link
          onClick={() => paginate(pageNumbers.length)}
          to="/viewRoles"
          className="page-link"
        >
          <span aria-hidden="true">&raquo; </span>
        </Link>
      </ul>
    </nav>
  );
};

export default Pagination;
