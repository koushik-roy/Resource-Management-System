import React from "react";
import { useState } from "react";

import { FaUser, FaLock } from "react-icons/fa";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import logo from "../images/Teksystem.png";
import { Link } from "react-router-dom";
import "../App.css";

export default function forgotPassword () {
  const styles = {
    border: "1px solid rgba(240, 240, 240)",
    background: "rgba(255, 255, 255)",
    marginTop: "15%",
    marginRight: "110px",
  };
  const section = {
    background: "rgba(251, 251, 251)",
  };
  
  const SubBtn={
    marginLeft: "4rem",
    
  };
  const CanBtn={
    marginRight: "3rem",
    marginTop:"0px",
    
  };


  return (
    <>
      <section className="d-flex justify-content-between" style={section}>
        <div className="right_data " style={{ width: "100%" }}>
          <div className="sign_img ">
            <img src={logo} style={{ maxWidth: "100%" }} alt="" />
          </div>
        </div>
        <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
          <form style={styles} className="rounded-lg ">
          <h2 >Forgot Password</h2>
          <br></br>
            <div className="form-outline mb-4">
              <h6 className="col-lg-4 mt-2 "> Username</h6>
              <button className="BtnStyle" >
                <FaUser />
              </button>
              <input
                type="username"
                className="rounded-lg col-lg-10"
                placeholder="Enter your username"
              />
            </div>

            
            <div className="d-flex justify-content-between">

            <Link
              type="button"
              className="btn btn-primary btn-block col-lg-4"
              style={SubBtn}
            >
              Submit 
              </Link>
           
            <Link
              type="button"
              className="btn btn-danger btn-block col-lg-4"
              style={CanBtn}
              to='/'
              
            >
              Cancel
            </Link>
           
            </div>
            
          </form>
        </div>
      </section>
    </>
  );
}

