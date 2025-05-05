import axios from "axios";
import React, { useEffect, useState } from "react";
// import "./App.css"

function TotalCustomerCount(props) {
  const [customer, setCustomer] = useState([]);

  useEffect(function () {
    axios
      .get("http://localhost:9191/customer/customers")
      .then((response) => setCustomer(response.data))
      
      .catch((error) => console.log(error));
  }, []);


  return (
    <>
    <h4 >{
      customer.length}</h4>
    </>
  );
}

export default TotalCustomerCount;
