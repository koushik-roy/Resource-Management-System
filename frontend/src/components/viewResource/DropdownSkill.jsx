import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

function DropdownSkill(props) {
  // React state to manage selected options
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [value, setValue] = useState([]);

  useEffect(function () {
    axios
      .get("http://localhost:9191/skill/skills")
      .then((response) => setSelectedOptions(response.data))
      .then((error) => console.log(error));
  }, []);

  // Array of all options
  const skillList = selectedOptions.map((skill) => ({
    value: skill.id,
    label: skill.description,
  }));

  // Function triggered on selection
  function skillFunction(data) {
    setValue(data);
    props.onValueChange(data);
    console.log("i am child");
  }

  let arr = [];
  selectedOptions.map((e) => {
    props.skills.map((i) => {
      if (e.id == i.skill_id) {
        arr.push(e);
      }
    });
  });

  const arrList = arr.map((skill) => ({
    value: skill.id,
    label: skill.description,
  }));

  return (
    <div>
      <Select
        options={skillList}
        value={arrList}
        onChange={skillFunction}
        isSearchable={true}
        isMulti
      />
    </div>
  );
}

export default DropdownSkill;
