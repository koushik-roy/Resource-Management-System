import React from "react";
import { useState } from "react";
import DropdownSkills from "../viewProject/DropdownSkills";
import SkillRows from "./SkillRows";

function AddDeleteSkillRows({
  onChangeHandleSkills,
  onChangeHandleRequiredNumber,
}) {
  const [rows, setRows] = useState([{}]);
  const columnsArray = ["project_id", "skill ", "required_number "];
  const addTableRows = () => {
    const item = {};
    setRows([...rows, item]);
    console.log(rows);
  };

  const postResults = () => {
    console.log(rows);
  };

  const deleteTableRows = (idx) => {
    //delete an entry at specified index in parent's projectSkillList state variable
    const tempRows = [...rows];
    tempRows.splice(idx, 1);
    setRows(tempRows);
  };

  const handleChange = (index, e) => {
    e.preventDefault();
    const { key, value } = e.target;
    const rowsInput = [...rows];
    rowsInput[index][key] = value;
    setRows(rowsInput);
    // console.log(rowsInput);
  };

  // handle change method for data to be sent to parent
  // const updateState = (idx, e) => {
  //   console.log(e.target.value);
  //   const { skills, numbers } = e.target;
  //   const tempRows = [...rows];
  //   tempRows[idx] = {
  //     [name]: value,
  //   };
  //   setRows(tempRows);
  // };

  ////////////////////////////////////

  return (
    <>
      <div className="container">
        <div className="row-clearfix">
          <div className="col-md-12">
            <table>
              <thead>
                <tr>
                  {columnsArray.map((column, index) => (
                    <th className="textCenter" key={index}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((index) => (
                  <tr key={index}>
                    {/* <td>{idx + 1}</td> */}
                    <td>
                      <DropdownSkills
                        type="text"
                        skillFunction={onChangeHandleSkills}
                        //skillsFunction={onChangeHandleSkills}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={onChangeHandleRequiredNumber}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={addTableRows}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={(idx) => deleteTableRows(idx)}
                      >
                        -
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddDeleteSkillRows;
