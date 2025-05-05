import axios from "axios";
import React, { useEffect, useState } from "react";
// import "./App.css"

function DropdownBusinessunitId(props) {
  const [business, setBusiness] = useState([]);

  useEffect(function () {
    axios
      .get("http://localhost:9191/businessUnit/businessUnits")
      .then((response) => setBusiness(response.data))
      //.then((response) => console.log(setCustomers(response.data)))
      .then((error) => console.log(error));
  }, []);

  let arr = "Select Business Unit ";
  business.map((e) => {
    if (e.id == props.business_id) {
      arr = e.unit_description;
    }
  });

  return (
    <select className="form-control col" onChange={props.businessFunction}>
      <option disabled selected>
        {arr}
      </option>
      {business.map((bus) => (
        <option key={bus.id} value={bus.id}>
          {bus.unit_description}
        </option>
      ))}
    </select>
  );
}

export default DropdownBusinessunitId;
