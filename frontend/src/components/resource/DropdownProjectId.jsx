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

  return (
    <select
      className="form-control col-12"
      style={{ marginLeft: "-21px" }}
      onChange={props.projectFunction}
    >
      <option disabled selected>
        Select Project
      </option>
      {project.map((pro) => (
        <option key={pro.project_id} value={pro.project_id}>
          {pro.project_name}
        </option>
      ))}
    </select>
  );
}

export default DropdownProjectId;
