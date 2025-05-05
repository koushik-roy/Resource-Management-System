import axios from "axios";
import React, { useEffect, useState } from "react";
// import "./App.css"

function DropdownCustomer(props) {
  const [customer, setCustomer] = useState([]);

  useEffect(function () {
    axios
      .get("http://localhost:9191/customer/customers")
      .then((response) => setCustomer(response.data))
      //.then((response) => console.log(setCustomers(response.data)))
      .then((error) => console.log(error));
  }, []);

  return (
    <select className="form-control col" onChange={props.customerFunction}>
      <option disabled selected>
        {props.viewProject.customer_id}
      </option>
      {customer.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default DropdownCustomer;
