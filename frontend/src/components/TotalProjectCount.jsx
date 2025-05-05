import axios from "axios";
import React, { useEffect, useState } from "react";
// import "./App.css"

function TotalProjectCount(props) {
  const [project, setProject] = useState([]);

  useEffect(function () {
    axios
      .get("http://localhost:9191/project/projects")
      .then((response) => setProject(response.data))
      
      .catch((error) => console.log(error));
  }, []);


  return (
    <>
    <h4 >{
      project.length}</h4>
    </>
  );
}

export default TotalProjectCount;
