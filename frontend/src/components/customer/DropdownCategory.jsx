import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../App.css";

function DropdownCategory(props) {
  const [category, setCategory] = useState([]);

  useEffect(function () {
    axios
      .get("http://localhost:9191/customerCategory/customerCategories")
      .then((response) => setCategory(response.data))
      //.then((response) => console.log(setCustomers(response.data)))
      .then((error) => console.log(error));
  }, []);

  let arr = "Select category";
  category.map((c) => {
    if (c.id == props.customerCategory) {
      arr = c.code;
    }
  });
  return (
    <select className="form-control" style={{ width: "633px",
    marginLeft: "20px" }} onChange={props.categoryFunction}>
      <option disabled selected>
        {arr}
      </option>
      {category.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.code}
        </option>
      ))}
    </select>
  );
}

export default DropdownCategory;
