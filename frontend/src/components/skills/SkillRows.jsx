import DropdownSkills from "../viewProject/DropdownSkills";
import React from "react";

function SkillRows({
  rowsData,
  deleteTableRows,
  addTableRows,
  handleChange,
  onChangeHandleSkills,
  onChangeHandleRequiredNumber,
}) {
  return rowsData.map((data, index) => {
    const { project_id, skill, required_number } = data;
    return (
      <div className="form">
        <div className="row">
          <div className="col-5">
            {/* <label htmlFor="">Select Skills</label> */}
            <DropdownSkills
              type="text"
              value={skill}
              onChange={(e) => handleChange(index, e)}
              skillsFunction={onChangeHandleSkills}
            />
          </div>
          <div className="col-3">
            <input
              value={required_number}
              type="number"
              style={{ width: "90px" }}
              onChange={onChangeHandleRequiredNumber}
            />
          </div>
          <div className="col-4">
            <button className="btn btn-primary" onClick={addTableRows}>
              +
            </button>
            <button className="btn btn-light" onClick={deleteTableRows}>
              -
            </button>
          </div>
        </div>
      </div>
    );
  });
}
export default SkillRows;
