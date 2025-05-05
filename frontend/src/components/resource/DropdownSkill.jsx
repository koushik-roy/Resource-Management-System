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
  console.log(skillList);

  return (
    <div>
      <Select
        options={skillList}
        placeholder="Select Skills"
        value={skillList.forEach((i) => i.value)}
        onChange={skillFunction}
        isSearchable={true}
        isMulti
      />
    </div>
  );
}

export default DropdownSkill;
