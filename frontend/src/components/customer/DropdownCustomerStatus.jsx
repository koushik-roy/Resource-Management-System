import React from "react";
function DropdownCustomerStatus(props) {
  let arr = "Select status";
  console.log(props.status);
  if (props.customerStatus) {
    arr = props.customerStatus;
  }
  return (
    <select
      className="form-control "
      style={{ width: "633px",
    marginLeft: "19px" }}
      onChange={props.customerStatusFunction}
    >
      <option disabled selected>
        {arr}
      </option>
      <option value="ACTIVE">ACTIVE</option>
      <option value="INACTIVE">INACTIVE</option>
    </select>
  );
}

export default DropdownCustomerStatus;
