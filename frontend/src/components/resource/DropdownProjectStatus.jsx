import axios from "axios";
import React, { useEffect, useState } from "react";
// import "./App.css"

function DropdownProjectStatus(props) {
  // const [status, setStatus] = useState([]);

  // useEffect(function () {
  //   axios
  //     .get("http://localhost:9191/businessUnit/businessUnits")
  //     .then((response) => setBusiness(response.data))
  //     //.then((response) => console.log(setCustomers(response.data)))
  //     .then((error) => console.log(error));
  // }, []);

  return (
    <select className="form-control col" onChange={props.projectStatusFunction}>
      <option disabled selected>
        Select status
      </option>
      <option value="ACTIVE">ACTIVE</option>
      <option value="ON_HOLD">ON HOLD</option>
      <option value="COMPLETED">COMPLETED</option>
    </select>
  );
}

export default DropdownProjectStatus;
