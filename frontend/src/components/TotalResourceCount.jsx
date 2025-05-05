import axios from "axios";
import React, { useEffect, useState } from "react";
// import "./App.css"

function TotalResourceCount(props) {
  const [resource, setResource] = useState([]);

  useEffect(function () {
    axios
      .get("http://localhost:9191/Resource/resources")
      .then((response) => setResource(response.data))
      
      .catch((error) => console.log(error));
  }, []);


  return (
    <>
    <h4 >{
      resource.length}</h4>
    </>
  );
}

export default TotalResourceCount;
