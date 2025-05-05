import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import "../App.css";
import Footer from "./Footer";
import Header from "./Header";
import TotalCustomerCount from "./TotalCustomerCount";
import TotalProjectCount from "./TotalProjectCount";
import TotalResourceCount from "./TotalResourceCount";

export default function Login() {
  const [state, setState] = useState({
    options: {
      colors: ["#0000FF", "#E35809", "#FFBF00"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["Q1", "Q2", "Q3", "Q4"],
      },
    },
    series: [
      {
        name: "Project",
        data: [40, 60, 50, 30],
      },
      {
        name: "Resource",
        data: [55, 25, 60, 20],
      },
      {
        name: "Customer",
        data: [30, 40, 45, 40],
      },
    ],
  });

  const graphStyle = {
    border: "1px solid rgba(240, 240, 240)",
    width: "75%",
    marginTop: "50px",
  };

  const fromStyle = {
    border: "1px solid rgba(240, 240, 240)",
    marginTop: "19px",
    marginLeft: "20rem",
    marginRight: "2rem",
  };

  const linkStyle = {
    color: "rgba(0,0,0)",
  };
  const h6Style = {
    color: "rgba(0,255,0)",
    marginBottom: "-23px",
    marginTop: "10px",
  };
  const lableStyle = {
    marginLeft: "4rem",
  };
  const h4Style = {
    color: "cornflowerblue",
  };

  return (
    <>
      <Header />
      <section className="d-flex justify-content-between" style={{marginTop:"25px"}}>
        <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
          <form className="rounded-lg " style={fromStyle}>
            <Link style={linkStyle} to="/viewProjects">
              Projects
            </Link>
            <h4 style={h4Style}>
              <TotalProjectCount />
            </h4>
            <div>
              <h6 style={h6Style}>^5.39% </h6>
              <label style={lableStyle}>period of change</label>
            </div>
          </form>
          <form className="rounded-lg " style={fromStyle}>
            <Link style={linkStyle} to="/viewResources">
              Resources
            </Link>
            <h4 style={h4Style}>
              <TotalResourceCount />
            </h4>
            <div>
              <h6 style={h6Style}>^5.08% </h6>
              <label style={lableStyle}>period of change</label>
            </div>
          </form>
          <form className="rounded-lg " style={fromStyle}>
            <Link style={linkStyle} to="/addCustomer">
              Customers
            </Link>
            <h4 style={h4Style}>
              <TotalCustomerCount />
            </h4>
            <div>
              <h6 style={h6Style}>^4.39% </h6>
              <label style={lableStyle}>period of change</label>
            </div>
          </form>
        </div>
        <div className="right_data  " style={{ width: "100%" }}>
          <div className=" rounded-lg " style={graphStyle}>
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="500"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
