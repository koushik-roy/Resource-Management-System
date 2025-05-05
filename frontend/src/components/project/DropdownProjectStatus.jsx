import axios from "axios";
import React, { useEffect, useState } from "react";

function DropdownProjectStatus(props) {
  let arr = "Select Status";
  if (props.projectStatus) {
    arr = props.projectStatus;
  }
  // console.log(arr);
  // console.log(props.projectStatus);
  return (
    <select className="form-control col" onChange={props.projectStatusFunction}>
      <option disabled selected>
        {arr}
      </option>
      <option value="ACTIVE">ACTIVE</option>
      <option value="ON_HOLD">ON HOLD</option>
      <option value="COMPLETED">COMPLETED</option>
    </select>
  );
}

export default DropdownProjectStatus;
