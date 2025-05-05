import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../App.css";

function DropdownProjectId(props) {
  const [project, setProject] = useState([]);

  useEffect(function () {
    axios
      .get("http://localhost:9191/project/projects")
      .then((response) => setProject(response.data))
      .then((error) => console.log(error));
  }, []);

  let arr = "Select Project ";

  project.map((e) => {
    if (props.allprojects) {
      if (e.projectId == props.allprojects.project_id) {
        arr = e.project_name;
      }
    }
  });

  return (
    <select
      className="form-control col-12"
      style={{ marginLeft: "-21px" }}
      onChange={props.projectFunction}
    >
      <option disabled selected>
        {arr}
      </option>
      {project.map((pro) => (
        <option key={pro.projectId} value={pro.projectId}>
          {pro.project_name}
        </option>
      ))}
    </select>
  );
}

export default DropdownProjectId;
