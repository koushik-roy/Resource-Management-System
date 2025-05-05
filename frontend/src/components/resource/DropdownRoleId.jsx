import axios from "axios";
import React, { useEffect, useState } from "react";
// import "./App.css"

function DropdownRoleId(props) {
  const [roleid, setRoleid] = useState([]);

  useEffect(function () {
    axios
      .get("http://localhost:9191/role/roles")
      .then((response) => setRoleid(response.data))
      //.then((response) => console.log(setCustomers(response.data)))
      .then((error) => console.log(error));
  }, []);

  let arr = "Select Role";

  roleid.map((e) => {
    if (e.id == props.resource_id) {
      arr = e.decsription;
    }
  });

  return (
    <select className="form-control col" onChange={props.roleFunction}>
      <option disabled selected>
        {arr}
      </option>
      {roleid.map((rol) => (
        <option key={rol.id} value={rol.id}>
          {rol.decsription}
        </option>
      ))}
    </select>
  );
}

export default DropdownRoleId;
