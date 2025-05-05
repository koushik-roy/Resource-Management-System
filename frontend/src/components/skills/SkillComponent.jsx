import React from "react";
import { useState } from "react";
import DropdownSkills from "../viewProject/DropdownSkills";
import { projectSkillService } from "../../services/ProjectSkillService";
import { TextField } from "@material-ui/core";

const SkillComponent = ({ project_id }) => {
  const initialState = {
    project_id: "",
    skill: "",
    required_number: "",
  };

  const [skill, setSkill] = useState(initialState);

  function submitProjectSkill() {
    projectSkillService.submitProjectSkill(skill, project_id);
  }

  const onChangeHandleNumber = (e) => {
    setSkill({ ...skill, ["required_number"]: e.target.value });
  };
  const onChangeHandleSkills = (e) => {
    console.log(e.target.value);
    setSkill({ ...skill, ["skill"]: e.target.value });
  };
  const handleSubmit = () => {
    projectSkillService.submitProjectSkill(skill, project_id);
  };
  return (
    <div
      className="container"
      // style={{ border: "1px solid #ced4da" }}
    >
      <div className="form">
        <div className="row">
          {/* <div className="col-2">
            <label htmlFor="pid">Enter project ID</label>
            <TextField
              required
              className="form-control"
              InputProps={{ disableUnderline: true }}
              style={{ border: "1px solid #ced4da" }}
              onChange
            />
          </div> */}
          <div className="col-5">
            {/* <label htmlFor="">Select Skills</label> */}
            <DropdownSkills type="text" skillsFunction={onChangeHandleSkills} />
          </div>
          <div className="col-3">
            <input
              type="number"
              style={{ width: "90px" }}
              onChange={(e) => onChangeHandleNumber(e)}
            />
          </div>
          <div className="col-4">
            <button className="btn btn-primary">+</button>
            <button className="btn btn-light">-</button>
          </div>
        </div>
        {/* <div className="form-group-button">
          <button className="btn btn-primary" onClick={handleSubmit}>
            submit
          </button>
          <button className="btn btn-secondary">cancel</button>
        </div> */}
      </div>
    </div>
  );
};

export default SkillComponent;
