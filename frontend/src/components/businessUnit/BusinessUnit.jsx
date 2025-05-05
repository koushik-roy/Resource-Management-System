import React from "react";
import { useState } from "react";
import { businessunitService } from "../../services/BusinessunitService";
import "../../App.css";
import TextField from "@material-ui/core/TextField";
import Footer from "../Footer";
import Header from "../Header";
import "../../App.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function BusinessUnit() {
  const initialState = {
    code: "",
    unit_description: "",
  };

  const [business, setBusiness] = useState(initialState);
  const onChangeUnitCode = (e) => {
    setBusiness({
      ...business,
      ["code"]: e.target.value,
    });
  };
  const onChangeUnitDescription = (e) => {
    setBusiness({
      ...business,
      ["unit_description"]: e.target.value,
    });
  };

  function validateForm() {
    var x = document.forms["myForm"]["code"].value;
    if (x === "") {
      alert("Unit code must be filled out");
      return false;
    }
  }

  //validations
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  //handle submit
  const onSubmit = (data) => {
    console.log(business);
    businessunitService.submitBusiness(business);
  };
  return (
    <>
      <Header />
      <div
        className="col-md-12"
        style={{
          background: "rgb(255 255 255)",
          height: "590px",
          marginTop: "-13px",
        }}
      >
        <div className="group" style={{ margin: "1% auto" }}>
          <div
            className="rounded-lg"
            style={{
              border: "1px solid #ced4da",
              textAlign: "center",
              height: "450px",
              background: "rgb(241 241 241)",
              marginTop: "50px",
              width: "620px",
              marginLeft: "-53px",
            }}
          >
            <div className="heading" style={{ marginTop: "33px" }}>
              <h1 className="text">Create Business Unit</h1>
            </div>
            <form
              name="myForm"
              className="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-group">
                <label
                  htmlFor="code"
                  style={{ marginLeft: "-32rem", marginTop: "12px" }}
                >
                  Unit Code
                </label>
                <br></br>
                <input
                  name="code"
                  type="text"
                 
                  style={{
                    border: "1px solid #ced4da",
                    width: "552px",
                    marginLeft: "14px",
                  }}
                  onInput={(e) => onChangeUnitCode(e)}
                  className={`form-control ${
                    errors.code &&
                    "focus:border-red-500 focus:ring-red-500 border-red-500"
                  } `}
                  {...register("code", {
                    required: "code is required",

                    minLength: {
                      value: 2,
                      message: "Minimum Required length is 2",
                    },
                    maxLength: {
                      value: 4,
                      message: "Maximum Required length is 4",
                    },
                  })}
                />
                <br />
                
                {errors.code && (
                  <span className="text-sm text-red-500 text-danger">
                    {errors.code.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label
                  htmlFor="unit_description"
                  style={{ marginLeft: "-29rem" }}
                >
                  Unit Description
                </label>
                <textarea
                  type="text"
                  style={{ width: "553px", marginLeft: "15px" }}
                  onInput={(e) => onChangeUnitDescription(e)}
                  className={`form-control ${
                    errors.description &&
                    "focus:border-red-500 focus:ring-red-500 border-red-500"
                  } `}
                  {...register("description", {
                    required: "description is required",
                  })}
                />
                {errors.description && (
                  <span className="text-sm text-red-500 text-danger">
                    {errors.description.message}
                  </span>
                )}
              </div>
              <div className="form-group-button" style={{ marginLeft: "30px",marginTop:"38px" }}>
                <button
                  type="submit"
                  value="Submit"
                  className="btn btn-primary"
                  style={{width:"248px"}}
                  
                >
                  {" "}
                  Submit
                </button>
                <Link className="btn btn-secondary" to="/viewBusinessUnits" style={{width:"248px"}}>
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BusinessUnit;
