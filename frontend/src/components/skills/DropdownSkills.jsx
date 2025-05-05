import axios from "axios";
import React, { useEffect, useState } from "react";
// import "./App.css"

function DropdownSkills(props) {
  const [skills, setSkills] = useState([]);

  useEffect(function () {
    axios
      .get("http://localhost:9191/skill/skills")
      .then((response) => setSkills(response.data))
      //.then((response) => console.log(setCustomers(response.data)))
      .then((error) => console.log(error));
  }, []);

  return (
    <select className="form-control col" onChange={props.skillFunction}>
      <option disabled selected>
        Select Skills
      </option>
      {skills.map((sk) => (
        <option key={sk.id} value={sk.id}>
          {sk.description}
        </option>
      ))}
    </select>
  );
}

export default DropdownSkills;
