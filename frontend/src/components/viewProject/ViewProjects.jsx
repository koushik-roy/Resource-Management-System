import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import SingleEntityview from "./SingleEntityview";
import { RiDeleteBin5Line } from "react-icons/ri";

import { FaEdit } from "react-icons/fa";

const ViewProjects = ({ project, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  const h6Style = {
    marginLeft: "4rem",
    color: "rgba(171, 183, 183)",
  };
  const h4Style = {
    marginTop: "10px",
    marginLeft: "1rem",
    fontSize: "23px",
  };
  const divStyle = {
    border: "1px solid rgba(240, 240, 240)",
    marginLeft: "8rem",
    marginRight: "8rem",
    marginTop: "5px",
    width: "1130px",
    height: "127px",
  };
  const pStyle = {
    marginTop: "10px",
    fontSize: "14px",
    color: "rgba(59,63,64)",
  };
  const projectStyle = {
    hover: "box-shadow: 0 0 12px 3px rgba(0, 0, 0, 0.08)",
  };

  return (
    <>
      {project.map((project) => (
        <div key={project.projectId} className="abc" style={projectStyle}>
          <div className="rounded-lg" style={divStyle}>
            <div style={{ marginLeft: "67.9rem" }}>
              <Link to={`/EditProject/${project.projectId}`}>
                <FaEdit />
              </Link>{" "}
              {/* <Link style={{ color: "red" }}>
                <RiDeleteBin5Line />
              </Link> */}
            </div>
            <section className="d-flex ">
              <div className="col-lg-4 ">
                <Link
                  to={`/SingleEntityview/${project.projectId}`}
                  style={{ textDecoration: "none" }}
                >
                  <h4 style={h4Style}>{`${project.project_name}`}</h4>
                </Link>

                <h6 style={h6Style}>{`${project.projectId}`}</h6>
                {/* <h7>{`${project.business_unit_id}`}</h7> */}
              </div>
              <div>
                <p style={pStyle}>{`${project.project_description}`}</p>
              </div>
            </section>
          </div>
        </div>
      ))}
    </>
  );
};

export default ViewProjects;
