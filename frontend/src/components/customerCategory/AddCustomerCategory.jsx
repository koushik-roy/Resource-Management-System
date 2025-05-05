import React, { useState } from "react";
import { CustomerCategoryService } from "../../services/CustomerCategoryService";
import TextField from "@material-ui/core/TextField";
import "../../App.css";
import Header from "../Header";
import Footer from "../Footer";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const AddCustomerCategory = () => {
  const intialState = {
    code: "",
    description: "",
  };

  const [category, setCategory] = useState(intialState);
  const [formerrors, setFormerrors] = useState(false);

  const onChangeHandleCategoryCode = (e) => {
    setCategory({ ...category, ["code"]: e.target.value });
  };
  const onChangeHandleCategoryDesc = (e) => {
    setCategory({ ...category, ["description"]: e.target.value });
  };

  function validateForm() {
    var x = document.forms["myForm"]["code"].value;
    if (x == "") {
      alert("Code must be filled out");
      return false;
    }
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    CustomerCategoryService.submitCategory(category);
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
              <h1 className="text">Create Customer Category</h1>
            </div>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label
                  htmlFor="Customer category code"
                  style={{ marginLeft: "-24rem",marginTop:"12px" }}
                >
                  Customer Category Code
                </label>
                <br></br>
                <input
                  name="code"
                  type="text"
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
                      value: 200,
                      message: "Maximum Required length is 200",
                    },
                  })}
                 
                  style={{
                    border: "1px solid #ced4da",
                    width: "552px",
                    marginLeft: "14px",
                  }}
                  onInput={(e) => onChangeHandleCategoryCode(e)}
                />
                
                {errors.code && (
                  <span className="text-sm text-red-500 text-danger">
                    {errors.code.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label
                  htmlFor="Category description"
                  style={{ marginLeft: "-21rem",marginTop:"17px" }}
                >
                  Customer Category Description
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    style={{ width: "553px", marginLeft: "15px" }}
                    className={`form-control ${
                      errors.description &&
                      "focus:border-red-500 focus:ring-red-500 border-red-500"
                    } `}
                    {...register("description", {
                      required: "description is required",
                    })}
                    onInput={(e) => onChangeHandleCategoryDesc(e)}
                  />
                  {errors.description && (
                    <span className="text-sm text-red-500 text-danger">
                      {errors.description.message}
                    </span>
                  )}
                
              </div>
              <div className="form-group-button" style={{marginTop:"38px"}}>
              <button
                type="submit"
                value="Submit"
                className="btn btn-primary"
                style={{ marginLeft: "30px" }}
              >
                {" "}
                Submit
              </button>

              <Link className="btn btn-secondary" to="/viewCustomerCategory">
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
};

export default AddCustomerCategory;
