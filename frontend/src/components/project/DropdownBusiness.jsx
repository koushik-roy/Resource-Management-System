import axios from "axios";
import React, { useEffect, useState } from "react";
// import "./App.css"

function DropdownBusiness(props) {
  const [business, setBusiness] = useState([]);

  useEffect(function () {
    axios
      .get("http://localhost:9191/businessUnit/businessUnits")
      .then((response) => setBusiness(response.data))
      //.then((response) => console.log(setCustomers(response.data)))
      .then((error) => console.log(error));
  }, []);
  // console.log("business" + props.businessid);
  let arr = "Select Business";
  business.map((i) => {
    if (i.id == props.businessid) {
      arr = i.unit_description;
    }
  });

  return (
    <select className="form-control col" onChange={props.businessFunction}>
      <option disabled selected>
        {arr}
      </option>
      {business.map((c) => (
        <option key={c.id} value={c.id}>
          {c.unit_description}
        </option>
      ))}
    </select>
  );
}

export default DropdownBusiness;
